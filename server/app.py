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
]

task_fields = {
    'text': fields.String,
    'complete': fields.Boolean,
    'uri': fields.Url('task')
}


class TaskListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        # self.reqparse.add_argument('text', type=str, required=True,
        #                            help='No task text provided',
        #                            location='json')
        super(TaskListAPI, self).__init__()

    def get(self):
        return {'tasks': [marshal(task, task_fields) for task in tasks]}

    def post(self):
        args = self.reqparse.parse_args()
        json_data = request.get_json(force=True)
        task = {
            'id': tasks[-1]['id'] + 1,
            'text': json_data['text'],
            'complete': False
        }
        tasks.append(task)
        return {'task': marshal(task, task_fields)}, 201

    def put(self):
        for k in tasks:
            k['complete'] = True

        return {'task': True}



class TaskAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        # self.reqparse.add_argument('text', type=str, location='json')
        # self.reqparse.add_argument('complete', type=bool, location='json')
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
        # args = self.reqparse.parse_args()
        args = request.get_json(force=True)
        for k, v in args.items():
            if v is not None:
                task[k] = v
        return {'task': marshal(task, task_fields)}

class TaskListReorderAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        # self.reqparse.add_argument('text', type=str, location='json')
        # self.reqparse.add_argument('complete', type=bool, location='json')
        super(TaskListReorderAPI, self).__init__()

    def put(self):
        args = request.get_json(force=True)
        a, b = args['from'], args['to']

        tasks[b], tasks[a] = tasks[a], tasks[b]
        return args


api.add_resource(TaskListAPI, '/todo/api/v1.0/tasks', endpoint='tasks')
api.add_resource(TaskAPI, '/todo/api/v1.0/tasks/<int:id>', endpoint='task')
api.add_resource(TaskListReorderAPI, '/todo/api/v1.0/reorder', endpoint='reorder')


if __name__ == '__main__':
    app.run(debug=True)
