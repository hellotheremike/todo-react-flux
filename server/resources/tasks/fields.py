from flask.ext.restful import fields

tasks = {
    'id': fields.Integer,
    'text': fields.String,
    'complete': fields.Boolean,
    'uri': fields.Url('task')
}
