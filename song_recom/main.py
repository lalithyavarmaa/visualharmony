from flask import Flask, request, jsonify
from spotify_api import recommend_songs

app = Flask(__name__)

# Allow CORS (Cross-Origin Resource Sharing) for front-end requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

# API endpoint to recommend songs
@app.route('/recommend', methods=['POST'])
def recommend():
    input_data = request.json
    recommended_songs = recommend_songs(input_data)
    return jsonify(recommended_songs)

if __name__ == '__main__':
    app.run(debug=True, port=5001)