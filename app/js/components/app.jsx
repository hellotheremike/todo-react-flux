var React = require( 'react' );
var Actions = require( '../actions/AppActions' );
var List = require( './list/list.jsx' );
var Create = require( './create.jsx' );
var Footer = require( './footer.jsx' );


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
    var list = 'loading todos';

    if(this.state.loaded){
      list = < List todos={this.state.allTodos} />
    }

    return (
      <div className="default-component-container">
          <header className="todo-heading">
            <h1>Todos</h1>
          </header>
          < Create />
          {list}
          < Footer todos={this.state.allTodos} />
      </div>
    );
  },
  _onChange: function() {
    this.setState(getTodoState(this.props.store));
  }
});

module.exports = App;
