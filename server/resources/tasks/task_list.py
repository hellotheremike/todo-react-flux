from flask.ext.restful import Resource, reqparse, marshal
from utils import settings, authenticate, get_api_key
import fields


class TaskListAPI(Resource):
    method_decorators = [authenticate.auth]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, required=True,
                                   help='No task text provided',
                                   location='json')
        super(TaskListAPI, self).__init__()

    def get(self):
        session_tasks = settings.tasks[get_api_key.get()]
        return {'tasks': [marshal(task, fields.tasks) for task in session_tasks]}

    def post(self):
        args = self.reqparse.parse_args()
        session_tasks = settings.tasks[get_api_key.get()]
        task = {
            'id': len(session_tasks) + 1,
            'text': args['text'],
            'complete': False
        }
        session_tasks.append(task)

        return {'task': marshal(task, fields.tasks)}, 201
