from flask.ext.restful import Resource, reqparse, marshal
from utils import settings, authenticate, get_api_key
import fields

# HTTP-Methods for interacting with all Tasks
# URL: /todo/api/v1.0/tasks
class TasksResource(Resource):
    method_decorators = [authenticate]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, location='json')
        self.reqparse.add_argument('complete', type=bool, location='json')
        super(TasksResource, self).__init__()

    # Get all tasks
    def get(self):
        session_tasks = settings.tasks[get_api_key()]
        return {'tasks': [marshal(task, fields.tasks) for task in session_tasks]}

    # Create new task
    def post(self):
        self.reqparse.add_argument('text', type=str, required=True, location='json')
        args = self.reqparse.parse_args()
        session_tasks = settings.tasks[get_api_key()]
        task = {
            'id': len(session_tasks) + 1,
            'text': args['text'],
            'complete': False
        }
        session_tasks.append(task)

        return {'task': marshal(task, fields.tasks)}, 201 # Return new task

    # Update all tasks
    def put(self):
        args = self.reqparse.parse_args()
        session_tasks = settings.tasks[get_api_key()]
        for task in session_tasks:
            for key, value in args.items():
                if value is not None:
                    task[key] = value

        return {'tasks': [marshal(task, fields.tasks) for task in session_tasks]}
