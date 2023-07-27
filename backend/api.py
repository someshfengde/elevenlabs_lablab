from flask import Flask, request, jsonify, send_file
from backend import AiMeditationForMeditationEnthusiast
from combine_audio import combine_audio_files


app = Flask(__name__)

mapping = {
    "seashore" : "backgrounds/seashore.mp3", 
    "rain" : "backgrounds/rain.mp3",
    "thunder" : "backgrounds/thunder.mp3"
}

username = "somesh" 
preferences = {
    "preferes_guided_meditation": True,
    "background_sounds": ["seashore", "rain"],
    "duration": "5 minutes"
}

user = AiMeditationForMeditationEnthusiast(username, preferences)

sample_sound = "/Users/somesh/Downloads/code/elevenlabs_lablab/backend/audio_files/audio_sample.wav"

@app.route('/generate_meditation', methods=['POST'])
def generate_meditation():
    data = request.get_json()
    goal = data['goal']
    meditation_text = user.generate_meditation_text(goal)
    meditation_sound = user.generate_voiceover(meditation_text)
    return send_file(meditation_sound, as_attachment=True)


@app.route('/combine_audio', methods=['POST'])
def combine_audio():
    """combines the audio with respective  background

    Returns
    -------
    _type_
        _description_
    """
    data = request.get_json()
    background_audio_path = mapping[data['background']]
    combined_audio_path = combine_audio_files(sample_sound, background_audio_path)
    return send_file(combined_audio_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
