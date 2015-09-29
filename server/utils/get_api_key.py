from flask import request

# Obtain the API-key from the query.
def get_api_key():
    return request.args.get('api_key')
