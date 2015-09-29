from flask import abort
from flask.ext.restful import Resource, reqparse
from utils import settings, authenticate, get_api_key

# HTTP-Methods for switching postision of Tasks
# URL: /todo/api/v1.0/tasks/reorder
class TaskReorderResource(Resource):
    method_decorators = [authenticate]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('to', type=int, location='json', required=True)
        self.reqparse.add_argument('from', type=int, location='json', required=True)
        super(TaskReorderResource, self).__init__()

    def put(self):
        args = self.reqparse.parse_args()
        session_tasks = settings.tasks[get_api_key()]
        tasks_range = range(0, len(session_tasks)-1)

        if args['from'] in tasks_range and args['to'] in tasks_range:
            abort(500)

        session_tasks.insert(args['to'], session_tasks.pop(args['from']))

        return args, 201
