import requests
import json

# Load Spotify API credentials from config.json
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

CLIENT_ID = config['CLIENT_ID']
CLIENT_SECRET = config['CLIENT_SECRET']

# Function to get Spotify access token
def get_spotify_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_response = requests.post(auth_url, {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })
    auth_data = auth_response.json()
    return auth_data['access_token']

# Function to search for songs based on mood and keywords
def search_songs(mood, keywords, limit=5):
    token = get_spotify_token()
    headers = {
        'Authorization': f'Bearer {token}'
    }
    query = f'{mood} {keywords}'
    search_url = f'https://api.spotify.com/v1/search?q={query}&type=track&limit={limit}'
    response = requests.get(search_url, headers=headers)
    tracks = response.json().get('tracks', {}).get('items', [])
    
    songs = []
    for track in tracks:
        song = {
            'title': track['name'],
            'artist': track['artists'][0]['name'],
            'mood': mood
        }
        songs.append(song)
    return songs

# Function to recommend songs based on input
def recommend_songs(input_data):
    emotions = input_data.get('emotions', [])
    vibes = input_data.get('vibes', [])
    objects = input_data.get('objects', [])
    
    recommended_songs = []
    for mood in emotions + vibes:
        keywords = ' '.join(objects)
        songs = search_songs(mood, keywords)
        recommended_songs.extend(songs)
    
    return recommended_songs