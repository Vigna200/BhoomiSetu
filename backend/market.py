from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b"
RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"  # Daily Market Prices

@app.route("/request", methods=["GET"])
def get_prices():
    commodity = request.args.get("commodity")
    state = request.args.get("state")
    market = request.args.get("market")

    if not (commodity and state and market):
        return jsonify({"error": "Missing parameters: commodity, state, market"}), 400

    # API request to Data.gov.in
    url = f"https://api.data.gov.in/resource/{RESOURCE_ID}"
    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": 10,
        "filters[commodity]": commodity,
        "filters[state]": state,
        "filters[market]": market
    }

    try:
        resp = requests.get(url, params=params)
        data = resp.json()

        if "records" not in data or not data["records"]:
            return jsonify({"error": f"No data found for {commodity} in {market}, {state}"}), 404

        results = []
        for rec in data["records"]:
            results.append({
                "Date": rec.get("arrival_date"),
                "Min Price": rec.get("min_price"),
                "Modal Price": rec.get("modal_price"),
                "Max Price": rec.get("max_price"),
                "Market": rec.get("market"),
                "State": rec.get("state"),
                "Commodity": rec.get("commodity"),
            })

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
