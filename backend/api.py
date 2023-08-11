import os
from flask import Flask, request, send_file
from backend import generate_meditation_text, generate_gtts_voiceover, combine_audio_files
from flask_cors import CORS
from pathlib import Path

app = Flask(__name__)
CORS(app)
app.config['TIMEOUT'] = 0

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    return response

current_dir = Path(__file__).parent

mapping = {
    "chimes": current_dir / "backgrounds" / "chimes.mp3",
    "music": current_dir / "backgrounds" / "music.mp3",
    "nature": current_dir / "backgrounds" / "nature.mp3",
    "ocean": current_dir / "backgrounds" / "ocean.mp3",
    "rain": current_dir / "backgrounds" / "rain.mp3",
    "storm": current_dir / "backgrounds" / "storm.mp3",
}

@app.route('/generate_meditation', methods=['POST'])
def generate_customised_meditation():
    data = request.get_json()
    goal = data.get('goal')
    username = data.get('username', "User")
    voice_name = data.get('voice_name', "Rachel")
    language = data.get('language', "english")
    background = data.get('background', "ocean")
    try:
        meditation_text = generate_meditation_text(goal, username, language)
        voice_audio_path = generate_gtts_voiceover(meditation_text, username, voice_name)
        combined_audio_path = combine_audio_files(voice_audio_path, str(mapping[background]))
    except Exception as e:
        combined_audio_path = f"{current_dir}/combined_audio/ocean_combined_test_meditation.mp3"
        print(f'default path used due to {e}')
    
    return send_file(str(combined_audio_path),  mimetype='audio/mpeg')

@app.route('/combine_audio', methods=['POST'])
def combine_audio():
    data = request.get_json()
    background = data.get('background', "ocean")
    username = data.get('username', "User")
    
    background_audio_path = str(mapping[background])
    voice_audio_path = current_dir / "audio_files" / f"{username}_meditation.mp3"
    
    if not voice_audio_path.is_file():
        print('creating new meditation')
        med_text = generate_meditation_text("meditation", username)
        voice_audio_path = generate_gtts_voiceover(med_text, username)
    
    combined_audio_path = combine_audio_files(str(voice_audio_path), background_audio_path)
    
    return send_file(str(combined_audio_path),  mimetype='audio/mpeg')


@app.route('/test', methods=['GET'])
def test():
    return "Hello World!"

if __name__ == "__main__":
    app.run()

# import os
# from flask import Flask, request, send_file
# from backend import generate_meditation_text, generate_gtts_voiceover, combine_audio_files
# from flask_cors import CORS


# app = Flask(__name__)
# CORS(app)

# @app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
#     response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
#     return response

# # CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# current_dir = os.path.dirname(os.path.realpath(__file__))

# mapping = {
#     "chimes" : "./backgrounds/chimes.mp3",
#     "music" : "./backgrounds/music.mp3",
#     "nature": "./backgrounds/nature.mp3",
#     "ocean" : "./backgrounds/ocean.mp3",
#     "rain" : "./backgrounds/rain.mp3",
#     "storm" : "./backgrounds/storm.mp3",
# }




# @app.route('/generate_meditation', methods=['POST'])
# def generate_customised_meditation():
#     data = request.get_json()
#     goal = data['goal']
#     username = data['username']
#     voice_name = data['voice_name']
#     language = data['language']
#     background = data['background']
#     if not language: 
#         language = "english"
#     if not voice_name:
#         voice_name = "Rachel"
#     if not username: 
#         username = "User"
#     if not background:
#         background = "ocean"
#     meditation_text = generate_meditation_text(goal, username, language)
#     voice_audio_path = generate_gtts_voiceover(meditation_text, username, voice_name)
#     combined_audio_path = combine_audio_files(voice_audio_path, mapping[background])
#     return send_file(combined_audio_path,  mimetype='audio/mpeg')

# @app.route('/combine_audio', methods=['POST'])
# def combine_audio():
#     data = request.get_json()
#     if not data['background']:
#         data['background'] = "ocean"
#     background_audio_path = mapping[data['background']]
#     user = data['username']
#     if not user: 
#         user = "User"
#     voice_audio_path = os.path.join(current_dir, "audio_files", f"{user}_meditation.mp3")
#     if not os.path.exists(voice_audio_path):
#         print('creating new meditation')
#         med_text = generate_meditation_text("meditation", user)
#         voice_audio_path = generate_gtts_voiceover(med_text, user)
#     combined_audio_path = combine_audio_files(voice_audio_path, background_audio_path)
#     return send_file(combined_audio_path,  mimetype='audio/mpeg')

# if __name__ == "__main__":
#     app.run()