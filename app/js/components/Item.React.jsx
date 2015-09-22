var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/AppActions');


var Row = React.createClass({

  propTypes: {
    todo: ReactPropTypes.object.isRequired,
  },
  handleChange: function(event) {
    Actions.toggleComplete(this.props.position, this.props.todo);
  },

  render: function(){
    var todoComplete = this.props.todo.complete ? "complete" : "";
    var todoMod = this.props.position % 2 ? "odd" : "even";
    var id = ["c", this.props.position ].join("");

    var style = ["todo-item", todoComplete, todoMod].join(" ").trim();

    return (
      <div className={style} >

        <input type="checkbox" id={id} name={id} checked={this.props.todo.complete} onChange={this.handleChange} />
        <label htmlFor={id}><span></span>{this.props.todo.text}</label>
        <div className="drag"></div>


      </div>
    );
  }

});


module.exports = Row;
