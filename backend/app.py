from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ New GET route for root
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "✅ KrishiMitra API is running!"})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("query", "")

    if "crop" in user_message.lower():
        reply = "For this season, wheat and mustard are recommended."
    elif "weather" in user_message.lower():
        reply = "Today’s forecast: Sunny with mild rainfall chances."
    else:
        reply = "I’m still learning. Please ask about crops or weather."

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True)
