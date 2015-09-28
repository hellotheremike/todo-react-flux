from flask import abort
from flask.ext.restful import Resource, reqparse, marshal
from utils import settings, authenticate, get_api_key
import fields


class TaskAPI(Resource):
    method_decorators = [authenticate.auth]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, location='json', required=True)
        self.reqparse.add_argument('complete', type=bool, location='json', required=True)
        super(TaskAPI, self).__init__()

    def get(self, id):
        session_tasks = settings.tasks[get_api_key.get()]
        task = [task for task in session_tasks if task['id'] == id]
        if len(task) == 0:
            abort(404)

        return {'task': marshal(task[0], task_fields)}

    def put(self, id):
        session_tasks = settings.tasks[get_api_key.get()]
        task = [task for task in session_tasks if task['id'] == id]
        if len(task) == 0:
            abort(404)

        task = task[0]
        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                task[k] = v

        return {'task': marshal(task, task_fields)}
