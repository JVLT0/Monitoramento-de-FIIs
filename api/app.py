from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Mock data for demonstration
def generate_mock_fiis(count=20):
    segments = ['Logística', 'Lajes Corporativas', 'Shoppings', 'Recebíveis', 'Híbrido']
    fiis = []
    
    symbols = [
        'HGLG11', 'KNRI11', 'XPLG11', 'VISC11', 'BTLG11', 
        'HGRE11', 'HSML11', 'RBRP11', 'VILG11', 'MALL11',
        'VINO11', 'MXRF11', 'KNCR11', 'RECT11', 'HFOF11',
        'RBRF11', 'GGRC11', 'VRTA11', 'TGAR11', 'XPML11'
    ]
    
    names = [
        'CSHG Logística', 'Kinea Renda Imobiliária', 'XP Log', 'Vinci Shopping Centers',
        'BTG Logística', 'CSHG Real Estate', 'HSI Mall', 'RBR Properties', 'Vinci Logística',
        'Malls Brasil Plural', 'Vinci Offices', 'Maxi Renda', 'Kinea Crédito', 'UBS Recebíveis',
        'Hedge FOF', 'RBR FOF', 'GGR Covepi', 'Fator Verita', 'TG Ativo Real', 'XP Malls'
    ]
    
    for i in range(min(count, len(symbols))):
        price = round(np.random.uniform(70, 180), 2)
        dy = round(np.random.uniform(6, 10), 1)
        liquidity = f"{int(np.random.uniform(500, 5000))}.000"
        vacancy = round(np.random.uniform(1, 8), 1)
        
        fii = {
            "symbol": symbols[i],
            "name": names[i],
            "segment": np.random.choice(segments),
            "price": f"{price:.2f}",
            "dy": f"{dy}",
            "pvp": f"{round(np.random.uniform(0.7, 1.1), 2)}",
            "liquidity": liquidity,
            "vacancy": f"{vacancy}",
            "lastDividend": f"{round(price * 0.007, 2)}",
        }
        fiis.append(fii)
    
    return fiis

def generate_market_overview():
    return {
        "ifix": "2.982,35",
        "ifixChange": round(np.random.uniform(-1, 1.5), 2),
        "averageDY": f"{round(np.random.uniform(8, 9), 2)}",
        "averageDYChange": round(np.random.uniform(-0.3, 0.3), 2),
        "averagePVP": f"{round(np.random.uniform(0.9, 1), 2)}",
        "averagePVPChange": round(np.random.uniform(-0.05, 0.05), 2),
        "totalDividends": f"{round(np.random.uniform(1.3, 1.6), 2)}",
        "totalDividendsChange": round(np.random.uniform(3, 5), 1),
    }

def generate_recommendations(fiis, count=9):
    recommendations = []
    types = ['Compra', 'Venda', 'Neutro']
    reasons_buy = [
        "Excelente dividend yield e baixa vacância. Ativos bem localizados e contratos de longo prazo.",
        "Forte desempenho operacional e excelentes localizações. P/VP atrativo.",
        "Diversificação de ativos e P/VP atrativo. Gestão ativa tem demonstrado capacidade de gerar valor.",
        "Potencial de crescimento expressivo no setor, impulsionado por tendências de mercado.",
    ]
    reasons_sell = [
        "Impacto negativo de tendências de mercado e aumento de vacância representam riscos elevados.",
        "P/VP elevado comparado ao setor e perspectivas limitadas de crescimento no curto prazo.",
        "Crescente concorrência no segmento impacta negativamente as perspectivas de longo prazo.",
    ]
    reasons_neutral = [
        "Bons fundamentos, mas valorização recente deixa o ativo próximo do preço justo.",
        "Vacância acima da média do setor é preocupante, mas gestão competente equilibra a recomendação.",
        "Relação risco-retorno equilibrada, sem catalisadores claros para valorização significativa.",
    ]
    
    # Generate dates for the last 30 days
    base_date = datetime.now() - timedelta(days=30)
    dates = [(base_date + timedelta(days=i)).strftime("%d/%m/%Y") for i in range(30)]
    
    fiis_sample = fiis.copy()
    np.random.shuffle(fiis_sample)
    fiis_sample = fiis_sample[:count]
    
    for i, fii in enumerate(fiis_sample):
        rec_type = np.random.choice(types, p=[0.5, 0.2, 0.3])
        
        if rec_type == "Compra":
            reason = np.random.choice(reasons_buy)
        elif rec_type == "Venda":
            reason = np.random.choice(reasons_sell)
        else:
            reason = np.random.choice(reasons_neutral)
        
        recommendations.append({
            "fii": fii,
            "type": rec_type,
            "reason": reason,
            "date": dates[i % len(dates)],
        })
    
    return recommendations

