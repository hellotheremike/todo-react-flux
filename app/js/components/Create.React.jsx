var React = require( 'react/addons' );
var Actions = require( '../actions/AppActions' );


var Create = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      value: "",
    };
  },

  render: function(){
    return (
      <div className="todo-add">

        <div className="input-cell">
          <input type="text" valueLink={this.linkState('value')} placeholder="What needs to be done?"/>
        </div>
        <div className="button-cell">
          <a href="#" onClick={this._addTodo}>Add ToDo</a>
        </div>

      </div>
    );
  },

  _addTodo: function(e){
    if (this.state.value.trim()){
      Actions.create({text: this.state.value, complete: false});
      this.setState({value: ""});
    }

    e.preventDefault();
  }

});


module.exports = Create;
