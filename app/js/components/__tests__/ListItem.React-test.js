var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ListItemComponent = require('../ListItem.React.jsx');

jest.dontMock('../ListItem.React.jsx');
jest.dontMock('../../actions/AppActions');

var Actions = require('../../actions/AppActions');
describe('ListItem.React', function() {
  beforeEach(function() {


    // Todo Data
    // Todo = {text: "test", complete:false}
    // Notice this is the Indicator *class*...

    // ...and this is an Indicator *instance* (rendered into the DOM).

    // Jest will mock the functions on this module automatically for us.
    //

    Actions.update = jest.genMockFunction();
  });


  it('changes the checkbox value after click', function() {
    var React = require('react/addons');
    var ListItem = require('../ListItem.React.jsx');
    var TestUtils = React.addons.TestUtils;

    var todo = {text: "test", complete: false}

    // Render a checkbox with label in the document
    var Item = TestUtils.renderIntoDocument(
      <ListItem todo={todo} index="1" />
    );


    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      Item, 'label');
    expect(React.findDOMNode(label).textContent).toEqual('test');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      Item, 'input');
    TestUtils.Simulate.change(input);
    expect(Actions.update).toBeCalled();

  });
});


// var React = require('react/addons');
// var ListItem = require('../ListItem.React.jsx');
// var TestUtils = React.addons.TestUtils;
// var todo = {text: "test", complete: false}
//
//
//
// // Render a checkbox with label in the document
// var Item = TestUtils.renderIntoDocument(
//   <ListItem todo={todo} index="1" />
// );
//
// Item._handleChange = jest.genMockFunction();;
//
// // Verify that it's Off by default
// var label = TestUtils.findRenderedDOMComponentWithTag(
//   Item, 'label');
// expect(React.findDOMNode(label).textContent).toEqual('test');
//
// // Simulate a click and verify that it is now On
// var input = TestUtils.findRenderedDOMComponentWithTag(
//   Item, 'input');
// TestUtils.Simulate.change(input);
// expect(Item._handleChange).toBeCalled();
