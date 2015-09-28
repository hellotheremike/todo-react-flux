#!flask/bin/python

from flask import Flask, session, render_template, jsonify, abort, request
from flask.ext.restful import Api, Resource, reqparse, fields, marshal, wraps
from utils import guid, settings, authenticate
from resources.tasks import task_list, task

app = Flask(__name__, static_url_path="")
api = Api(app)
settings.init()

tasks = {
    "123":[    {
            'id': 1,
            'text': u'Discuss report with John',
            'complete': False
        },
        {
            'id': 2,
            'text': u'Get a haircut',
            'complete': True
        }
        ,
        {
            'id': 3,
            'text': u'Pay electricity bill',
            'complete': True
        }
        ,
        {
            'id': 4,
            'text': u'Check gym hours',
            'complete': False
        }
    ]
}


task_fields = {
    'id': fields.Integer,
    'text': fields.String,
    'complete': fields.Boolean,
    'uri': fields.Url('task')
}

def get_api_key():
    return request.args.get('api_key')





class TaskListReorderAPI(Resource):
    method_decorators = [authenticate.auth]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('to', type=int, location='json', required=True)
        self.reqparse.add_argument('from', type=int, location='json', required=True)
        super(TaskListReorderAPI, self).__init__()

    def put(self):
        args = self.reqparse.parse_args()
        session_tasks = settings.tasks[get_api_key()]
        tasks_range = range(0, len(session_tasks)-1)

        if args['from'] in tasks_range and args['to'] in tasks_range:
            abort(500)

        session_tasks.insert(args['to'], session_tasks.pop(args['from']))

        return args, 201

class TaskListUpdateAllAPI(Resource):
    method_decorators = [authenticate.auth]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('complete', type=bool, location='json')
        self.reqparse.add_argument('text', type=str, location='json')
        super(TaskListUpdateAllAPI, self).__init__()

    def put(self):
        args = self.reqparse.parse_args()
        session_tasks = settings.tasks[get_api_key()]
        for task in session_tasks:
            for key, value in args.items():
                if value is not None:
                    task[key] = value

        return {'tasks': [marshal(task, task_fields) for task in session_tasks]}

# Routes
api.add_resource(task_list.TaskListAPI, '/todo/api/v1.0/tasks', endpoint='tasks')
api.add_resource(task.TaskAPI, '/todo/api/v1.0/tasks/<int:id>', endpoint='task')
api.add_resource(TaskListReorderAPI, '/todo/api/v1.0/tasks/reorder', endpoint='reorder')
api.add_resource(TaskListUpdateAllAPI, '/todo/api/v1.0/tasks/update-all', endpoint='completeall')

@app.route('/')
@authenticate.validate_token
def root(token=None):
    return render_template('index.html', token=session['token'])


@app.route('/<path:path>')
def static_proxy(path):
    return app.send_static_file(path)

if __name__ == '__main__':
    app.secret_key = 'F12Zr47j\3yX R~X@H!jmM]Lwf/,?KT'
    app.run(debug=True)
