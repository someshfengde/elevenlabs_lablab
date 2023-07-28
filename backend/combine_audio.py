from pydub import AudioSegment
import os

def combine_audio_files(voice_audio_path , background_audio_path): 
    print(f"voice_audio_path: {voice_audio_path}")  # print statement added
    print(f"background_audio_path: {background_audio_path}")  # print statement added
    
    voice_audio = AudioSegment.from_wav(voice_audio_path)
    
    # Convert .mp3 to .wav if necessary
    if background_audio_path.endswith(".mp3"):
        mp3_audio = AudioSegment.from_mp3(background_audio_path)
        background_audio_path_wav = background_audio_path.replace('.mp3', '.wav')
        mp3_audio.export(background_audio_path_wav, format='wav')
        background_audio_path = background_audio_path_wav
    
    background_audio = AudioSegment.from_wav(background_audio_path) - 20

    slow_down_factor = 0.9
    slow_audio = voice_audio._spawn(voice_audio.raw_data, overrides={
        "frame_rate": int(voice_audio.frame_rate * slow_down_factor)
    })

    voice_duration = len(slow_audio)
    background_audio = background_audio[:voice_duration]
    combined_audio = slow_audio.overlay(background_audio)
    voice_filename = os.path.basename(voice_audio_path).replace('.mp3', '.wav')
    background_filename = os.path.basename(background_audio_path).replace('.mp3', '.wav')
    output_filename = f"{background_filename}_combined_{voice_filename}"
    output_dir = "combined_audio"
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, output_filename)

    combined_audio.export(output_path, format="wav")
    print(f"output_path: {output_path}")  # print statement added

    return output_path