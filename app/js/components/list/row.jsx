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

    var style = [todoComplete, todoMod].join(" ").trim();

    return (
      <div className={style}>
        < Checkbox todo={this.props.todo} position={this.props.position}/>
        {this.props.todo.text}
      </div>
    );
  }

});


module.exports = Row;
