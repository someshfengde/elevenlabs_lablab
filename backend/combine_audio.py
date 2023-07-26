#%%
from pydub import AudioSegment

# Load the generated voice and the seashore audio.
voice_audio = AudioSegment.from_mp3("/Users/somesh/Downloads/code/elevenlabs_lablab/audio_files/audio_sample_2.wav")
seashore_audio = AudioSegment.from_mp3("/Users/somesh/Downloads/code/elevenlabs_lablab/gentle-ocean-waves-breaking-on-beach-d-9333.mp3") - 20 


# Adjust the speed of the audio by a certain factor (1.0 is normal speed).
# Values less than 1.0 will slow down the audio, e.g., 0.5 will make it half the speed.
slow_down_factor = 0.9  # Adjust the value as needed.

# Slow down the audio by changing the frame rate.
slow_audio = voice_audio._spawn(voice_audio.raw_data, overrides={
    "frame_rate": int(voice_audio.frame_rate * slow_down_factor)
})

# Match the duration of the generated voice to the seashore audio.
voice_duration = len(slow_audio)
seashore_audio = seashore_audio[:voice_duration]

# Mix the two audio files together.
combined_audio = slow_audio.overlay(seashore_audio)

# Save the final result.
output_file_with_seashore = "seashore_voice_combined_v1.mp3"
combined_audio.export(output_file_with_seashore, format="mp3")

# %%
