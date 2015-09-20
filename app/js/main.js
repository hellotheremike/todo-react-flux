/** @jsx React.DOM */

var React = require('react');
var Store = require('./stores/AppStore');
var ApiAdapter = require('./adapters/AppApiAdapter');
var App = require('./components/app.jsx');
var Store = require('./stores/AppStore');
var Rest = require('./adapters/AppApiAdapter');


new Rest(Store);

React.render(
    < App store={Store} />,
    document.getElementById('main')
);
