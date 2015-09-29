from flask import abort
from flask.ext.restful import Resource, reqparse, marshal
from utils import settings, authenticate, get_api_key
import fields

# HTTP-Methods for interacting with a single Task
# URL: /todo/api/v1.0/tasks/<int:id>
class TaskResource(Resource):
    method_decorators = [authenticate]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, location='json', required=True)
        self.reqparse.add_argument('complete', type=bool, location='json', required=True)
        super(TaskResource, self).__init__()

    # Update Task with ID
    def put(self, id):
        session_tasks = settings.tasks[get_api_key()]
        task = [task for task in session_tasks if task['id'] == id]
        if len(task) == 0:
            abort(404)

        task = task[0]
        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                task[k] = v

        return {'task': marshal(task, fields.tasks)} # Return updated task
