import requests
import json

# load Spotify API credentials from config.json
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

CLIENT_ID = config['CLIENT_ID']
CLIENT_SECRET = config['CLIENT_SECRET']

# to get Spotify access token
def get_spotify_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_response = requests.post(auth_url, {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })
    auth_data = auth_response.json()
    return auth_data['access_token']

def search_songs(mood, keywords=None, limit=10):
    token = get_spotify_token()
    headers = {'Authorization': f'Bearer {token}'}
    
    # Use only mood if no keywords are provided
    query = mood if not keywords else f'{mood} {keywords}'
    
    search_url = f'https://api.spotify.com/v1/search?q={query}&type=track&limit={limit}'
    response = requests.get(search_url, headers=headers)

    if response.status_code != 200:
        print(f"Error: {response.json()}")  # Debugging
        return []

    tracks = response.json().get('tracks', {}).get('items', [])
    
    songs = [
        {'title': track['name'], 'artist': track['artists'][0]['name'], 'mood': mood}
        for track in tracks
    ]
    
    return songs


# to recommend songs based on a single emotion input
def recommend_songs(input_data):
    emotion = input_data.get('emotion', '')  # Expecting only one emotion as a string
    objects = input_data.get('objects', [])

    recommended_songs = []
    if emotion:
        keywords = ' '.join(objects)  # Convert object list to a single keyword string
        recommended_songs = search_songs(emotion, keywords)

    return recommended_songs
