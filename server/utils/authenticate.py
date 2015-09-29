from flask import jsonify, request, session, make_response
from flask.ext.restful import  wraps
import settings
import generate_guid


# Check if API-key is valid
def authenticate(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.args.get('api_key') in settings.tasks:
            return func(*args, **kwargs)
        else:
            return make_response(jsonify({'error': 403, 'message': 'Unauthorized access'}), 403)
    return wrapper

# Set session token to match with API-key
# passed by the client
def validate_token(f):
    @wraps(f)
    def wrapper( *args, **kwargs):
        if not session:
            session['token'] = generate_guid()
            settings.tasks[session['token']] = []

        elif not session['token'] in settings.tasks:
            settings.tasks[session['token']] = []

        return f(*args, **kwargs)
    return wrapper
