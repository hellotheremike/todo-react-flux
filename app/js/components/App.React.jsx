var React = require( 'react' );
var Actions = require( '../actions/AppActions' );
var List = require( './List.React.jsx' );
var Create = require( './Create.React.jsx' );
var Footer = require( './Footer.React.jsx' );


function getTodoState(store) {
  return {
    allTodos: store.getAll(),
    loaded: store.todosLoaded(),
  };
}

var App = React.createClass({

  getInitialState: function() {
    return getTodoState(this.props.store);
  },

  componentDidMount: function() {
    var Store = this.props.store;
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    var Store = this.props.store;
    Store.removeChangeListener(this._onChange);
  },

  render: function(){
    var listElement = 'Loading todos';

    if(this.state.loaded){
      listElement = < List todos={this.state.allTodos} />
    }

    return (
      <div className="default-component-container">
          <header className="todo-heading">
            <h1>Todos</h1>
          </header>
          < Create />
          {listElement}
          < Footer todos={this.state.allTodos} />
      </div>
    );
  },
  _onChange: function() {
    this.setState(getTodoState(this.props.store));
  }
});

module.exports = App;
