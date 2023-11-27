from flask import Flask, abort, request
import whisper
from flask_cors import CORS
from tempfile import NamedTemporaryFile

# Load the Whisper model:
model = whisper.load_model('base')

app = Flask(__name__)
cors = CORS(app, resources={r'/*': {'origins': "http://localhost:3001,http://localhost:3000"}})


@app.route('/', methods=['POST'])
def handler():
    if not request.files:
        # If the user didn't submit any files, return a 400 (Bad Request) error.
        abort(400)

    # For each file, let's store the results in a list of dictionaries.
    results = []
    # options = dict(language="korean", beam_size=5, best_of=5)
    # translate_options = dict(task="translate", **options)

    # Loop over every file that the user submitted.
    for filename, handle in request.files.items():
        # Create a temporary file.
        # The location of the temporary file is available in `temp.name`.
        temp = NamedTemporaryFile()
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        handle.save(temp)
        # Let's get the transcript of the temporary file.
        result = model.transcribe(temp.name)
        # translation = model.transcribe(temp.name, **translate_options)
        # translation = model.transcribe(
        #     temp.name, task="translate", language="korean")
        translation = model.transcribe(
            temp.name, task="translate")
        # Now we can store the result object for this file.
        results.append({
            'filename': filename,
            'transcript': result,
            'translation': translation
        })

    # This will be automatically converted to JSON.
    return results[0]


# https://www.digitalocean.com/community/tutorials/processing-incoming-request-data-in-flask
@app.route('/v2', methods=['POST'])
def handler_json():
    request_data = request.get_json()
    media_url = request_data["mediaUrl"]
    if not media_url:
        # If the user didn't provide mediaUrl, return a 400 (Bad Request) error.
        abort(400)

    if request_data["translation"]:
        translation = model.transcribe(media_url, task="translate")
        result = model.transcribe(media_url)
        return {'result': result,
                'media_url': media_url,
                'translation': translation}

    result = model.transcribe(media_url)

    return {'result': result, 'media_url': media_url}
