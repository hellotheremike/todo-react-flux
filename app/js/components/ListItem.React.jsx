var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/AppActions');


var Row = React.createClass({
  propTypes: {
    todo: ReactPropTypes.object.isRequired,
    index: ReactPropTypes.string.isRequired,
  },

  getInitialState: function() {
    var isComplete = this.props.todo.complete ? "complete" : "";
    var isOddEven = this.props.index % 2 ? "odd" : "even";

    return {
      checkboxId: ["c", this.props.index ].join(""),
      elementStyle: ["todo-item", isComplete, isOddEven].join(" ").trim(),
      isChecked: this.props.todo.complete
    };
  },

  handleChange: function(event) {
    Actions.toggleComplete(this.props.index, this.props.todo);
  },

  render: function(){
    var isComplete = this.props.todo.complete ? "complete" : "";
    var isOddEven = this.props.index % 2 ? "odd" : "even";


      var checkboxId = ["c", this.props.index ].join("");
      var elementStyle = ["todo-item", isComplete, isOddEven].join(" ").trim();
      var isChecked = this.props.todo.complete;


    return (
      <div className={elementStyle} >

        <input type="checkbox"
          id={checkboxId}
          name={checkboxId}
          checked={isChecked}
          onChange={this.handleChange}
        />

      <label htmlFor={checkboxId}>
          <span></span>
          {this.props.todo.text}
        </label>

        <div className="drag"></div>

      </div>
    );
  }

});


module.exports = Row;
