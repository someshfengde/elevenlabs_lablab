#%%
from pydub import AudioSegment

def combine_audio_files(voice_audio_path , background_audio_path): 
    voice_audio = AudioSegment.from_mp3(voice_audio_path)
    background_audio = AudioSegment.from_mp3(background_audio_path) - 20

    slow_down_factor = 0.9
    slow_audio = voice_audio._spawn(voice_audio.raw_data, overrides={
    "frame_rate": int(voice_audio.frame_rate * slow_down_factor)
    })
    voice_duration = len(slow_audio)
    background_audio = background_audio[:voice_duration]
    combined_audio = slow_audio.overlay(background_audio)

    combined_audio.export(f"combined_audio/{background_audio_path.split('/')[-1].split('.')[0]}_combined_{voice_audio_path.split('/')[-1]}", format="mp3")
    return f"combined_audio/{background_audio_path.split('/')[-1].split('.')[0]}_combined_{voice_audio_path.split('/')[-1]}"


# %%
