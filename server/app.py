#!flask/bin/python

"""Alternative version of the ToDo RESTful server implemented using the
Flask-RESTful extension."""

from flask import Flask, jsonify, abort, make_response, request
from flask.ext.restful import Api, Resource, reqparse, fields, marshal

app = Flask(__name__, static_url_path="")
api = Api(app)

tasks = [
    {
        'id': 1,
        'text': u'Buy groceries',
        'complete': False
    },
    {
        'id': 2,
        'text': u'Learn Python',
        'complete': False
    }
    ,
    {
        'id': 3,
        'text': u'Eat bananas',
        'complete': False
    }
    ,
    {
        'id': 4,
        'text': u'Kill sebastian',
        'complete': False
    }
]

task_fields = {
    'id': fields.Integer,
    'text': fields.String,
    'complete': fields.Boolean,
    'uri': fields.Url('task')
}

class TaskListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, required=True,
                                   help='No task text provided',
                                   location='json')
        super(TaskListAPI, self).__init__()

    def get(self):
        return {'tasks': [marshal(task, task_fields) for task in tasks]}

    def post(self):
        args = self.reqparse.parse_args()
        task = {
            'id': len(tasks) + 1,
            'text': args['text'],
            'complete': False
        }
        tasks.append(task)
        return {'task': marshal(task, task_fields)}, 201


class TaskAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, location='json', required=True)
        self.reqparse.add_argument('complete', type=bool, location='json', required=True)
        super(TaskAPI, self).__init__()

    def get(self, id):
        task = [task for task in tasks if task['id'] == id]
        if len(task) == 0:
            abort(404)
        return {'task': marshal(task[0], task_fields)}

    def put(self, id):
        task = [task for task in tasks if task['id'] == id]
        if len(task) == 0:
            abort(404)
        task = task[0]
        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                task[k] = v
        return {'task': marshal(task, task_fields)}

class TaskListReorderAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('to', type=int, location='json', required=True)
        self.reqparse.add_argument('from', type=int, location='json', required=True)
        super(TaskListReorderAPI, self).__init__()

    def put(self):
        args = self.reqparse.parse_args()
        tasks_length = len(tasks)-1
        task_current = [task for task in tasks if task['id'] == args['from'] + 1]
        task_destination = [task for task in tasks if task['id'] == args['to'] + 1]

        if len(task_current) == 0 or len(task_destination) == 0:
            abort(500)

        tasks.insert(args['to'], tasks.pop(args['from']))
        return args, 201

class TaskListUpdateAllAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('complete', type=bool, location='json')
        self.reqparse.add_argument('text', type=str, location='json')
        super(TaskListUpdateAllAPI, self).__init__()

    def put(self):
        args = self.reqparse.parse_args()
        for a in tasks:
            for k, v in args.items():
                if v is not None:
                    a[k] = v

        return {'tasks': [marshal(task, task_fields) for task in tasks]}

api.add_resource(TaskListAPI, '/todo/api/v1.0/tasks', endpoint='tasks')
api.add_resource(TaskAPI, '/todo/api/v1.0/tasks/<int:id>', endpoint='task')
api.add_resource(TaskListReorderAPI, '/todo/api/v1.0/tasks/reorder', endpoint='reorder')
api.add_resource(TaskListUpdateAllAPI, '/todo/api/v1.0/tasks/update-all', endpoint='completeall')

# Routes
@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return app.send_static_file(path)

if __name__ == '__main__':
    app.run(debug=True)
