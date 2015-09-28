from flask import request

def get():
    return request.args.get('api_key')
