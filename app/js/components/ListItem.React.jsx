var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/AppActions');


var Row = React.createClass({

  propTypes: {
    todo: ReactPropTypes.object.isRequired,
    index: ReactPropTypes.string.isRequired,
  },

  render: function(){
    var isComplete = this.props.todo.complete ? "complete" : "";
    var isOddEven = this.props.index % 2 ? "odd" : "even";

    var checkboxId = ["c", this.props.index ].join("");
    var elementStyle = ["todo-item", isComplete, isOddEven].join(" ").trim();
    var isChecked = this.props.todo.complete;
    var itemText = this.props.todo.text;


    return (
      <div className={elementStyle} >

        <input type="checkbox"
          id={checkboxId}
          name={checkboxId}
          checked={isChecked}
          onChange={this._handleChange}
        />

      <label htmlFor={checkboxId}>
          <span></span>
          {itemText}
        </label>

        <div className="drag"></div>

      </div>
    );
  },

  _handleChange: function(event) {
    Actions.update(this.props.todo);
  }

});


module.exports = Row;
