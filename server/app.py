#!flask/bin/python -B

from flask import Flask, session, render_template
from flask.ext.restful import Api
from utils import settings, validate_token
from resources.tasks import TasksResource, TaskResource, TaskReorderResource

app = Flask(__name__, static_url_path="")
api = Api(app)
settings.init() #Init global settins variables (tasks)

# Routes
api.add_resource(TasksResource, '/todo/api/v1.0/tasks', endpoint='tasks')
api.add_resource(TaskResource, '/todo/api/v1.0/tasks/<int:id>', endpoint='task')
api.add_resource(TaskReorderResource, '/todo/api/v1.0/tasks/reorder', endpoint='reorder')


# Serve template file and render the session token for API-access
@app.route('/')
@validate_token
def root():
    return render_template('index.html', token=session['token'])

# Serve static files
@app.route('/<path:path>')
def static_proxy(path):
    return app.send_static_file(path)


if __name__ == '__main__':
    app.secret_key = 'F12Zr47j\3yX R~X@H!jmM]Lwf/,?KT'
    app.run(debug=True)