def generate_fii_details(symbol, fiis):
    fii = next((f for f in fiis if f["symbol"] == symbol), None)
    
    if not fii:
        return None
    
    base_price = float(fii["price"])
    
    details = {
        **fii,
        "priceChange": round(np.random.uniform(-1, 1), 2),
        "lastDividendDate": (datetime.now() - timedelta(days=np.random.randint(1, 15))).strftime("%d/%m/%Y"),
        "equity": f"{round(np.random.uniform(300, 1500), 0)} milhões",
        "shares": f"{round(np.random.uniform(1, 10), 1)} milhões",
        "manager": np.random.choice(["BTG Pactual", "XP Asset", "CSHG", "Kinea", "Vinci Partners"]),
        "description": f"{fii['name']} ({fii['symbol']}) é um Fundo de Investimento Imobiliário do segmento {fii['segment']}. O fundo tem como objetivo a obtenção de renda através do investimento em imóveis comerciais e distribuição de dividendos aos seus cotistas.",
        "recommendation": np.random.choice(["Compra", "Venda", "Neutro"], p=[0.6, 0.2, 0.2]),
        "recommendationDate": (datetime.now() - timedelta(days=np.random.randint(1, 10))).strftime("%d/%m/%Y"),
        "strengths": [
            "Dividend Yield consistente ao longo dos últimos 12 meses",
            "Baixa taxa de vacância comparada à média do setor",
            "Ativos bem localizados com contratos de longo prazo",
            "Gestão experiente com histórico comprovado",
        ],
        "weaknesses": [
            "Liquidez diária abaixo da média de FIIs comparáveis",
            "Concentração de ativos em uma única região",
            "Potencial impacto de novas regulamentações do setor",
        ],
        "analysis": f"Este FII apresenta bons fundamentos com dividend yield acima da média e baixa vacância. Os ativos do portfólio estão bem localizados e com contratos de longo prazo, o que proporciona estabilidade nos rendimentos. Considerando o P/VP atual de {fii['pvp']}, entendemos que o fundo está negociando em um patamar atrativo.",
        "targetPrice": f"{round(base_price * (1 + np.random.uniform(0.05, 0.15)), 2)}",
        "targetPriceChange": f"{round(np.random.uniform(5, 15), 1)}",
        "risks": "Aumento nas taxas de juros, elevação da vacância e deterioração do cenário macroeconômico.",
    }
    
    return details

def generate_fii_history(symbol, fiis):
    fii = next((f for f in fiis if f["symbol"] == symbol), None)
    
    if not fii:
        return None
    
    base_price = float(fii["price"])
    
    # Generate price history with a trend and some volatility
    trend = np.random.choice([-1, 1]) * np.random.uniform(0.05, 0.15)
    months = 12
    
    prices = []
    for i in range(months):
        factor = 1 + trend * (i / months) + np.random.uniform(-0.05, 0.05)
        prices.append(round(base_price * factor, 2))
    
    # Generate dividend history loosely based on price
    dividends = []
    for price in prices:
        dividend = price * np.random.uniform(0.006, 0.008)
        dividends.append(round(dividend, 2))
    
    return {
        "price": prices,
        "dividends": dividends
    }

def generate_forecasts():
    return {
        "topPotential": [
            {
                "symbol": "XPLG11",
                "name": "XP Log",
                "segment": "Logística",
                "currentPrice": "114.80",
                "targetPrice": "133.17",
                "potential": "16.0",
                "confidence": "85",
            },
            {
                "symbol": "BTLG11",
                "name": "BTG Logística",
                "segment": "Logística",
                "currentPrice": "98.70",
                "targetPrice": "113.51",
                "potential": "15.0",
                "confidence": "80",
            },
            {
                "symbol": "VILG11",
                "name": "Vinci Logística",
                "segment": "Logística",
                "currentPrice": "112.30",
                "targetPrice": "127.51",
                "potential": "13.5",
                "confidence": "75",
            },
            {
                "symbol": "RBRP11",
                "name": "RBR Properties",
                "segment": "Híbrido",
                "currentPrice": "72.45",
                "targetPrice": "81.63",
                "potential": "12.7",
                "confidence": "70",
            },
            {
                "symbol": "HGLG11",
                "name": "CSHG Logística",
                "segment": "Logística",
                "currentPrice": "178.65",
                "targetPrice": "200.88",
                "potential": "12.4",
                "confidence": "65",
            }
        ]
    }

# Global mock data
mock_fiis = generate_mock_fiis()

# API Routes
@app.route('/api/fiis', methods=['GET'])
def get_fiis():
    return jsonify(mock_fiis)

@app.route('/api/market', methods=['GET'])
def get_market_overview():
    return jsonify(generate_market_overview())

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    return jsonify(generate_recommendations(mock_fiis))

@app.route('/api/fii/<symbol>', methods=['GET'])
def get_fii_details(symbol):
    details = generate_fii_details(symbol, mock_fiis)
    if not details:
        return jsonify({"error": "FII not found"}), 404
    return jsonify(details)

@app.route('/api/fii/<symbol>/history', methods=['GET'])
def get_fii_history(symbol):
    history = generate_fii_history(symbol, mock_fiis)
    if not history:
        return jsonify({"error": "FII not found"}), 404
    return jsonify(history)

@app.route('/api/forecasts', methods=['GET'])
def get_forecasts():
    return jsonify(generate_forecasts())

# Special endpoint to get both details and history in one request
@app.route('/api/fii/<symbol>/details', methods=['GET'])
def get_fii_complete(symbol):
    details = generate_fii_details(symbol, mock_fiis)
    history = generate_fii_history(symbol, mock_fiis)
    
    if not details:
        return jsonify({"error": "FII not found"}), 404
    
    response = {
        **details,
        "history": history
    }
    return jsonify(response)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)