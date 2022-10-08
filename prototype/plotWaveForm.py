# TODO mp3 to wav
# TODO implement
# TODO colours

import os
import scipy.io
import scipy.io.wavfile
import numpy as np
import matplotlib.pyplot as plt

myAudioFilename = "D:\\Users\\David\\Musik\\#Selfmade\\FL Studio\\Running Up That Hill (Colour Bounce)\\Running Up That Hill (Colour Bounce).wav"

sampleRate, audioBuffer = scipy.io.wavfile.read(myAudioFilename)

duration = len(audioBuffer)/sampleRate

time = np.arange(0,duration,1/sampleRate) #time vector

plt.figure(figsize=(20, 5))
plt.plot(time, audioBuffer[:,0], color = "white")
plt.tick_params(left=False, labelleft=False, bottom=False, labelbottom=False)
plt.box(False)
plt.tight_layout()
plt.savefig('D:\\Users\\David\\Dokumente\\OneDrive\\Documents\\out.svg', transparent=True)
