#!flask/bin/python

from flask import abort, request
from flask.ext.restful import  wraps
import settings


def auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.args.get('api_key') in settings.tasks:
            return func(*args, **kwargs)
        else:
            abort(403)
    return wrapper

def random_string(length):
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(length))

def validate_token(f):
    @wraps(f)
    def wrapper(existing_token, *args, **kwargs):
        if session['token'] != existing_token:
            # Logic on failure. Do you present a 404, do you bounce them back to your main page, do you do something else?
            # It is IMPORTANT that you determine and implement this logic
            # otherwise the decorator simply changes the token (and behaves the same way as the else block).
            session['token'] = random_string(20)
        else:
            session['token'] = random_string(20)
        return f(*args, **kwargs)
    return wrapper
