from flask import Flask, abort, request
import whisper
from flask_cors import CORS
from tempfile import NamedTemporaryFile

# Load the Whisper model:
model = whisper.load_model('base')

audioFile = 'https://firebasestorage.googleapis.com/v0/b/alley-d0944.appspot.com/o/fWIWsZMQrwT2MHv6rpkloRZGYMu1%2F1701283363_01_-_Conversation_1_-_Stop_Daydreaming.mp3?alt=media&token=53792f30-52fe-40f3-a60d-14c023e9123c'


prompt='以下是普通话的句子'
# result = model.transcribe(audioFile, task='translate',language='zh',verbose=True)

result = model.transcribe(audioFile, verbose=True)

print(result)