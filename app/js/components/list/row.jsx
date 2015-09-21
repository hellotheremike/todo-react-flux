var React = require('react');
var ReactPropTypes = React.PropTypes;
var Checkbox = require('./checkbox.jsx');
var Actions = require('../../actions/AppActions');


var Row = React.createClass({

  propTypes: {
    todo: ReactPropTypes.object.isRequired,
  },

  render: function(){
    var todoComplete = this.props.todo.complete ? "complete" : "";
    var todoMod = this.props.position % 2 ? "odd" : "even";

    var style = ["todo-item", todoComplete, todoMod].join(" ").trim();

    return (
      <div className={style} >
        < Checkbox todo={this.props.todo} position={this.props.position}/>
        <div className="todo-text">
          {this.props.todo.text}
        </div>
        <div className="drag">
          X
        </div>
      </div>
    );
  }

});


module.exports = Row;
