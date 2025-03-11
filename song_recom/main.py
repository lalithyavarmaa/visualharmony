from flask import Flask, request, jsonify
from flask_cors import CORS  # Enable CORS for frontend communication
from spotify_api import recommend_songs

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Root route for testing
@app.route('/', methods=['GET'])
def home():
    return "Welcome to Visual Harmony! Use the /recommend endpoint to get song recommendations."

# API endpoint to recommend songs
@app.route('/recommend', methods=['POST'])
def recommend():
    input_data = request.json
    recommended_songs = recommend_songs(input_data)
    return jsonify(recommended_songs)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run on port 5001