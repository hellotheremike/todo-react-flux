# React & Flux ToDo App

* This is my first React App that implements React on top of the Flux architecture with a supporting REST-api to hold the state of the client.

* The API uses sessions so multiple users can use the application.


**NOTE!**
The API holds app state in memory so ToDo's will be deleted when the API is restarted. (It will make it easier to run the application on every computer).

## Installation

### Client (using IO.js v3.3.1)
```
  git clone git@github.com:hellotheremike/todo-react-flux.git
  cd todo-react-flux
  npm install -g gulp
  npm install
  gulp --production
```

### API/Server (using python v2.7.9)
```
  pip install Flask
  pip install flask-restful
  python server/app.py
```


## Usage
* Run `python server/app.py` from project directory
* Go to [http://localhost:5000](http://localhost:5000) and create new todos.

## TODO
- [ ] Specs API
- [ ] Specs Client
- [x] Build API
- [x] Build Client
