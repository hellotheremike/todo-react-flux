/** @jsx React.DOM */

var React = require('react');
var Store = require('./stores/AppStore');
var App = require('./components/app.jsx');
var Store = require('./stores/AppStore');
var InitiateRestAdapter = require('./adapters/AppApiAdapter');


new InitiateRestAdapter(Store);

React.render(
    < App store={Store} />,
    document.getElementById('main')
);
