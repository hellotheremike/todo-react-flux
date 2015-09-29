var React = require( 'react' );
var ReactPropTypes = React.PropTypes;
var ForceUpdateMixin = require('../lib/Flux').forceUpdateMixin;
var Actions = require( '../actions/AppActions' );
var List = require( './List.React.jsx' );
var Create = require( './Create.React.jsx' );
var Footer = require( './Footer.React.jsx' );

var App = React.createClass({

  mixins: [ForceUpdateMixin],

  propTypes: {
   store: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return this._forceUpdate();
  },

  render: function(){
    var listElement = <p className="alert-box">Fetching ToDo's...</p>;

    if(this.state.loaded){
      listElement = < List allTodos={this.state.allTodos} />
    } else if (this.state.error) {
      listElement = <p className="alert-box error">Opss... We had problems authorizing your accesstoken.</p>;
    }

    return (
      <div className="default-component-container">
          <header className="todo-heading">
            <h1>Todos</h1>
          </header>
          < Create />
          {listElement}
          < Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  _forceUpdate: function() {
    var Store = this.props.store;
    return {
      allTodos: Store.getAll(),
      loaded: Store.todosLoaded(),
      error: Store.error()
    };
  }
});

module.exports = App;
