/************************************************
  This Flux lookalike is a rewritten version of
  @balsamiqstefano Flux implementation.

  URL: https://github.com/balsamiq/fluqs
************************************************/

'use strict';

var Signal = require('signals');

var debug = false;
var event_stack = [];
var nextEventId = 1;

var validateArguments = function (paramsSpecs, args) {
    if (paramsSpecs.length !== args.length) {
        throw new Error('Action dispatch: Invalid number of arguments (' + args.length + ' instead of ' + paramsSpecs.length + ')');
    }
};

var buildFactory = function (builder, allChildrenName) {
    var factory = function (specs, prefix) {
        prefix = prefix || '';
        var result = {};
        var allChildren = [];
        Object.keys(specs).forEach(function (k) {
            if (Array.isArray(specs[k])) {
                result[k] = builder(specs[k], prefix + k);
                allChildren.push(result[k]);
            } else {
                result[k] = factory(specs[k], prefix + '.' + k + '.');
                allChildren = allChildren.concat(result[k][allChildrenName]);
            }
        });
        result[allChildrenName] = allChildren;
        return result;
    };
    return factory;
};

var buildAction = function (paramsSpecs, signalName) {
    signalName = signalName || '?';
    var signal = new Signal();
    var dispatch = function () {
        if (debug) {
            console.log('ACTION ' + signalName, arguments);
        }
        validateArguments(paramsSpecs, arguments);
        signal.dispatch.apply(signal, arguments);
    };
    dispatch.listen = function (listener) {
        return signal.add(listener);
    };
    dispatch.signal = signal;
    dispatch.reset = function () {
        signal.removeAll();
        signal.forget();
    };
    dispatch.listenOnce = function (listener) {
        return signal.addOnce(listener);
    };
    return dispatch;
};

/************************************************
    Uppdated function
    Save events to event_stack
************************************************/

var forceUpdateEvent = function (event) {
    var handlerName = 'event_' + event.eventId + '_handler';
    var getEvent = (!event.addHandler) ? event : (function () { return event; });
    event_stack.push(getEvent);
};

/************************************************
    Added Mixins
    Execute trigger when a event is emitted
************************************************/

var forceUpdateMixin = {
    componentDidMount: function () {
        var eventHandler = function () {
            this.setState(this._forceUpdate());
        }.bind(this);

        for (var i = 0; i < event_stack.length; i++) {
          event_stack[i].call(this).addHandler(eventHandler);
        }
    },
    componentWillUnmount: function () {
      for (var i = 0; i < event_stack.length; i++) {
        event_stack[i].call(this).removeHandler(eventHandler);
      }
    }
}

var buildEvent = function (cfg, signalName) {
    signalName = signalName || '?';
    cfg = cfg || {};
    var signal = new Signal();
    if (cfg.memorize) {
        signal.memorize = true;
    }
    var event = function () {
        if (debug) {
            console.log('EVENT ' + signalName);
        }
        signal.dispatch();
    };
    event.eventId = nextEventId;
    nextEventId += 1;
    event.addHandler = function (f) {
        return signal.add(f);
    };
    event.removeHandler = function (f) {
        signal.remove(f);
    };
    event.signal = signal;
    event.reset = function () {
        signal.removeAll();
        signal.forget();
    };
    event.listenOnce = function (f) {
        return signal.addOnce(f);
    };
    event.forceUpdateEvent = forceUpdateEvent(event);
    return event;
};


module.exports = {
    setDebug: function (_debug) {
        debug = _debug;
    },
    buildAction: buildAction,
    buildActions: buildFactory(buildAction, 'allActions'),
    buildEvent: buildEvent,
    buildEvents: buildFactory(function (params, signalName) {return buildEvent(params[0], signalName);}, 'allEvents'),
    forceUpdateMixin: forceUpdateMixin
};
