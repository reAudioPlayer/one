import os
import librosa

def main():
    myAudioFilename = "D:\\Users\\David\\Musik\\#Selfmade\\FL Studio\\Running Up That Hill (Colour Bounce)\\Running Up That Hill (Colour Bounce).wav"
    x, sr = librosa.load(myAudioFilename)
    onset_frames = librosa.onset.onset_detect(x, sr=sr)
    onset_times = librosa.frames_to_time(onset_frames)
    print(onset_times)
    # remove extension, .mp3, .wav etc.
    file_name_no_extension, _ = os.path.splitext(myAudioFilename)
    output_name = '.beatmap.txt'
    with open(output_name, 'wt') as f:
        f.write('\n'.join(['%.4f' % onset_time for onset_time in onset_times]))

main()
