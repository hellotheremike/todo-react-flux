from flask.ext.restful import fields

# Define the contract of the keys that will define a task.
tasks = {
    'id': fields.Integer,
    'text': fields.String,
    'complete': fields.Boolean,
    'uri': fields.Url('task')
}
