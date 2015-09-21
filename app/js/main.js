/** @jsx React.DOM */

var React = require('react');
var Store = require('./stores/AppStore');
var App = require('./components/app.jsx');
var Store = require('./stores/AppStore');
var InitiateRestListeners = require('./adapters/AppApiAdapter');


new InitiateRestListeners(Store);

React.render(
    < App store={Store} />,
    document.getElementById('main')
);
