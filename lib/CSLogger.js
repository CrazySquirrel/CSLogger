(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CSLogger", [], factory);
	else if(typeof exports === 'object')
		exports["CSLogger"] = factory();
	else
		root["CSLogger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _AnimationFrame = __webpack_require__(6);
	
	var _AnimationFrame2 = _interopRequireDefault(_AnimationFrame);
	
	var _Utils = __webpack_require__(7);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	var _ravenJs = __webpack_require__(26);
	
	var _ravenJs2 = _interopRequireDefault(_ravenJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MD5 = __webpack_require__(32);
	/**
	 * Import Animation frame
	 */
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	var STATUSES = {
	    600: "Some uncaught error",
	    503: "Attempt reattach the scripts to the non-object",
	    502: "Block doesn't exist",
	    501: "Banner place doesn't exist",
	    500: "Some caught error",
	    401: "Deprecated call",
	    400: "Some warning",
	    300: "Some info",
	    200: "Some log",
	    101: "Entry point",
	    100: "Some debug",
	    0: "Something"
	};
	
	var CSLogger = function () {
	    function CSLogger() {
	        _classCallCheck(this, CSLogger);
	    }
	
	    CSLogger.init = function init(settings) {
	        if ((typeof settings === "undefined" ? "undefined" : _typeof(settings)) === "object") {
	            for (var prop in settings) {
	                if (settings.hasOwnProperty(prop)) {
	                    CSLogger.settings[prop] = settings[prop];
	                }
	            }
	        }
	        if (false) {
	            _ravenJs2.default.config(CSLogger.settings.sentryUrl, {
	                logger: "CSLogger",
	                release: CSLogger.settings.projectVersion,
	                environment: process.env.NODE_ENV
	            }).install();
	        }
	        return CSLogger;
	    };
	    /**
	     * Log method
	     * @param status
	     * @param message
	     * @param properties
	     */
	
	
	    CSLogger.log = function log(status, message, properties) {
	        if (typeof status === "number" && status > 0 && typeof message === "string" && message.length > 0) {
	            status = status || 101;
	            message = message || STATUSES[status] || "";
	            properties = properties || {};
	            if (status >= CSLogger.settings.minLoggerLevel) {
	                var logObj = {
	                    date: new Date(),
	                    location: location.href,
	                    projectName: CSLogger.settings.projectName,
	                    projectVersion: CSLogger.settings.projectVersion,
	                    stack: _Utils2.default.stack(),
	                    user: _Utils2.default.User.getInfo(),
	                    message: message,
	                    properties: properties,
	                    status: status
	                };
	                CSLogger.arrLog.push(logObj);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	
	    CSLogger.statusLavel = function statusLavel(status) {
	        if (typeof status === "number" && status > 0) {
	            if (status >= 200 && status < 300) {
	                return "log";
	            } else if (status >= 300 && status < 400) {
	                return "info";
	            } else if (status >= 400 && status < 500) {
	                return "warning";
	            } else if (status >= 500) {
	                return "error";
	            }
	            return "debug";
	        } else {
	            return false;
	        }
	    };
	
	    CSLogger.showMessange = function showMessange(status, message) {
	        if (typeof status === "number" && status > 0 && typeof message === "string" && message.length > 0) {
	            var messangeLavel = CSLogger.statusLavel(status);
	            if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && _typeof(window.Debug) === "object" && _typeof(window.Debug.console) === "object" && typeof window.Debug.console[messangeLavel] === "function") {
	                window.Debug.console[messangeLavel](message);
	            } else if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && _typeof(window.CSDebug) === "object" && _typeof(window.CSDebug.console) === "object" && typeof window.CSDebug.console[messangeLavel] === "function") {
	                window.CSDebug.console[messangeLavel](message);
	            } else if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object" && typeof console[messangeLavel] === "function") {
	                console[messangeLavel](message);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Log send watcher
	     */
	
	
	    CSLogger.watch = function watch() {
	        if (CSLogger.arrLog.length > 0 && CSLogger.arrLog.length < 100) {
	            for (var _iterator = CSLogger.arrLog, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;
	
	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }
	
	                var l = _ref;
	
	                var data = encodeURIComponent(JSON.stringify(l));
	                var uid = MD5(JSON.stringify({
	                    message: l.message,
	                    projectName: l.projectName,
	                    projectVersion: l.projectVersion,
	                    status: l.status
	                })).toString();
	                if (CSLogger.arrSended.indexOf(uid) === -1) {
	                    CSLogger.arrSended.push(uid);
	                    if (false) {
	                        _ravenJs2.default.captureMessage(l.message, {
	                            level: CSLogger.statusLavel(l.status),
	                            logger: "CSLogger",
	                            extra: l
	                        });
	                    } else if (false) {
	                        var i = new Image();
	                        i.src = CSLogger.settings.loggerUrl + "?uid=" + uid + "&data=" + data;
	                    } else {
	                        CSLogger.showMessange(l.status, l);
	                    }
	                }
	            }
	            CSLogger.arrLog = [];
	        }
	    };
	
	    return CSLogger;
	}();
	
	CSLogger.eventListenerAdded = false;
	CSLogger.arrLog = [];
	CSLogger.arrSended = [];
	CSLogger.projectName = "CSLogger";
	CSLogger.projectVersion = "1.0.18";
	CSLogger.settings = {
	    sentryUrl: "",
	    loggerUrl: "",
	    minLoggerLevel: 500,
	    projectName: "",
	    projectVersion: ""
	};
	/**
	 * Add logger to global error event
	 */
	if (!root.eventListenerAdded) {
	    (function () {
	        var errorHandler = root.onerror;
	        root.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
	            if (typeof errorHandler === "function") {
	                errorHandler(errorMsg, url, lineNumber, column, errorObj);
	            }
	            CSLogger.log(600, errorMsg, {
	                column: column,
	                errorObj: errorObj,
	                lineNumber: lineNumber,
	                url: url
	            });
	        };
	        root.eventListenerAdded = true;
	    })();
	}
	/**
	 * Subscribe logger to watcher
	 */
	_AnimationFrame2.default.subscribe({}, CSLogger.watch, []);
	/**
	 * Return logger
	 */
	var _Init = CSLogger.init;
	exports.default = _Init;
	
	module.exports = _Init;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	/**
	 * requestAnimationFrame polyfill
	 */
	root.requestAnimationFrame = function () {
	    return typeof root !== "undefined" && (root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame) || function (callback) {
	        root.setTimeout(callback, 1000 / 60);
	    };
	}();
	/**
	 * Bind polyfill
	 */
	function bind(b) {
	    /**
	     * If try bind variable that not a function, then throw error
	     */
	    if (typeof this !== "function") {
	        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }
	    /**
	     * let Array slice function
	     */
	    var a = Array.prototype.slice;
	    var f = a.call(arguments, 1);
	    var e = this;
	    function c() {
	        /*
	         if (
	         typeof root !== "undefined" &&
	         typeof root.console === "object" &&
	         typeof root.console.log === "function"
	         ) {
	         root.console.log("Bind polyfill");
	         }
	         */
	    }
	    function d() {
	        return e.apply(this instanceof c ? this : b || root, f.concat(a.call(arguments)));
	    }
	    /**
	     * Registered this prototype as prototype to bind implementation functions
	     */
	    c.prototype = this.prototype;
	    d.prototype = new c();
	    /**
	     * Return bind polyfill
	     */
	    return d;
	}
	Function.prototype.bind = Function.prototype.bind || bind;
	/**
	 * Object.keys polyfill
	 */
	function keys() {
	    var hasDoNotEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
	    var doNotEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
	    var doNotEnumsLength = doNotEnums.length;
	    return function (obj) {
	        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object" && (typeof obj !== "function" || obj === null)) {
	            throw new TypeError("Object.keys called on non-object");
	        }
	        var result = [];
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                result.push(prop);
	            }
	        }
	        if (hasDoNotEnumBug) {
	            for (var i = 0; i < doNotEnumsLength; i++) {
	                if (Object.prototype.hasOwnProperty.call(obj, doNotEnums[i])) {
	                    result.push(doNotEnums[i]);
	                }
	            }
	        }
	        return result;
	    };
	}
	Object.keys = Object.keys || keys();
	/**
	 * Request animation frame call stack class
	 */
	
	var AnimationFrame = function () {
	    /**
	     * Create request animation frame
	     */
	    function AnimationFrame() {
	        _classCallCheck(this, AnimationFrame);
	
	        /**
	         * Subscribed methods
	         */
	        this.stack = {};
	        /**
	         * Start requestAnimationFrame watcher
	         */
	        this.watch();
	    }
	    /**
	     * Subscribe method to watch
	     * @param context
	     * @param callback
	     * @param params
	     * @param ID
	     * @return {boolean|string}
	     */
	
	
	    AnimationFrame.prototype.subscribe = function subscribe() {
	        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : root;
	        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	            return null;
	        };
	        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	        var ID = arguments[3];
	
	        /**
	         * If context and callback passed and they are object and function
	         */
	        if ((typeof context === "undefined" ? "undefined" : _typeof(context)) === "object" && typeof callback === "function" && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object" && Array.isArray(params) && (ID === undefined || typeof ID === "string")) {
	            /**
	             * Create UID
	             */
	            var d = new Date();
	            var localID = ID || "x-" + d.getTime() + "-" + Math.round(Math.random() * 1e6);
	            /**
	             * Add method to the stack
	             */
	            this.stack[localID] = {
	                context: context,
	                callback: callback,
	                params: params
	            };
	            /**
	             * Write to console count of the subscribed methods
	             */
	            /**
	             * Return UID
	             */
	            return localID;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Unsubscribe method by ID
	     * @param ID
	     */
	
	
	    AnimationFrame.prototype.unsubscribe = function unsubscribe(ID) {
	        if (typeof ID === "string") {
	            /**
	             * If required method exist in the stack
	             */
	            if (this.stack[ID]) {
	                /**
	                 * Nullify method in the stack and destroy it
	                 */
	                this.stack[ID] = false;
	                delete this.stack[ID];
	            }
	        }
	    };
	    /**
	     * Watch and call methods
	     */
	
	
	    AnimationFrame.prototype.watch = function watch() {
	        try {
	            /**
	             * If stack exist, it is an object and it is contains methods
	             */
	            if (this.stack && _typeof(this.stack) === "object" && Object.keys(this.stack).length > 0) {
	                /**
	                 * Loop all methods in stack
	                 */
	                for (var ID in this.stack) {
	                    /**
	                     * Process only methods without extended properties
	                     */
	                    if (this.stack.hasOwnProperty(ID)) {
	                        try {
	                            /**
	                             * If ID exist and it is a string
	                             */
	                            if (ID && typeof ID === "string") {
	                                /**
	                                 * Get subscribed method params by ID
	                                 */
	                                var objCall = this.stack[ID];
	                                /**
	                                 * If params exist, it is an object, and it is contains call context,
	                                 * callback, and parameters which is array
	                                 */
	                                if (objCall && (typeof objCall === "undefined" ? "undefined" : _typeof(objCall)) === "object" && objCall.context && objCall.callback && objCall.params && _typeof(objCall.context) === "object" && typeof objCall.callback === "function" && Array.isArray(objCall.params)) {
	                                    /**
	                                     * Call subscribed method
	                                     */
	                                    objCall.callback.apply(objCall.context, objCall.params);
	                                }
	                            }
	                        } catch (e) {}
	                    }
	                }
	            }
	        } catch (e) {}
	        /**
	         * Recall watcher
	         */
	        root.requestAnimationFrame(this.watch.bind(this));
	    };
	
	    return AnimationFrame;
	}();
	/**
	 * Create single request animation frame object
	 * @type {AnimationFrame}
	 */
	
	
	root.AnimationFrame = root.AnimationFrame || new AnimationFrame();
	/**
	 * Export single AnimationFrame instance
	 */
	var _AnimationFrame = root.AnimationFrame;
	exports.default = _AnimationFrame;
	
	module.exports = _AnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _UtilsAnimation = __webpack_require__(8);
	
	var _UtilsAnimation2 = _interopRequireDefault(_UtilsAnimation);
	
	var _UtilsBrowser = __webpack_require__(10);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsCookie = __webpack_require__(11);
	
	var _UtilsCookie2 = _interopRequireDefault(_UtilsCookie);
	
	var _UtilsDocument = __webpack_require__(19);
	
	var _UtilsDocument2 = _interopRequireDefault(_UtilsDocument);
	
	var _UtilsDOM = __webpack_require__(21);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsMouse = __webpack_require__(22);
	
	var _UtilsMouse2 = _interopRequireDefault(_UtilsMouse);
	
	var _UtilsScreen = __webpack_require__(23);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(24);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	var _UtilsUser = __webpack_require__(25);
	
	var _UtilsUser2 = _interopRequireDefault(_UtilsUser);
	
	var _UtilsWindow = __webpack_require__(20);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Global Utils class
	 */
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    Utils.warn = function warn(messange) {
	        if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	            if (typeof console.warn === "function") {
	                //console.warn(messange);
	                return messange;
	            } else if (typeof console.log === "function") {
	                //console.log(messange);
	                return messange;
	            }
	        }
	    };
	    /**
	     * @deprecated Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.
	     */
	
	
	    Utils.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        Utils.warn("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
	        return Utils.DOM.getBoundingClientRect(domNode, domDocument, showForce);
	    };
	
	    /**
	     * @deprecated Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.
	     */
	    Utils.findElementPosition = function findElementPosition(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        Utils.warn("Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.");
	        return Utils.DOM.findElementPosition(domNode, domDocument, showForce);
	    };
	    /**
	     * Transfer static methods into the object
	     * @param realObject
	     * @param className
	     */
	
	
	    Utils.implementationStaticMethods = function implementationStaticMethods(realObject, className) {
	        if (!!realObject && (typeof realObject === "undefined" ? "undefined" : _typeof(realObject)) === "object") {
	            (function () {
	                var staticClass = realObject.constructor;
	                if (typeof staticClass === "function") {
	                    var methods = Object.keys(staticClass);
	                    if (methods && methods.length > 0) {
	                        var _loop = function _loop() {
	                            if (_isArray) {
	                                if (_i >= _iterator.length) return "break";
	                                _ref = _iterator[_i++];
	                            } else {
	                                _i = _iterator.next();
	                                if (_i.done) return "break";
	                                _ref = _i.value;
	                            }
	
	                            var method = _ref;
	
	                            if (typeof realObject[method] === "undefined") {
	                                realObject[method] = function () {
	                                    if (typeof staticClass !== "undefined") {
	                                        Utils.warn("That method was deprecated and soon will be removed. Please use " + (className || staticClass && staticClass.name || "Unknown") + "." + method + " method.");
	                                    }
	                                    return staticClass[method].apply(staticClass, arguments);
	                                };
	                            }
	                        };
	
	                        for (var _iterator = methods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                            var _ref;
	
	                            var _ret2 = _loop();
	
	                            if (_ret2 === "break") break;
	                        }
	                    }
	                }
	            })();
	        }
	    };
	    /**
	     * Get call stack trace
	     * @return Array<Object>
	     */
	
	
	    Utils.stack = function stack() {
	        var e = new Error();
	        return e && e.stack && e.stack.split("\n").slice(5).map(function (s) {
	            if (!s) {
	                return {};
	            }
	            var match = /^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                if (match[1]) {
	                    match[1] = /([^\/<]+)/ig.exec(match[1]);
	                    if (match[1]) {
	                        match[1] = match[1][0];
	                    }
	                }
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[5] || "",
	                    file: match[3] || "",
	                    line: match[4] || "",
	                    method: match[1] + ":" + match[2] || ""
	                };
	            }
	            match = /^(.*)@(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[3] || "",
	                    file: match[1] || "",
	                    line: match[2] || "",
	                    method: ""
	                };
	            }
	            return s;
	        }) || [];
	    };
	    /**
	     * Get random ID
	     * @return {string}
	     */
	
	
	    Utils.getUID = function getUID() {
	        return Math.random().toString(36).substring(2);
	    };
	
	    return Utils;
	}();
	
	exports.default = Utils;
	
	Utils.Animation = _UtilsAnimation2.default;
	Utils.Browser = _UtilsBrowser2.default;
	Utils.Cookie = _UtilsCookie2.default;
	Utils.DOM = _UtilsDOM2.default;
	Utils.Document = _UtilsDocument2.default;
	Utils.Mouse = _UtilsMouse2.default;
	Utils.Screen = _UtilsScreen2.default;
	Utils.System = _UtilsSystem2.default;
	Utils.User = _UtilsUser2.default;
	Utils.Window = _UtilsWindow2.default;
	module.exports = Utils;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _UtilsAnimationEasing = __webpack_require__(9);
	
	var _UtilsAnimationEasing2 = _interopRequireDefault(_UtilsAnimationEasing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animation = function Animation() {
	  _classCallCheck(this, Animation);
	};
	
	exports.default = Animation;
	
	Animation.Easing = _UtilsAnimationEasing2.default;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Different time animation functions
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Easing = function () {
	    function Easing() {
	        _classCallCheck(this, Easing);
	    }
	
	    Easing.isValidParams = function isValidParams(t, b, c, d, s) {
	        return typeof t === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number" && (typeof s === "undefined" || typeof s === "number") && t < d;
	    };
	
	    Easing.swing = function swing(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return Easing[Easing.def](t, b, c, d);
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInQuad = function easeInQuad(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutQuad = function easeOutQuad(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * (t /= d) * (t - 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t + b;
	            }
	            return -c / 2 * (--t * (t - 2) - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInCubic = function easeInCubic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutCubic = function easeOutCubic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * ((t = t / d - 1) * t * t + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutCubic = function easeInOutCubic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t * t + b;
	            }
	            return c / 2 * ((t -= 2) * t * t + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInQuart = function easeInQuart(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t * t * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutQuart = function easeOutQuart(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutQuart = function easeInOutQuart(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t * t * t + b;
	            }
	            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInQuint = function easeInQuint(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t * t * t * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutQuint = function easeOutQuint(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutQuint = function easeInOutQuint(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t * t * t * t + b;
	            }
	            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInSine = function easeInSine(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutSine = function easeOutSine(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * Math.sin(t / d * (Math.PI / 2)) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutSine = function easeInOutSine(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInExpo = function easeInExpo(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutExpo = function easeOutExpo(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutExpo = function easeInOutExpo(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if (t === 0) {
	                return b;
	            }
	            if (t === d) {
	                return b + c;
	            }
	            if ((t /= d / 2) < 1) {
	                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	            }
	            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInCirc = function easeInCirc(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutCirc = function easeOutCirc(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutCirc = function easeInOutCirc(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	            }
	            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInElastic = function easeInElastic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t === 0) {
	                return b;
	            }
	            if ((t /= d) === 1) {
	                return b + c;
	            }
	            if (!p) {
	                p = d * .3;
	            }
	            if (a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            } else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutElastic = function easeOutElastic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t === 0) {
	                return b;
	            }
	            if ((t /= d) === 1) {
	                return b + c;
	            }
	            if (!p) {
	                p = d * .3;
	            }
	            if (a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            } else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutElastic = function easeInOutElastic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t === 0) {
	                return b;
	            }
	            if ((t /= d / 2) === 2) {
	                return b + c;
	            }
	            if (!p) {
	                p = d * (.3 * 1.5);
	            }
	            if (a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            } else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            if (t < 1) {
	                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            }
	            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInBack = function easeInBack(t, b, c, d, s) {
	        if (Easing.isValidParams(t, b, c, d, s)) {
	            if (s === undefined) {
	                s = 1.70158;
	            }
	            return c * (t /= d) * t * ((s + 1) * t - s) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutBack = function easeOutBack(t, b, c, d, s) {
	        if (Easing.isValidParams(t, b, c, d, s)) {
	            if (s === undefined) {
	                s = 1.70158;
	            }
	            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutBack = function easeInOutBack(t, b, c, d, s) {
	        if (Easing.isValidParams(t, b, c, d, s)) {
	            if (s === undefined) {
	                s = 1.70158;
	            }
	            if ((t /= d / 2) < 1) {
	                return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	            }
	            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInBounce = function easeInBounce(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutBounce = function easeOutBounce(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d) < 1 / 2.75) {
	                return c * (7.5625 * t * t) + b;
	            } else if (t < 2 / 2.75) {
	                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	            } else if (t < 2.5 / 2.75) {
	                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	            } else {
	                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	            }
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutBounce = function easeInOutBounce(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if (t < d / 2) {
	                return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
	            }
	            return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    return Easing;
	}();
	
	exports.default = Easing;
	
	Easing.def = "easeOutQuad";

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with browser
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Browser = function () {
	    function Browser() {
	        _classCallCheck(this, Browser);
	    }
	
	    /**
	     * Get browser info
	     * @return {{browser: string, mobile: boolean, version: string}}
	     */
	    Browser.getInfo = function getInfo() {
	        return {
	            browser: Browser.getName(),
	            mobile: Browser.isMobile(),
	            version: Browser.getVersion()
	        };
	    };
	    /**
	     * Get browser name
	     * @return {string}
	     */
	
	
	    Browser.getName = function getName() {
	        var browser = void 0;
	        if (Browser.isOpera()) {
	            browser = "Opera";
	        } else if (Browser.isOperaNew()) {
	            browser = "Opera";
	        } else if (Browser.isMSIE()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isMSIENew()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isChrome()) {
	            browser = "Chrome";
	        } else if (Browser.isFirefox()) {
	            browser = "Firefox";
	        } else if (Browser.isSafari()) {
	            browser = "Safari";
	        } else if (Browser.isOther()) {
	            browser = Browser.getOtherName();
	        }
	        return browser;
	    };
	    /**
	     * Get browser version
	     * @return {string}
	     */
	
	
	    Browser.getVersion = function getVersion() {
	        var version = void 0;
	        if (Browser.isOpera()) {
	            version = Browser.getOperaVersion();
	        } else if (Browser.isOperaNew()) {
	            version = Browser.getOperaNewVersion();
	        } else if (Browser.isMSIE()) {
	            version = Browser.getMSIEVersion();
	        } else if (Browser.isMSIENew()) {
	            version = Browser.getMSIENewVersion();
	        } else if (Browser.isChrome()) {
	            version = Browser.getChromeVersion();
	        } else if (Browser.isFirefox()) {
	            version = Browser.getFirefoxVersion();
	        } else if (Browser.isSafari()) {
	            version = Browser.getSafariVersion();
	        } else if (Browser.isOther()) {
	            version = Browser.getOtherVersion();
	        }
	        return version;
	    };
	    /**
	     * Trim browser version
	     * @param version
	     * @return {string}
	     */
	
	
	    Browser.trimVersion = function trimVersion(version) {
	        if (typeof version === "string") {
	            var chars = [";", " ", ")"];
	            for (var _iterator = chars, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;
	
	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }
	
	                var char = _ref;
	
	                var ix = version.indexOf(char);
	                if (ix !== -1) {
	                    version = version.substring(0, ix);
	                }
	            }
	            return version;
	        } else {
	            return "";
	        }
	    };
	    /**
	     * Check if it is mobile
	     * @return {boolean}
	     */
	
	
	    Browser.isMobile = function isMobile() {
	        return (/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)
	        );
	    };
	    /**
	     * Check if it is opera browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOpera = function isOpera() {
	        return navigator.userAgent.indexOf("Opera") !== -1;
	    };
	    /**
	     * Get opera browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaVersion = function getOperaVersion() {
	        var verOffset = navigator.userAgent.indexOf("Opera");
	        var version = navigator.userAgent.substring(verOffset + 6);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is opera new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOperaNew = function isOperaNew() {
	        return navigator.userAgent.indexOf("OPR") !== -1;
	    };
	    /**
	     * Get opera new browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaNewVersion = function getOperaNewVersion() {
	        var verOffset = navigator.userAgent.indexOf("OPR");
	        var version = navigator.userAgent.substring(verOffset + 4);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIE = function isMSIE() {
	        return navigator.userAgent.indexOf("MSIE") !== -1;
	    };
	    /**
	     * Get msie browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIEVersion = function getMSIEVersion() {
	        var verOffset = navigator.userAgent.indexOf("MSIE");
	        var version = navigator.userAgent.substring(verOffset + 5);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIENew = function isMSIENew() {
	        return navigator.userAgent.indexOf("Trident/") !== -1;
	    };
	    /**
	     * Get msie new browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIENewVersion = function getMSIENewVersion() {
	        var version = navigator.userAgent.substring(navigator.userAgent.indexOf("rv:") + 3);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is chrome browser
	     * @return {boolean}
	     */
	
	
	    Browser.isChrome = function isChrome() {
	        return navigator.userAgent.indexOf("Chrome") !== -1;
	    };
	    /**
	     * Get chrome browser version
	     * @return {string}
	     */
	
	
	    Browser.getChromeVersion = function getChromeVersion() {
	        var verOffset = navigator.userAgent.indexOf("Chrome");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is safari browser
	     * @return {boolean}
	     */
	
	
	    Browser.isSafari = function isSafari() {
	        return navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1;
	    };
	    /**
	     * Get safari browser version
	     * @return {string}
	     */
	
	
	    Browser.getSafariVersion = function getSafariVersion() {
	        var verOffset = navigator.userAgent.indexOf("Safari");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is firefox browser
	     * @return {boolean}
	     */
	
	
	    Browser.isFirefox = function isFirefox() {
	        return navigator.userAgent.indexOf("Firefox") !== -1;
	    };
	    /**
	     * Get firefox browser version
	     * @return {string}
	     */
	
	
	    Browser.getFirefoxVersion = function getFirefoxVersion() {
	        var verOffset = navigator.userAgent.indexOf("Firefox");
	        var version = navigator.userAgent.substring(verOffset + 8);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is other browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOther = function isOther() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        return nameOffset < verOffset;
	    };
	    /**
	     * Get other browser name
	     * @return {string}
	     */
	
	
	    Browser.getOtherName = function getOtherName() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var browser = navigator.userAgent.substring(nameOffset, verOffset);
	        if (browser.toLowerCase() === browser.toUpperCase()) {
	            browser = navigator.appName;
	        }
	        return browser;
	    };
	    /**
	     * Get other browser version
	     * @return {string}
	     */
	
	
	    Browser.getOtherVersion = function getOtherVersion() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var version = navigator.userAgent.substring(verOffset + 1);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check browser support
	     * @return {boolean}
	     */
	
	
	    Browser.isSupported = function isSupported() {
	        return !Browser.isMSIE() || parseInt(Browser.getMSIEVersion(), 10) > 8;
	    };
	    /**
	     * Check if it is WebKit browser
	     * @return {boolean}
	     */
	
	
	    Browser.isWebKit = function isWebKit() {
	        return navigator.userAgent.indexOf("AppleWebKit/") !== -1;
	    };
	    /**
	     * Check if it is Gecko browser
	     * @return {boolean}
	     */
	
	
	    Browser.isGecko = function isGecko() {
	        return navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") === -1;
	    };
	    /**
	     * Check if it is Android browser
	     * @return {boolean}
	     */
	
	
	    Browser.isAndroid = function isAndroid() {
	        return navigator.userAgent.indexOf("Android") > -1;
	    };
	    /**
	     * Check if it is Linux browser
	     * @return {boolean}
	     */
	
	
	    Browser.isLinux = function isLinux() {
	        return navigator.userAgent.indexOf("Linux") > -1;
	    };
	    /**
	     * Check if it is iPad browser
	     * @return {boolean}
	     */
	
	
	    Browser.isTabletPC = function isTabletPC() {
	        return navigator.userAgent.indexOf("iPad") > -1;
	    };
	
	    return Browser;
	}();
	
	exports.default = Browser;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var URL = __webpack_require__(12);
	/**
	 * Class for working with cookie
	 */
	
	var Cookie = function () {
	    function Cookie() {
	        _classCallCheck(this, Cookie);
	    }
	
	    /**
	     * The method returns the flag whether supported this storage type or not
	     * @returns {boolean}
	     */
	    Cookie.isSupported = function isSupported() {
	        return (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && typeof document.cookie === "string";
	    };
	    /**
	     * The method sets the value and returns true if it has been set
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @param value {string}
	     * @param expires {number}
	     * @param path {string}
	     * @param domain {string}
	     * @param secure {boolean}
	     * @return {boolean}
	     */
	
	
	    Cookie.setItem = function setItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	        var value = arguments[2];
	        var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	        var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
	        var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
	        var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key) && typeof value === "string" && (value === "" || Cookie.regValidKey.test(value)) && typeof expires === "number" && expires < 365 && typeof path === "string" && typeof domain === "string" && domain.indexOf(location.hostname) !== -1 && typeof secure === "boolean" && secure === (location.protocol === "https:")) {
	                /**
	                 * Validate input data
	                 */
	                var u = URL.parse("http://" + domain + path);
	                if (u.hostname === domain || u.path === path) {
	                    /**
	                     * If that store is supported
	                     */
	                    if (!checkSupport || Cookie.isSupported()) {
	                        /**
	                         * Save cookies for 30 days
	                         * @type {Date}
	                         */
	                        var date = new Date();
	                        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
	                        var exp = date.toUTCString();
	                        /**
	                         * Encode value for store
	                         * @type {string}
	                         */
	                        value = encodeURIComponent(value);
	                        /**
	                         * Writing value to the document cookie storage
	                         * @type {string}
	                         */
	                        document.cookie = key + "=" + value + (exp ? "; expires=" + exp : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	                        /**
	                         * If all ok return true
	                         */
	                        return this.getItem(checkSupport, key) === decodeURIComponent(value);
	                    } else {
	                        /**
	                         * If cookie does not supported return false
	                         */
	                        return false;
	                    }
	                } else {
	                    /**
	                     * If input data is not valid
	                     */
	                    return false;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	    /**
	     * The method reads the value and returns it or returns false if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {string|boolean}
	     */
	
	
	    Cookie.getItem = function getItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key)) {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    /**
	                     * Get the array from document cookie split by ;
	                     * @type {string[]}
	                     */
	                    var arrCookie = document.cookie.split(";");
	                    /**
	                     * Iterate through the cookies
	                     */
	                    for (var _iterator = arrCookie, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                        var _ref;
	
	                        if (_isArray) {
	                            if (_i >= _iterator.length) break;
	                            _ref = _iterator[_i++];
	                        } else {
	                            _i = _iterator.next();
	                            if (_i.done) break;
	                            _ref = _i.value;
	                        }
	
	                        var i = _ref;
	
	                        /**
	                         * Trim and split each cookie by = for key value pare
	                         * @type {string[]}
	                         */
	                        var v = i.trim().split("=", 2);
	                        /**
	                         * If it is correct cookie key return the value
	                         */
	                        if (v[0] === key) {
	                            /**
	                             * If the value was found return the value
	                             */
	                            return decodeURIComponent(v[1]);
	                        }
	                    }
	                    /**
	                     * If the value was not found return false
	                     */
	                    return false;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return false;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	    /**
	     * The method removes the value and return true if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {boolean}
	     */
	
	
	    Cookie.removeItem = function removeItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key)) {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    /**
	                     * Set empty overdue value by key
	                     */
	                    Cookie.setItem(checkSupport, key, "", -1 * 24 * 60 * 60);
	                    /**
	                     * If all ok return true
	                     */
	                    return Cookie.getItem(checkSupport, key) === false;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return false;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	    /**
	     * The method returns the array of string of available keys
	     * @param checkSupport {boolean}
	     * @returns {string[]}
	     */
	
	
	    Cookie.getKeys = function getKeys() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    /**
	                     * The array of available keys
	                     * @type {Array}
	                     */
	                    var arrKeys = [];
	                    /**
	                     * Get the array from document cookie split by ;
	                     * @type {string[]}
	                     */
	                    var arrCookie = document.cookie.split(";");
	                    /**
	                     * Iterate through the cookies
	                     */
	                    for (var _iterator2 = arrCookie, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                        var _ref2;
	
	                        if (_isArray2) {
	                            if (_i2 >= _iterator2.length) break;
	                            _ref2 = _iterator2[_i2++];
	                        } else {
	                            _i2 = _iterator2.next();
	                            if (_i2.done) break;
	                            _ref2 = _i2.value;
	                        }
	
	                        var i = _ref2;
	
	                        /**
	                         * Trim and split each cookie by = for key value pare
	                         * @type {string[]}
	                         */
	                        var v = i.trim().split("=", 2);
	                        /**
	                         * Add key to the list
	                         */
	                        if (v[0]) {
	                            arrKeys.push(v[0]);
	                        }
	                    }
	                    return arrKeys;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return [];
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return [];
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return [];
	        }
	    };
	    /**
	     * The method cleans the storage and return true if it is empty
	     * @param checkSupport {boolean}
	     * @returns {boolean}
	     */
	
	
	    Cookie.clear = function clear() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    var arrKeys = Cookie.getKeys(checkSupport);
	                    if (arrKeys) {
	                        for (var _iterator3 = arrKeys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	                            var _ref3;
	
	                            if (_isArray3) {
	                                if (_i3 >= _iterator3.length) break;
	                                _ref3 = _iterator3[_i3++];
	                            } else {
	                                _i3 = _iterator3.next();
	                                if (_i3.done) break;
	                                _ref3 = _i3.value;
	                            }
	
	                            var i = _ref3;
	
	                            Cookie.removeItem(checkSupport, i);
	                        }
	                    }
	                    /**
	                     * If all ok return true
	                     */
	                    return Cookie.getKeys(checkSupport).length === 0;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return true;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	
	    return Cookie;
	}();
	
	exports.default = Cookie;
	
	Cookie.regValidKey = new RegExp("([a-zA-Z0-9_-]{1,})", "i");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(13);
	var util = __webpack_require__(15);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(16);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module), (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(17);
	exports.encode = exports.stringify = __webpack_require__(18);


/***/ },
/* 17 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _UtilsWindow = __webpack_require__(20);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class for working with document
	 */
	var Document = function () {
	    function Document() {
	        _classCallCheck(this, Document);
	    }
	
	    /**
	     * Get document height
	     * @returns {number}
	     */
	    Document.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return Math.max(objWindow.document.body.scrollHeight, objWindow.document.documentElement.scrollHeight, objWindow.document.body.offsetHeight, objWindow.document.documentElement.offsetHeight, objWindow.document.body.clientHeight, objWindow.document.documentElement.clientHeight);
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document width
	     * @returns {number}
	     */
	
	
	    Document.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return Math.max(objWindow.document.body.scrollWidth, objWindow.document.documentElement.scrollWidth, objWindow.document.body.offsetWidth, objWindow.document.documentElement.offsetWidth, objWindow.document.body.clientWidth, objWindow.document.documentElement.clientWidth);
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document top scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollTop = function getScrollTop() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return objWindow.pageYOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollTop || objWindow.document.body && objWindow.document.body.scrollTop;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document left scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollLeft = function getScrollLeft() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return objWindow.pageXOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollLeft || objWindow.document.body && objWindow.document.body.scrollLeft;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document scrolls
	     * @param objWindow
	     * @return {{left: number, top: number}}
	     */
	
	
	    Document.getScroll = function getScroll() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return {
	                left: Document.getScrollLeft(objWindow),
	                top: Document.getScrollTop(objWindow)
	            };
	        } else {
	            return {
	                left: NaN,
	                top: NaN
	            };
	        }
	    };
	
	    return Document;
	}();
	
	exports.default = Document;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with window
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Window = function () {
	    function Window() {
	        _classCallCheck(this, Window);
	    }
	
	    /**
	     * Check if it is window
	     * @param objWindow
	     * @return {boolean}
	     */
	    Window.isWindow = function isWindow(objWindow) {
	        return objWindow && (typeof objWindow === "undefined" ? "undefined" : _typeof(objWindow)) === "object" && objWindow.document && _typeof(objWindow.document) === "object";
	    };
	    /**
	     * Get window height
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Window.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (Window.isWindow(objWindow)) {
	            return objWindow.innerHeight || objWindow.document.documentElement.clientHeight || objWindow.document.body.clientHeight;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get window width
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Window.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (Window.isWindow(objWindow)) {
	            return objWindow.innerWidth || objWindow.document.documentElement.clientWidth || objWindow.document.body.clientWidth;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get window sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Window.getSizes = function getSizes() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return {
	            height: Window.getHeight(objWindow),
	            width: Window.getWidth(objWindow)
	        };
	    };
	
	    return Window;
	}();
	
	exports.default = Window;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _Utils = __webpack_require__(7);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class for working with DOM
	 */
	var DOM = function () {
	    function DOM() {
	        _classCallCheck(this, DOM);
	    }
	
	    /**
	     * Check if variable is dom document
	     * @param domDocument
	     * @return {boolean}
	     */
	    DOM.isDOMDocument = function isDOMDocument(domDocument) {
	        return !(!domDocument || typeof domDocument === "boolean" || typeof domDocument === "number" || typeof domDocument === "string" || domDocument.nodeType !== 9);
	    };
	    /**
	     * Find and validate Node in DOM Document
	     * @param domNode
	     * @param domDocument
	     * @return {Element | boolean}
	     */
	
	
	    DOM.getDOMNode = function getDOMNode(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	
	        /**
	         * Check if domDocument is a valid variable
	         */
	        if (!DOM.isDOMDocument(domDocument)) {
	            return false;
	        }
	        /**
	         * Check if domNode is a valid variable
	         */
	        if (!domNode || typeof domNode === "boolean" || typeof domNode === "number" || typeof domNode === "undefined") {
	            return false;
	        }
	        /**
	         * If domNode is a string it might be an ID
	         */
	        if (typeof domNode === "string") {
	            domNode = domDocument.getElementById(domNode);
	        }
	        /**
	         * Check if domNode is a valid variable
	         */
	        if (!domNode || domNode.nodeType !== 1 || !domNode.parentNode || domNode.parentNode.nodeName === "HTML" || domDocument.contains && !domDocument.contains(domNode)) {
	            return false;
	        }
	        return domNode;
	    };
	    /**
	     * Get element sizes and position
	     * @param domNode
	     * @param domDocument
	     * @param showForce
	     * @return {{bottom: number, height: number, left: number, right: number, top: number, width: number}}
	     */
	
	
	    DOM.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        /**
	         * Create result size and position object
	         */
	        var objRet = {
	            bottom: 0,
	            height: 0,
	            left: 0,
	            right: 0,
	            top: 0,
	            width: 0
	        };
	        domNode = DOM.getDOMNode(domNode, domDocument);
	        if (!domNode) {
	            _Utils2.default.warn("Utils.DOM.getBoundingClientRect: DOM element doesn't exist in that DOM Document");
	            return objRet;
	        }
	        showForce = !!showForce;
	        var styles = void 0;
	        if (showForce) {
	            styles = getComputedStyle(domNode);
	            if (styles && styles.display === "none") {
	                domNode.style.display = "block";
	            }
	        }
	        /**
	         * If default method is supported than use it
	         */
	        if (domNode.getBoundingClientRect) {
	            objRet = domNode.getBoundingClientRect();
	            /**
	             * IE hack
	             */
	            objRet = {
	                bottom: objRet.bottom,
	                height: objRet.height || domNode.clientHeight,
	                left: objRet.left,
	                right: objRet.right,
	                top: objRet.top,
	                width: objRet.width || domNode.clientWidth
	            };
	        } else {
	            /**
	             * Write the element in a temporary variable
	             */
	            var domElement = domNode;
	            /**
	             * Calculated basic parameters of the element
	             * @type {Object}
	             */
	            var objCoordinates = {
	                height: domElement.offsetHeight,
	                width: domElement.offsetWidth,
	                x: 0,
	                y: 0
	            };
	            /**
	             * Are passed on to all parents and take into account their offsets
	             */
	            while (domElement) {
	                objCoordinates.x += domElement.offsetLeft;
	                objCoordinates.y += domElement.offsetTop;
	                domElement = domElement.offsetParent;
	            }
	            /**
	             *
	             * @type {Object}
	             */
	            objRet = {
	                bottom: objCoordinates.y + objCoordinates.height,
	                height: objCoordinates.height,
	                left: objCoordinates.x,
	                right: objCoordinates.x + objCoordinates.width,
	                top: objCoordinates.y,
	                width: objCoordinates.width
	            };
	        }
	        if (showForce && domNode) {
	            domNode.style.display = "";
	        }
	        /**
	         * Return size and position of the element
	         */
	        return objRet;
	    };
	
	    /**
	     * Find element position
	     * @param domNode
	     * @param domDocument
	     * @param showForce
	     * @return {{top: number, left: number}}
	     */
	    DOM.findElementPosition = function findElementPosition(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        var objRet = {
	            left: 0,
	            top: 0
	        };
	        domNode = DOM.getDOMNode(domNode, domDocument);
	        if (!domNode) {
	            _Utils2.default.warn("Utils.DOM.findElementPosition: DOM element doesn't exist in that DOM Document");
	            return objRet;
	        }
	        showForce = !!showForce;
	        while (domNode) {
	            var styles = void 0;
	            if (showForce) {
	                styles = window.getComputedStyle(domNode);
	                if (styles && styles.display === "none") {
	                    domNode.style.display = "block";
	                }
	            }
	            objRet.left += domNode.offsetLeft;
	            objRet.top += domNode.offsetTop;
	            domNode = domNode.offsetParent;
	            if (showForce && domNode) {
	                domNode.style.display = "";
	            }
	        }
	        return objRet;
	    };
	    /**
	     * Add event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.addEvent = function addEvent(obj, name, func) {
	        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && typeof name === "string" && typeof func === "function") {
	            if (obj.addEventListener) {
	                obj.addEventListener(name, func, false);
	            } else if (obj.attachEvent) {
	                obj.attachEvent("on" + name, func);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Remove event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.removeEvent = function removeEvent(obj, name, func) {
	        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && typeof name === "string" && typeof func === "function") {
	            if (obj.removeEventListener) {
	                obj.removeEventListener(name, func, false);
	            } else if (obj.detachEvent) {
	                obj.detachEvent("on" + name, func);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Check if element has class name
	     * @param element
	     * @param className
	     * @return {boolean}
	     */
	
	
	    DOM.hasClassName = function hasClassName(element, className) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1) {
	            className = className.trim();
	            return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Add class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.addClassName = function addClassName(element, className) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1) {
	            className = className.trim();
	            if (!DOM.hasClassName(element, className)) {
	                var cl = element.className;
	                element.className = cl ? cl + " " + className : className;
	            }
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Remove class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.removeClassName = function removeClassName(element, className) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1 && typeof element.className === "string") {
	            className = className.trim();
	            var classes = element.className.trim().split(" ");
	            for (var i = classes.length - 1; i >= 0; i--) {
	                classes[i] = classes[i].trim();
	                if (!classes[i] || classes[i] === className) {
	                    classes.splice(i, 1);
	                }
	            }
	            element.className = classes.join(" ");
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Toggle class name
	     * @param element
	     * @param className
	     * @param toggle
	     * @return {HTMLElement}
	     */
	
	
	    DOM.toggleClassName = function toggleClassName(element, className, toggle) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && typeof toggle === "boolean" && element.nodeType === 1) {
	            className = className.trim();
	            if (toggle) {
	                DOM.addClassName(element, className);
	            } else {
	                DOM.removeClassName(element, className);
	            }
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Replace class name
	     * @param element
	     * @param oldClassName
	     * @param newClassName
	     * @return {HTMLElement}
	     */
	
	
	    DOM.replaceClass = function replaceClass(element, oldClassName, newClassName) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof oldClassName === "string" && typeof newClassName === "string" && element.nodeType === 1) {
	            oldClassName = oldClassName.trim();
	            newClassName = newClassName.trim();
	            DOM.removeClassName(element, oldClassName);
	            DOM.addClassName(element, newClassName);
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Get element by tag name and index
	     * @param tn
	     * @param domDocument
	     * @param index
	     * @return {Node}
	     */
	
	
	    DOM.getElementByTagName = function getElementByTagName(tn) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var index = arguments[2];
	
	        if (typeof tn === "string" && DOM.isDOMDocument(domDocument) && typeof index === "number") {
	            var els = domDocument.getElementsByTagName(tn);
	            return els[index] || null;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Get line height
	     * @return {number}
	     */
	
	
	    DOM.getLineHeight = function getLineHeight() {
	        var styles = getComputedStyle(document.body);
	        var lineHeight = styles.lineHeight;
	        var lineHeightDig = parseInt(lineHeight, 10);
	        var fontSize = styles.fontSize;
	        var fontSizeDig = parseInt(fontSize, 10);
	        if (isFinite(lineHeightDig)) {
	            return lineHeightDig;
	        } else {
	            return fontSizeDig;
	        }
	    };
	
	    return DOM;
	}();
	
	exports.default = DOM;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import additional classes
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _UtilsDOM = __webpack_require__(21);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsWindow = __webpack_require__(20);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mouse = function () {
	    function Mouse() {
	        _classCallCheck(this, Mouse);
	    }
	
	    /**
	     * Normalise mouse delta
	     * @param e
	     * @return {number}
	     */
	    Mouse.getWheelDelta = function getWheelDelta(e) {
	        if (e && (typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" && ("detail" in e || "wheelDelta" in e || "wheelDeltaY" in e || "wheelDeltaX" in e || "deltaY" in e || "deltaX" in e || "axis" in e || "deltaMode" in e)) {
	            var delta = void 0;
	            var deltaX = void 0;
	            var deltaY = void 0;
	            // Old school scrollwheel delta
	            if ("detail" in e) {
	                deltaY = e.detail * -1;
	            }
	            if ("wheelDelta" in e) {
	                deltaY = e.wheelDelta;
	            }
	            if ("wheelDeltaY" in e) {
	                deltaY = e.wheelDeltaY;
	            }
	            if ("wheelDeltaX" in e) {
	                deltaX = e.wheelDeltaX * -1;
	            }
	            // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	            if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
	                deltaX = deltaY * -1;
	                deltaY = 0;
	            }
	            // New school wheel delta (wheel event)
	            if ("deltaY" in e) {
	                deltaY = e.deltaY * -1;
	            }
	            if ("deltaX" in e) {
	                deltaX = e.deltaX;
	            }
	            // Need to convert lines and pages to pixels if we aren"t already in pixels
	            // There are three delta modes:
	            //   * deltaMode 0 is by pixels, nothing to do
	            //   * deltaMode 1 is by lines
	            //   * deltaMode 2 is by pages
	            if (e.deltaMode === 1) {
	                var lineHeight = _UtilsDOM2.default.getLineHeight();
	                deltaY = deltaY * lineHeight;
	                deltaX = deltaX * lineHeight;
	            } else if (e.deltaMode === 2) {
	                var windowhegiht = _UtilsWindow2.default.getHeight();
	                deltaY = deltaY * windowhegiht;
	                deltaX = deltaX * windowhegiht;
	            }
	            delta = deltaY === 0 ? deltaX : deltaY;
	            return delta;
	        } else {
	            return NaN;
	        }
	    };
	
	    return Mouse;
	}();
	
	exports.default = Mouse;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with screen
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Screen = function () {
	    function Screen() {
	        _classCallCheck(this, Screen);
	    }
	
	    /**
	     * Get screen info
	     * @return {{availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}}
	     */
	    Screen.getInfo = function getInfo() {
	        return {
	            availableSize: Screen.getAvailableSizes(),
	            colorDepth: Screen.getColorDepth(),
	            pixelRatio: Screen.getPixelRatio(),
	            size: Screen.getSizes()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getHeight = function getHeight() {
	        return screen.height;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getWidth = function getWidth() {
	        return screen.width;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getSizes = function getSizes() {
	        return {
	            height: Screen.getHeight(),
	            width: Screen.getWidth()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableHeight = function getAvailableHeight() {
	        return screen.availHeight;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableWidth = function getAvailableWidth() {
	        return screen.availWidth;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getAvailableSizes = function getAvailableSizes() {
	        return {
	            height: Screen.getAvailableHeight(),
	            width: Screen.getAvailableWidth()
	        };
	    };
	    /**
	     * Get screen pixel ratio
	     * @return {number}
	     */
	
	
	    Screen.getPixelRatio = function getPixelRatio() {
	        var ratio = 1;
	        if (typeof window.screen.systemXDPI !== "undefined" && typeof window.screen.logicalXDPI !== "undefined" && window.screen.systemXDPI > window.screen.logicalXDPI) {
	            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
	        } else if (typeof window.devicePixelRatio !== "undefined") {
	            ratio = window.devicePixelRatio;
	        }
	        return ratio;
	    };
	    /**
	     * Get screen color depth
	     * @return {number}
	     */
	
	
	    Screen.getColorDepth = function getColorDepth() {
	        return screen.colorDepth;
	    };
	
	    return Screen;
	}();
	
	exports.default = Screen;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with system
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var System = function () {
	    function System() {
	        _classCallCheck(this, System);
	    }
	
	    /**
	     * Get system info
	     * @return {{name: string, version: string}}
	     */
	    System.getInfo = function getInfo() {
	        return {
	            name: System.getName(),
	            version: System.getVersion()
	        };
	    };
	    /**
	     * Get OS name
	     * @return {string}
	     */
	
	
	    System.getName = function getName() {
	        var os = "";
	        var clientStrings = [{
	            r: /(Windows 10.0|Windows NT 10.0)/,
	            s: "Windows 10"
	        }, {
	            r: /(Windows 8.1|Windows NT 6.3)/,
	            s: "Windows 8.1"
	        }, {
	            r: /(Windows 8|Windows NT 6.2)/,
	            s: "Windows 8"
	        }, {
	            r: /(Windows 7|Windows NT 6.1)/,
	            s: "Windows 7"
	        }, {
	            r: /Windows NT 6.0/,
	            s: "Windows Vista"
	        }, {
	            r: /Windows NT 5.2/,
	            s: "Windows Server 2003"
	        }, {
	            r: /(Windows NT 5.1|Windows XP)/,
	            s: "Windows XP"
	        }, {
	            r: /(Windows NT 5.0|Windows 2000)/,
	            s: "Windows 2000"
	        }, {
	            r: /(Win 9x 4.90|Windows ME)/,
	            s: "Windows ME"
	        }, {
	            r: /(Windows 98|Win98)/,
	            s: "Windows 98"
	        }, {
	            r: /(Windows 95|Win95|Windows_95)/,
	            s: "Windows 95"
	        }, {
	            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
	            s: "Windows NT 4.0"
	        }, {
	            r: /Windows CE/,
	            s: "Windows CE"
	        }, {
	            r: /Win16/,
	            s: "Windows 3.11"
	        }, {
	            r: /Android/,
	            s: "Android"
	        }, {
	            r: /OpenBSD/,
	            s: "Open BSD"
	        }, {
	            r: /SunOS/,
	            s: "Sun OS"
	        }, {
	            r: /(Linux|X11)/,
	            s: "Linux"
	        }, {
	            r: /(iPhone|iPad|iPod)/,
	            s: "iOS"
	        }, {
	            r: /Mac OS X/,
	            s: "Mac OS X"
	        }, {
	            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
	            s: "Mac OS"
	        }, {
	            r: /QNX/,
	            s: "QNX"
	        }, {
	            r: /UNIX/,
	            s: "UNIX"
	        }, {
	            r: /BeOS/,
	            s: "BeOS"
	        }, {
	            r: /OS\/2/,
	            s: "OS/2"
	        }, {
	            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
	            s: "Search Bot"
	        }];
	        for (var _iterator = clientStrings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var cs = _ref;
	
	            if (cs.r.test(navigator.userAgent)) {
	                os = cs.s;
	                break;
	            }
	        }
	        return os;
	    };
	    /**
	     * Get OS version
	     * @return {string}
	     */
	
	
	    System.getVersion = function getVersion() {
	        var os = System.getName();
	        var osVersion = "";
	        if (/Windows/.test(os)) {
	            osVersion = /Windows (.*)/.exec(os)[1];
	            os = "Windows";
	        }
	        switch (os) {
	            case "Mac OS X":
	                osVersion = /Mac OS X (10[._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "Android":
	                osVersion = /Android ([._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "iOS":
	                var reg = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
	                osVersion = reg[1] + "." + reg[2] + "." + (reg[3] || 0);
	                break;
	            default:
	        }
	        return osVersion;
	    };
	
	    return System;
	}();
	
	exports.default = System;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Class for working with user
	 */
	
	exports.__esModule = true;
	
	var _UtilsBrowser = __webpack_require__(10);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsScreen = __webpack_require__(23);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(24);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var User = function () {
	    function User() {
	        _classCallCheck(this, User);
	    }
	
	    /**
	     * Get user info
	     * @return {{browser: {browser: string, mobile: boolean, version: string}, screen: {availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}, system: {name: string, version: string}}}
	     */
	    User.getInfo = function getInfo() {
	        return {
	            browser: _UtilsBrowser2.default.getInfo(),
	            screen: _UtilsScreen2.default.getInfo(),
	            system: _UtilsSystem2.default.getInfo()
	        };
	    };
	
	    return User;
	}();
	
	exports.default = User;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Enforces a single instance of the Raven client, and the
	 * main entry point for Raven. If you are a consumer of the
	 * Raven library, you SHOULD load this file (vs raven.js).
	 **/
	
	'use strict';
	
	var RavenConstructor = __webpack_require__(27);
	
	// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
	var _window = typeof window !== 'undefined' ? window
	            : typeof global !== 'undefined' ? global
	            : typeof self !== 'undefined' ? self
	            : {};
	var _Raven = _window.Raven;
	
	var Raven = new RavenConstructor();
	
	/*
	 * Allow multiple versions of Raven to be installed.
	 * Strip Raven from the global context and returns the instance.
	 *
	 * @return {Raven}
	 */
	Raven.noConflict = function () {
		_window.Raven = _Raven;
		return Raven;
	};
	
	Raven.afterLoad();
	
	module.exports = Raven;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global XDomainRequest:false, __DEV__:false*/
	'use strict';
	
	var TraceKit = __webpack_require__(28);
	var RavenConfigError = __webpack_require__(29);
	var stringify = __webpack_require__(30);
	
	var wrapConsoleMethod = __webpack_require__(31).wrapMethod;
	
	var dsnKeys = 'source protocol user pass host port path'.split(' '),
	    dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
	
	function now() {
	    return +new Date();
	}
	
	// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
	var _window = typeof window !== 'undefined' ? window
	            : typeof global !== 'undefined' ? global
	            : typeof self !== 'undefined' ? self
	            : {};
	var _document = _window.document;
	
	// First, check for JSON support
	// If there is no JSON, we no-op the core features of Raven
	// since JSON is required to encode the payload
	function Raven() {
	    this._hasJSON = !!(typeof JSON === 'object' && JSON.stringify);
	    // Raven can run in contexts where there's no document (react-native)
	    this._hasDocument = !isUndefined(_document);
	    this._lastCapturedException = null;
	    this._lastEventId = null;
	    this._globalServer = null;
	    this._globalKey = null;
	    this._globalProject = null;
	    this._globalContext = {};
	    this._globalOptions = {
	        logger: 'javascript',
	        ignoreErrors: [],
	        ignoreUrls: [],
	        whitelistUrls: [],
	        includePaths: [],
	        crossOrigin: 'anonymous',
	        collectWindowErrors: true,
	        maxMessageLength: 0,
	        stackTraceLimit: 50,
	        autoBreadcrumbs: true
	    };
	    this._ignoreOnError = 0;
	    this._isRavenInstalled = false;
	    this._originalErrorStackTraceLimit = Error.stackTraceLimit;
	    // capture references to window.console *and* all its methods first
	    // before the console plugin has a chance to monkey patch
	    this._originalConsole = _window.console || {};
	    this._originalConsoleMethods = {};
	    this._plugins = [];
	    this._startTime = now();
	    this._wrappedBuiltIns = [];
	    this._breadcrumbs = [];
	    this._lastCapturedEvent = null;
	    this._keypressTimeout;
	    this._location = _window.location;
	    this._lastHref = this._location && this._location.href;
	
	    for (var method in this._originalConsole) {  // eslint-disable-line guard-for-in
	      this._originalConsoleMethods[method] = this._originalConsole[method];
	    }
	}
	
	/*
	 * The core Raven singleton
	 *
	 * @this {Raven}
	 */
	
	Raven.prototype = {
	    // Hardcode version string so that raven source can be loaded directly via
	    // webpack (using a build step causes webpack #1617). Grunt verifies that
	    // this value matches package.json during build.
	    //   See: https://github.com/getsentry/raven-js/issues/465
	    VERSION: '3.9.1',
	
	    debug: false,
	
	    TraceKit: TraceKit, // alias to TraceKit
	
	    /*
	     * Configure Raven with a DSN and extra options
	     *
	     * @param {string} dsn The public Sentry DSN
	     * @param {object} options Optional set of of global options [optional]
	     * @return {Raven}
	     */
	    config: function(dsn, options) {
	        var self = this;
	
	        if (self._globalServer) {
	                this._logDebug('error', 'Error: Raven has already been configured');
	            return self;
	        }
	        if (!dsn) return self;
	
	        var globalOptions = self._globalOptions;
	
	        // merge in options
	        if (options) {
	            each(options, function(key, value){
	                // tags and extra are special and need to be put into context
	                if (key === 'tags' || key === 'extra' || key === 'user') {
	                    self._globalContext[key] = value;
	                } else {
	                    globalOptions[key] = value;
	                }
	            });
	        }
	
	        self.setDSN(dsn);
	
	        // "Script error." is hard coded into browsers for errors that it can't read.
	        // this is the result of a script being pulled in from an external domain and CORS.
	        globalOptions.ignoreErrors.push(/^Script error\.?$/);
	        globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);
	
	        // join regexp rules into one big rule
	        globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
	        globalOptions.ignoreUrls = globalOptions.ignoreUrls.length ? joinRegExp(globalOptions.ignoreUrls) : false;
	        globalOptions.whitelistUrls = globalOptions.whitelistUrls.length ? joinRegExp(globalOptions.whitelistUrls) : false;
	        globalOptions.includePaths = joinRegExp(globalOptions.includePaths);
	        globalOptions.maxBreadcrumbs = Math.max(0, Math.min(globalOptions.maxBreadcrumbs || 100, 100)); // default and hard limit is 100
	
	        var autoBreadcrumbDefaults = {
	            xhr: true,
	            console: true,
	            dom: true,
	            location: true
	        };
	
	        var autoBreadcrumbs = globalOptions.autoBreadcrumbs;
	        if ({}.toString.call(autoBreadcrumbs) === '[object Object]') {
	            autoBreadcrumbs = objectMerge(autoBreadcrumbDefaults, autoBreadcrumbs);
	        } else if (autoBreadcrumbs !== false) {
	            autoBreadcrumbs = autoBreadcrumbDefaults;
	        }
	        globalOptions.autoBreadcrumbs = autoBreadcrumbs;
	
	        TraceKit.collectWindowErrors = !!globalOptions.collectWindowErrors;
	
	        // return for chaining
	        return self;
	    },
	
	    /*
	     * Installs a global window.onerror error handler
	     * to capture and report uncaught exceptions.
	     * At this point, install() is required to be called due
	     * to the way TraceKit is set up.
	     *
	     * @return {Raven}
	     */
	    install: function() {
	        var self = this;
	        if (self.isSetup() && !self._isRavenInstalled) {
	            TraceKit.report.subscribe(function () {
	                self._handleOnErrorStackInfo.apply(self, arguments);
	            });
	            self._instrumentTryCatch();
	            if (self._globalOptions.autoBreadcrumbs)
	                self._instrumentBreadcrumbs();
	
	            // Install all of the plugins
	            self._drainPlugins();
	
	            self._isRavenInstalled = true;
	        }
	
	        Error.stackTraceLimit = self._globalOptions.stackTraceLimit;
	        return this;
	    },
	
	    /*
	     * Set the DSN (can be called multiple time unlike config)
	     *
	     * @param {string} dsn The public Sentry DSN
	     */
	    setDSN: function(dsn) {
	        var self = this,
	            uri = self._parseDSN(dsn),
	          lastSlash = uri.path.lastIndexOf('/'),
	          path = uri.path.substr(1, lastSlash);
	
	        self._dsn = dsn;
	        self._globalKey = uri.user;
	        self._globalSecret = uri.pass && uri.pass.substr(1);
	        self._globalProject = uri.path.substr(lastSlash + 1);
	
	        self._globalServer = self._getGlobalServer(uri);
	
	        self._globalEndpoint = self._globalServer +
	            '/' + path + 'api/' + self._globalProject + '/store/';
	    },
	
	    /*
	     * Wrap code within a context so Raven can capture errors
	     * reliably across domains that is executed immediately.
	     *
	     * @param {object} options A specific set of options for this context [optional]
	     * @param {function} func The callback to be immediately executed within the context
	     * @param {array} args An array of arguments to be called with the callback [optional]
	     */
	    context: function(options, func, args) {
	        if (isFunction(options)) {
	            args = func || [];
	            func = options;
	            options = undefined;
	        }
	
	        return this.wrap(options, func).apply(this, args);
	    },
	
	    /*
	     * Wrap code within a context and returns back a new function to be executed
	     *
	     * @param {object} options A specific set of options for this context [optional]
	     * @param {function} func The function to be wrapped in a new context
	     * @param {function} func A function to call before the try/catch wrapper [optional, private]
	     * @return {function} The newly wrapped functions with a context
	     */
	    wrap: function(options, func, _before) {
	        var self = this;
	        // 1 argument has been passed, and it's not a function
	        // so just return it
	        if (isUndefined(func) && !isFunction(options)) {
	            return options;
	        }
	
	        // options is optional
	        if (isFunction(options)) {
	            func = options;
	            options = undefined;
	        }
	
	        // At this point, we've passed along 2 arguments, and the second one
	        // is not a function either, so we'll just return the second argument.
	        if (!isFunction(func)) {
	            return func;
	        }
	
	        // We don't wanna wrap it twice!
	        try {
	            if (func.__raven__) {
	                return func;
	            }
	
	            // If this has already been wrapped in the past, return that
	            if (func.__raven_wrapper__ ){
	                return func.__raven_wrapper__ ;
	            }
	        } catch (e) {
	            // Just accessing custom props in some Selenium environments
	            // can cause a "Permission denied" exception (see raven-js#495).
	            // Bail on wrapping and return the function as-is (defers to window.onerror).
	            return func;
	        }
	
	        function wrapped() {
	            var args = [], i = arguments.length,
	                deep = !options || options && options.deep !== false;
	
	            if (_before && isFunction(_before)) {
	                _before.apply(this, arguments);
	            }
	
	            // Recursively wrap all of a function's arguments that are
	            // functions themselves.
	            while(i--) args[i] = deep ? self.wrap(options, arguments[i]) : arguments[i];
	
	            try {
	                return func.apply(this, args);
	            } catch(e) {
	                self._ignoreNextOnError();
	                self.captureException(e, options);
	                throw e;
	            }
	        }
	
	        // copy over properties of the old function
	        for (var property in func) {
	            if (hasKey(func, property)) {
	                wrapped[property] = func[property];
	            }
	        }
	        wrapped.prototype = func.prototype;
	
	        func.__raven_wrapper__ = wrapped;
	        // Signal that this function has been wrapped already
	        // for both debugging and to prevent it to being wrapped twice
	        wrapped.__raven__ = true;
	        wrapped.__inner__ = func;
	
	        return wrapped;
	    },
	
	    /*
	     * Uninstalls the global error handler.
	     *
	     * @return {Raven}
	     */
	    uninstall: function() {
	        TraceKit.report.uninstall();
	
	        this._restoreBuiltIns();
	
	        Error.stackTraceLimit = this._originalErrorStackTraceLimit;
	        this._isRavenInstalled = false;
	
	        return this;
	    },
	
	    /*
	     * Manually capture an exception and send it over to Sentry
	     *
	     * @param {error} ex An exception to be logged
	     * @param {object} options A specific set of options for this error [optional]
	     * @return {Raven}
	     */
	    captureException: function(ex, options) {
	        // If not an Error is passed through, recall as a message instead
	        if (!isError(ex)) {
	            return this.captureMessage(ex, objectMerge({
	                trimHeadFrames: 1,
	                stacktrace: true // if we fall back to captureMessage, default to attempting a new trace
	            }, options));
	        }
	
	        // Store the raw exception object for potential debugging and introspection
	        this._lastCapturedException = ex;
	
	        // TraceKit.report will re-raise any exception passed to it,
	        // which means you have to wrap it in try/catch. Instead, we
	        // can wrap it here and only re-raise if TraceKit.report
	        // raises an exception different from the one we asked to
	        // report on.
	        try {
	            var stack = TraceKit.computeStackTrace(ex);
	            this._handleStackInfo(stack, options);
	        } catch(ex1) {
	            if(ex !== ex1) {
	                throw ex1;
	            }
	        }
	
	        return this;
	    },
	
	    /*
	     * Manually send a message to Sentry
	     *
	     * @param {string} msg A plain message to be captured in Sentry
	     * @param {object} options A specific set of options for this message [optional]
	     * @return {Raven}
	     */
	    captureMessage: function(msg, options) {
	        // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
	        // early call; we'll error on the side of logging anything called before configuration since it's
	        // probably something you should see:
	        if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(msg)) {
	            return;
	        }
	
	        options = options || {};
	
	        var data = objectMerge({
	            message: msg + ''  // Make sure it's actually a string
	        }, options);
	
	        if (this._globalOptions.stacktrace || (options && options.stacktrace)) {
	            var ex;
	            // create a stack trace from this point; just trim
	            // off extra frames so they don't include this function call (or
	            // earlier Raven.js library fn calls)
	            try {
	                throw new Error(msg);
	            } catch (ex1) {
	                ex = ex1;
	            }
	
	            // null exception name so `Error` isn't prefixed to msg
	            ex.name = null;
	
	            options = objectMerge({
	                // fingerprint on msg, not stack trace (legacy behavior, could be
	                // revisited)
	                fingerprint: msg,
	                trimHeadFrames: (options.trimHeadFrames || 0) + 1
	            }, options);
	
	            var stack = TraceKit.computeStackTrace(ex);
	            var frames = this._prepareFrames(stack, options);
	            data.stacktrace = {
	                // Sentry expects frames oldest to newest
	                frames: frames.reverse()
	            }
	        }
	
	        // Fire away!
	        this._send(data);
	
	        return this;
	    },
	
	    captureBreadcrumb: function (obj) {
	        var crumb = objectMerge({
	            timestamp: now() / 1000
	        }, obj);
	
	        if (isFunction(this._globalOptions.breadcrumbCallback)) {
	            var result = this._globalOptions.breadcrumbCallback(crumb);
	
	            if (isObject(result) && !isEmptyObject(result)) {
	                crumb = result;
	            } else if (result === false) {
	                return this;
	            }
	        }
	
	        this._breadcrumbs.push(crumb);
	        if (this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs) {
	            this._breadcrumbs.shift();
	        }
	        return this;
	    },
	
	    addPlugin: function(plugin /*arg1, arg2, ... argN*/) {
	        var pluginArgs = [].slice.call(arguments, 1);
	
	        this._plugins.push([plugin, pluginArgs]);
	        if (this._isRavenInstalled) {
	            this._drainPlugins();
	        }
	
	        return this;
	    },
	
	    /*
	     * Set/clear a user to be sent along with the payload.
	     *
	     * @param {object} user An object representing user data [optional]
	     * @return {Raven}
	     */
	    setUserContext: function(user) {
	        // Intentionally do not merge here since that's an unexpected behavior.
	        this._globalContext.user = user;
	
	        return this;
	    },
	
	    /*
	     * Merge extra attributes to be sent along with the payload.
	     *
	     * @param {object} extra An object representing extra data [optional]
	     * @return {Raven}
	     */
	    setExtraContext: function(extra) {
	        this._mergeContext('extra', extra);
	
	        return this;
	    },
	
	    /*
	     * Merge tags to be sent along with the payload.
	     *
	     * @param {object} tags An object representing tags [optional]
	     * @return {Raven}
	     */
	    setTagsContext: function(tags) {
	        this._mergeContext('tags', tags);
	
	        return this;
	    },
	
	    /*
	     * Clear all of the context.
	     *
	     * @return {Raven}
	     */
	    clearContext: function() {
	        this._globalContext = {};
	
	        return this;
	    },
	
	    /*
	     * Get a copy of the current context. This cannot be mutated.
	     *
	     * @return {object} copy of context
	     */
	    getContext: function() {
	        // lol javascript
	        return JSON.parse(stringify(this._globalContext));
	    },
	
	
	    /*
	     * Set environment of application
	     *
	     * @param {string} environment Typically something like 'production'.
	     * @return {Raven}
	     */
	    setEnvironment: function(environment) {
	        this._globalOptions.environment = environment;
	
	        return this;
	    },
	
	    /*
	     * Set release version of application
	     *
	     * @param {string} release Typically something like a git SHA to identify version
	     * @return {Raven}
	     */
	    setRelease: function(release) {
	        this._globalOptions.release = release;
	
	        return this;
	    },
	
	    /*
	     * Set the dataCallback option
	     *
	     * @param {function} callback The callback to run which allows the
	     *                            data blob to be mutated before sending
	     * @return {Raven}
	     */
	    setDataCallback: function(callback) {
	        var original = this._globalOptions.dataCallback;
	        this._globalOptions.dataCallback = isFunction(callback)
	          ? function (data) { return callback(data, original); }
	          : callback;
	
	        return this;
	    },
	
	    /*
	     * Set the breadcrumbCallback option
	     *
	     * @param {function} callback The callback to run which allows filtering
	     *                            or mutating breadcrumbs
	     * @return {Raven}
	     */
	    setBreadcrumbCallback: function(callback) {
	        var original = this._globalOptions.breadcrumbCallback;
	        this._globalOptions.breadcrumbCallback = isFunction(callback)
	          ? function (data) { return callback(data, original); }
	          : callback;
	
	        return this;
	    },
	
	    /*
	     * Set the shouldSendCallback option
	     *
	     * @param {function} callback The callback to run which allows
	     *                            introspecting the blob before sending
	     * @return {Raven}
	     */
	    setShouldSendCallback: function(callback) {
	        var original = this._globalOptions.shouldSendCallback;
	        this._globalOptions.shouldSendCallback = isFunction(callback)
	            ? function (data) { return callback(data, original); }
	            : callback;
	
	        return this;
	    },
	
	    /**
	     * Override the default HTTP transport mechanism that transmits data
	     * to the Sentry server.
	     *
	     * @param {function} transport Function invoked instead of the default
	     *                             `makeRequest` handler.
	     *
	     * @return {Raven}
	     */
	    setTransport: function(transport) {
	        this._globalOptions.transport = transport;
	
	        return this;
	    },
	
	    /*
	     * Get the latest raw exception that was captured by Raven.
	     *
	     * @return {error}
	     */
	    lastException: function() {
	        return this._lastCapturedException;
	    },
	
	    /*
	     * Get the last event id
	     *
	     * @return {string}
	     */
	    lastEventId: function() {
	        return this._lastEventId;
	    },
	
	    /*
	     * Determine if Raven is setup and ready to go.
	     *
	     * @return {boolean}
	     */
	    isSetup: function() {
	        if (!this._hasJSON) return false;  // needs JSON support
	        if (!this._globalServer) {
	            if (!this.ravenNotConfiguredError) {
	              this.ravenNotConfiguredError = true;
	              this._logDebug('error', 'Error: Raven has not been configured.');
	            }
	            return false;
	        }
	        return true;
	    },
	
	    afterLoad: function () {
	        // TODO: remove window dependence?
	
	        // Attempt to initialize Raven on load
	        var RavenConfig = _window.RavenConfig;
	        if (RavenConfig) {
	            this.config(RavenConfig.dsn, RavenConfig.config).install();
	        }
	    },
	
	    showReportDialog: function (options) {
	        if (!_document) // doesn't work without a document (React native)
	            return;
	
	        options = options || {};
	
	        var lastEventId = options.eventId || this.lastEventId();
	        if (!lastEventId) {
	            throw new RavenConfigError('Missing eventId');
	        }
	
	        var dsn = options.dsn || this._dsn;
	        if (!dsn) {
	            throw new RavenConfigError('Missing DSN');
	        }
	
	        var encode = encodeURIComponent;
	        var qs = '';
	        qs += '?eventId=' + encode(lastEventId);
	        qs += '&dsn=' + encode(dsn);
	
	        var user = options.user || this._globalContext.user;
	        if (user) {
	            if (user.name)  qs += '&name=' + encode(user.name);
	            if (user.email) qs += '&email=' + encode(user.email);
	        }
	
	        var globalServer = this._getGlobalServer(this._parseDSN(dsn));
	
	        var script = _document.createElement('script');
	        script.async = true;
	        script.src = globalServer + '/api/embed/error-page/' + qs;
	        (_document.head || _document.body).appendChild(script);
	    },
	
	    /**** Private functions ****/
	    _ignoreNextOnError: function () {
	        var self = this;
	        this._ignoreOnError += 1;
	        setTimeout(function () {
	            // onerror should trigger before setTimeout
	            self._ignoreOnError -= 1;
	        });
	    },
	
	    _triggerEvent: function(eventType, options) {
	        // NOTE: `event` is a native browser thing, so let's avoid conflicting wiht it
	        var evt, key;
	
	        if (!this._hasDocument)
	            return;
	
	        options = options || {};
	
	        eventType = 'raven' + eventType.substr(0,1).toUpperCase() + eventType.substr(1);
	
	        if (_document.createEvent) {
	            evt = _document.createEvent('HTMLEvents');
	            evt.initEvent(eventType, true, true);
	        } else {
	            evt = _document.createEventObject();
	            evt.eventType = eventType;
	        }
	
	        for (key in options) if (hasKey(options, key)) {
	            evt[key] = options[key];
	        }
	
	        if (_document.createEvent) {
	            // IE9 if standards
	            _document.dispatchEvent(evt);
	        } else {
	            // IE8 regardless of Quirks or Standards
	            // IE9 if quirks
	            try {
	                _document.fireEvent('on' + evt.eventType.toLowerCase(), evt);
	            } catch(e) {
	                // Do nothing
	            }
	        }
	    },
	
	    /**
	     * Wraps addEventListener to capture UI breadcrumbs
	     * @param evtName the event name (e.g. "click")
	     * @returns {Function}
	     * @private
	     */
	    _breadcrumbEventHandler: function(evtName) {
	        var self = this;
	        return function (evt) {
	            // reset keypress timeout; e.g. triggering a 'click' after
	            // a 'keypress' will reset the keypress debounce so that a new
	            // set of keypresses can be recorded
	            self._keypressTimeout = null;
	
	            // It's possible this handler might trigger multiple times for the same
	            // event (e.g. event propagation through node ancestors). Ignore if we've
	            // already captured the event.
	            if (self._lastCapturedEvent === evt)
	                return;
	
	            self._lastCapturedEvent = evt;
	            var elem = evt.target;
	
	            var target;
	
	            // try/catch htmlTreeAsString because it's particularly complicated, and
	            // just accessing the DOM incorrectly can throw an exception in some circumstances.
	            try {
	                target = htmlTreeAsString(elem);
	            } catch (e) {
	                target = '<unknown>';
	            }
	
	            self.captureBreadcrumb({
	                category: 'ui.' + evtName, // e.g. ui.click, ui.input
	                message: target
	            });
	        };
	    },
	
	    /**
	     * Wraps addEventListener to capture keypress UI events
	     * @returns {Function}
	     * @private
	     */
	    _keypressEventHandler: function() {
	        var self = this,
	            debounceDuration = 1000; // milliseconds
	
	        // TODO: if somehow user switches keypress target before
	        //       debounce timeout is triggered, we will only capture
	        //       a single breadcrumb from the FIRST target (acceptable?)
	        return function (evt) {
	            var target = evt.target,
	                tagName = target && target.tagName;
	
	            // only consider keypress events on actual input elements
	            // this will disregard keypresses targeting body (e.g. tabbing
	            // through elements, hotkeys, etc)
	            if (!tagName || tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)
	                return;
	
	            // record first keypress in a series, but ignore subsequent
	            // keypresses until debounce clears
	            var timeout = self._keypressTimeout;
	            if (!timeout) {
	                self._breadcrumbEventHandler('input')(evt);
	            }
	            clearTimeout(timeout);
	            self._keypressTimeout = setTimeout(function () {
	                self._keypressTimeout = null;
	            }, debounceDuration);
	        };
	    },
	
	    /**
	     * Captures a breadcrumb of type "navigation", normalizing input URLs
	     * @param to the originating URL
	     * @param from the target URL
	     * @private
	     */
	    _captureUrlChange: function(from, to) {
	        var parsedLoc = parseUrl(this._location.href);
	        var parsedTo = parseUrl(to);
	        var parsedFrom = parseUrl(from);
	
	        // because onpopstate only tells you the "new" (to) value of location.href, and
	        // not the previous (from) value, we need to track the value of the current URL
	        // state ourselves
	        this._lastHref = to;
	
	        // Use only the path component of the URL if the URL matches the current
	        // document (almost all the time when using pushState)
	        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host)
	            to = parsedTo.relative;
	        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host)
	            from = parsedFrom.relative;
	
	        this.captureBreadcrumb({
	            category: 'navigation',
	            data: {
	                to: to,
	                from: from
	            }
	        });
	    },
	
	    /**
	     * Install any queued plugins
	     */
	    _instrumentTryCatch: function() {
	        var self = this;
	
	        var wrappedBuiltIns = self._wrappedBuiltIns;
	
	        function wrapTimeFn(orig) {
	            return function (fn, t) { // preserve arity
	                // Make a copy of the arguments to prevent deoptimization
	                // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	                var args = new Array(arguments.length);
	                for(var i = 0; i < args.length; ++i) {
	                    args[i] = arguments[i];
	                }
	                var originalCallback = args[0];
	                if (isFunction(originalCallback)) {
	                    args[0] = self.wrap(originalCallback);
	                }
	
	                // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
	                // also supports only two arguments and doesn't care what this is, so we
	                // can just call the original function directly.
	                if (orig.apply) {
	                    return orig.apply(this, args);
	                } else {
	                    return orig(args[0], args[1]);
	                }
	            };
	        }
	
	        var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;
	
	        function wrapEventTarget(global) {
	            var proto = _window[global] && _window[global].prototype;
	            if (proto && proto.hasOwnProperty && proto.hasOwnProperty('addEventListener')) {
	                fill(proto, 'addEventListener', function(orig) {
	                    return function (evtName, fn, capture, secure) { // preserve arity
	                        try {
	                            if (fn && fn.handleEvent) {
	                                fn.handleEvent = self.wrap(fn.handleEvent);
	                            }
	                        } catch (err) {
	                            // can sometimes get 'Permission denied to access property "handle Event'
	                        }
	
	                        // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
	                        // so that we don't have more than one wrapper function
	                        var before,
	                            clickHandler,
	                            keypressHandler;
	
	                        if (autoBreadcrumbs && autoBreadcrumbs.dom && (global === 'EventTarget' || global === 'Node')) {
	                            // NOTE: generating multiple handlers per addEventListener invocation, should
	                            //       revisit and verify we can just use one (almost certainly)
	                            clickHandler = self._breadcrumbEventHandler('click');
	                            keypressHandler = self._keypressEventHandler();
	                            before = function (evt) {
	                                // need to intercept every DOM event in `before` argument, in case that
	                                // same wrapped method is re-used for different events (e.g. mousemove THEN click)
	                                // see #724
	                                if (!evt) return;
	
	                                if (evt.type === 'click')
	                                    return clickHandler(evt);
	                                else if (evt.type === 'keypress')
	                                    return keypressHandler(evt);
	                            };
	                        }
	                        return orig.call(this, evtName, self.wrap(fn, undefined, before), capture, secure);
	                    };
	                }, wrappedBuiltIns);
	                fill(proto, 'removeEventListener', function (orig) {
	                    return function (evt, fn, capture, secure) {
	                        try {
	                            fn = fn && (fn.__raven_wrapper__ ? fn.__raven_wrapper__  : fn);
	                        } catch (e) {
	                            // ignore, accessing __raven_wrapper__ will throw in some Selenium environments
	                        }
	                        return orig.call(this, evt, fn, capture, secure);
	                    };
	                }, wrappedBuiltIns);
	            }
	        }
	
	        fill(_window, 'setTimeout', wrapTimeFn, wrappedBuiltIns);
	        fill(_window, 'setInterval', wrapTimeFn, wrappedBuiltIns);
	        if (_window.requestAnimationFrame) {
	            fill(_window, 'requestAnimationFrame', function (orig) {
	                return function (cb) {
	                    return orig(self.wrap(cb));
	                };
	            }, wrappedBuiltIns);
	        }
	
	        // event targets borrowed from bugsnag-js:
	        // https://github.com/bugsnag/bugsnag-js/blob/master/src/bugsnag.js#L666
	        var eventTargets = ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'];
	        for (var i = 0; i < eventTargets.length; i++) {
	            wrapEventTarget(eventTargets[i]);
	        }
	
	        var $ = _window.jQuery || _window.$;
	        if ($ && $.fn && $.fn.ready) {
	            fill($.fn, 'ready', function (orig) {
	                return function (fn) {
	                    return orig.call(this, self.wrap(fn));
	                };
	            }, wrappedBuiltIns);
	        }
	    },
	
	
	    /**
	     * Instrument browser built-ins w/ breadcrumb capturing
	     *  - XMLHttpRequests
	     *  - DOM interactions (click/typing)
	     *  - window.location changes
	     *  - console
	     *
	     * Can be disabled or individually configured via the `autoBreadcrumbs` config option
	     */
	    _instrumentBreadcrumbs: function () {
	        var self = this;
	        var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;
	
	        var wrappedBuiltIns = self._wrappedBuiltIns;
	
	        function wrapProp(prop, xhr) {
	            if (prop in xhr && isFunction(xhr[prop])) {
	                fill(xhr, prop, function (orig) {
	                    return self.wrap(orig);
	                }); // intentionally don't track filled methods on XHR instances
	            }
	        }
	
	        if (autoBreadcrumbs.xhr && 'XMLHttpRequest' in _window) {
	            var xhrproto = XMLHttpRequest.prototype;
	            fill(xhrproto, 'open', function(origOpen) {
	                return function (method, url) { // preserve arity
	
	                    // if Sentry key appears in URL, don't capture
	                    if (isString(url) && url.indexOf(self._globalKey) === -1) {
	                        this.__raven_xhr = {
	                            method: method,
	                            url: url,
	                            status_code: null
	                        };
	                    }
	
	                    return origOpen.apply(this, arguments);
	                };
	            }, wrappedBuiltIns);
	
	            fill(xhrproto, 'send', function(origSend) {
	                return function (data) { // preserve arity
	                    var xhr = this;
	
	                    function onreadystatechangeHandler() {
	                        if (xhr.__raven_xhr && (xhr.readyState === 1 || xhr.readyState === 4)) {
	                            try {
	                                // touching statusCode in some platforms throws
	                                // an exception
	                                xhr.__raven_xhr.status_code = xhr.status;
	                            } catch (e) { /* do nothing */ }
	                            self.captureBreadcrumb({
	                                type: 'http',
	                                category: 'xhr',
	                                data: xhr.__raven_xhr
	                            });
	                        }
	                    }
	
	                    var props = ['onload', 'onerror', 'onprogress'];
	                    for (var j = 0; j < props.length; j++) {
	                        wrapProp(props[j], xhr);
	                    }
	
	                    if ('onreadystatechange' in xhr && isFunction(xhr.onreadystatechange)) {
	                        fill(xhr, 'onreadystatechange', function (orig) {
	                            return self.wrap(orig, undefined, onreadystatechangeHandler);
	                        } /* intentionally don't track this instrumentation */);
	                    } else {
	                        // if onreadystatechange wasn't actually set by the page on this xhr, we
	                        // are free to set our own and capture the breadcrumb
	                        xhr.onreadystatechange = onreadystatechangeHandler;
	                    }
	
	                    return origSend.apply(this, arguments);
	                };
	            }, wrappedBuiltIns);
	        }
	
	        if (autoBreadcrumbs.xhr && 'fetch' in _window) {
	            fill(_window, 'fetch', function(origFetch) {
	                return function (fn, t) { // preserve arity
	                    // Make a copy of the arguments to prevent deoptimization
	                    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	                    var args = new Array(arguments.length);
	                    for(var i = 0; i < args.length; ++i) {
	                        args[i] = arguments[i];
	                    }
	
	                    var method = 'GET';
	
	                    if (args[1] && args[1].method) {
	                        method = args[1].method;
	                    }
	
	                    var fetchData = {
	                        method: method,
	                        url: args[0],
	                        status_code: null
	                    };
	
	                    self.captureBreadcrumb({
	                        type: 'http',
	                        category: 'fetch',
	                        data: fetchData
	                    });
	
	                    return origFetch.apply(this, args).then(function (response) {
	                        fetchData.status_code = response.status;
	
	                        return response;
	                    });
	                };
	            }, wrappedBuiltIns);
	        }
	
	        // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
	        // to the document. Do this before we instrument addEventListener.
	        if (autoBreadcrumbs.dom && this._hasDocument) {
	            if (_document.addEventListener) {
	                _document.addEventListener('click', self._breadcrumbEventHandler('click'), false);
	                _document.addEventListener('keypress', self._keypressEventHandler(), false);
	            }
	            else {
	                // IE8 Compatibility
	                _document.attachEvent('onclick', self._breadcrumbEventHandler('click'));
	                _document.attachEvent('onkeypress', self._keypressEventHandler());
	            }
	        }
	
	        // record navigation (URL) changes
	        // NOTE: in Chrome App environment, touching history.pushState, *even inside
	        //       a try/catch block*, will cause Chrome to output an error to console.error
	        // borrowed from: https://github.com/angular/angular.js/pull/13945/files
	        var chrome = _window.chrome;
	        var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
	        var hasPushState = !isChromePackagedApp && _window.history && history.pushState;
	        if (autoBreadcrumbs.location && hasPushState) {
	            // TODO: remove onpopstate handler on uninstall()
	            var oldOnPopState = _window.onpopstate;
	            _window.onpopstate = function () {
	                var currentHref = self._location.href;
	                self._captureUrlChange(self._lastHref, currentHref);
	
	                if (oldOnPopState) {
	                    return oldOnPopState.apply(this, arguments);
	                }
	            };
	
	            fill(history, 'pushState', function (origPushState) {
	                // note history.pushState.length is 0; intentionally not declaring
	                // params to preserve 0 arity
	                return function (/* state, title, url */) {
	                    var url = arguments.length > 2 ? arguments[2] : undefined;
	
	                    // url argument is optional
	                    if (url) {
	                        // coerce to string (this is what pushState does)
	                        self._captureUrlChange(self._lastHref, url + '');
	                    }
	
	                    return origPushState.apply(this, arguments);
	                };
	            }, wrappedBuiltIns);
	        }
	
	        if (autoBreadcrumbs.console && 'console' in _window && console.log) {
	            // console
	            var consoleMethodCallback = function (msg, data) {
	                self.captureBreadcrumb({
	                    message: msg,
	                    level: data.level,
	                    category: 'console'
	                });
	            };
	
	            each(['debug', 'info', 'warn', 'error', 'log'], function (_, level) {
	                wrapConsoleMethod(console, level, consoleMethodCallback);
	            });
	        }
	
	    },
	
	    _restoreBuiltIns: function () {
	        // restore any wrapped builtins
	        var builtin;
	        while (this._wrappedBuiltIns.length) {
	            builtin = this._wrappedBuiltIns.shift();
	
	            var obj = builtin[0],
	              name = builtin[1],
	              orig = builtin[2];
	
	            obj[name] = orig;
	        }
	    },
	
	    _drainPlugins: function() {
	        var self = this;
	
	        // FIX ME TODO
	        each(this._plugins, function(_, plugin) {
	            var installer = plugin[0];
	            var args = plugin[1];
	            installer.apply(self, [self].concat(args));
	        });
	    },
	
	    _parseDSN: function(str) {
	        var m = dsnPattern.exec(str),
	            dsn = {},
	            i = 7;
	
	        try {
	            while (i--) dsn[dsnKeys[i]] = m[i] || '';
	        } catch(e) {
	            throw new RavenConfigError('Invalid DSN: ' + str);
	        }
	
	        if (dsn.pass && !this._globalOptions.allowSecretKey) {
	            throw new RavenConfigError('Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key');
	        }
	
	        return dsn;
	    },
	
	    _getGlobalServer: function(uri) {
	        // assemble the endpoint from the uri pieces
	        var globalServer = '//' + uri.host +
	            (uri.port ? ':' + uri.port : '');
	
	        if (uri.protocol) {
	            globalServer = uri.protocol + ':' + globalServer;
	        }
	        return globalServer;
	    },
	
	    _handleOnErrorStackInfo: function() {
	        // if we are intentionally ignoring errors via onerror, bail out
	        if (!this._ignoreOnError) {
	            this._handleStackInfo.apply(this, arguments);
	        }
	    },
	
	    _handleStackInfo: function(stackInfo, options) {
	        var frames = this._prepareFrames(stackInfo, options);
	
	        this._triggerEvent('handle', {
	            stackInfo: stackInfo,
	            options: options
	        });
	
	        this._processException(
	            stackInfo.name,
	            stackInfo.message,
	            stackInfo.url,
	            stackInfo.lineno,
	            frames,
	            options
	        );
	    },
	
	    _prepareFrames: function(stackInfo, options) {
	        var self = this;
	        var frames = [];
	        if (stackInfo.stack && stackInfo.stack.length) {
	            each(stackInfo.stack, function(i, stack) {
	                var frame = self._normalizeFrame(stack);
	                if (frame) {
	                    frames.push(frame);
	                }
	            });
	
	            // e.g. frames captured via captureMessage throw
	            if (options && options.trimHeadFrames) {
	                for (var j = 0; j < options.trimHeadFrames && j < frames.length; j++) {
	                    frames[j].in_app = false;
	                }
	            }
	        }
	        frames = frames.slice(0, this._globalOptions.stackTraceLimit);
	        return frames;
	    },
	
	
	    _normalizeFrame: function(frame) {
	        if (!frame.url) return;
	
	        // normalize the frames data
	        var normalized = {
	            filename:   frame.url,
	            lineno:     frame.line,
	            colno:      frame.column,
	            'function': frame.func || '?'
	        };
	
	        normalized.in_app = !( // determine if an exception came from outside of our app
	            // first we check the global includePaths list.
	            !!this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(normalized.filename) ||
	            // Now we check for fun, if the function name is Raven or TraceKit
	            /(Raven|TraceKit)\./.test(normalized['function']) ||
	            // finally, we do a last ditch effort and check for raven.min.js
	            /raven\.(min\.)?js$/.test(normalized.filename)
	        );
	
	        return normalized;
	    },
	
	    _processException: function(type, message, fileurl, lineno, frames, options) {
	        var stacktrace;
	        if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(message)) return;
	
	        message += '';
	
	        if (frames && frames.length) {
	            fileurl = frames[0].filename || fileurl;
	            // Sentry expects frames oldest to newest
	            // and JS sends them as newest to oldest
	            frames.reverse();
	            stacktrace = {frames: frames};
	        } else if (fileurl) {
	            stacktrace = {
	                frames: [{
	                    filename: fileurl,
	                    lineno: lineno,
	                    in_app: true
	                }]
	            };
	        }
	
	        if (!!this._globalOptions.ignoreUrls.test && this._globalOptions.ignoreUrls.test(fileurl)) return;
	        if (!!this._globalOptions.whitelistUrls.test && !this._globalOptions.whitelistUrls.test(fileurl)) return;
	
	        var data = objectMerge({
	            // sentry.interfaces.Exception
	            exception: {
	                values: [{
	                    type: type,
	                    value: message,
	                    stacktrace: stacktrace
	                }]
	            },
	            culprit: fileurl
	        }, options);
	
	        // Fire away!
	        this._send(data);
	    },
	
	    _trimPacket: function(data) {
	        // For now, we only want to truncate the two different messages
	        // but this could/should be expanded to just trim everything
	        var max = this._globalOptions.maxMessageLength;
	        if (data.message) {
	            data.message = truncate(data.message, max);
	        }
	        if (data.exception) {
	            var exception = data.exception.values[0];
	            exception.value = truncate(exception.value, max);
	        }
	
	        return data;
	    },
	
	    _getHttpData: function() {
	        if (!this._hasDocument || !_document.location || !_document.location.href) {
	            return;
	        }
	
	        var httpData = {
	            headers: {
	                'User-Agent': navigator.userAgent
	            }
	        };
	
	        httpData.url = _document.location.href;
	
	        if (_document.referrer) {
	            httpData.headers.Referer = _document.referrer;
	        }
	
	        return httpData;
	    },
	
	
	    _send: function(data) {
	        var globalOptions = this._globalOptions;
	
	        var baseData = {
	            project: this._globalProject,
	            logger: globalOptions.logger,
	            platform: 'javascript'
	        }, httpData = this._getHttpData();
	
	        if (httpData) {
	            baseData.request = httpData;
	        }
	
	        // HACK: delete `trimHeadFrames` to prevent from appearing in outbound payload
	        if (data.trimHeadFrames) delete data.trimHeadFrames;
	
	        data = objectMerge(baseData, data);
	
	        // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
	        data.tags = objectMerge(objectMerge({}, this._globalContext.tags), data.tags);
	        data.extra = objectMerge(objectMerge({}, this._globalContext.extra), data.extra);
	
	        // Send along our own collected metadata with extra
	        data.extra['session:duration'] = now() - this._startTime;
	
	        if (this._breadcrumbs && this._breadcrumbs.length > 0) {
	            // intentionally make shallow copy so that additions
	            // to breadcrumbs aren't accidentally sent in this request
	            data.breadcrumbs = {
	                values: [].slice.call(this._breadcrumbs, 0)
	            };
	        }
	
	        // If there are no tags/extra, strip the key from the payload alltogther.
	        if (isEmptyObject(data.tags)) delete data.tags;
	
	        if (this._globalContext.user) {
	            // sentry.interfaces.User
	            data.user = this._globalContext.user;
	        }
	
	        // Include the environment if it's defined in globalOptions
	        if (globalOptions.environment) data.environment = globalOptions.environment;
	
	        // Include the release if it's defined in globalOptions
	        if (globalOptions.release) data.release = globalOptions.release;
	
	        // Include server_name if it's defined in globalOptions
	        if (globalOptions.serverName) data.server_name = globalOptions.serverName;
	
	        if (isFunction(globalOptions.dataCallback)) {
	            data = globalOptions.dataCallback(data) || data;
	        }
	
	        // Why??????????
	        if (!data || isEmptyObject(data)) {
	            return;
	        }
	
	        // Check if the request should be filtered or not
	        if (isFunction(globalOptions.shouldSendCallback) && !globalOptions.shouldSendCallback(data)) {
	            return;
	        }
	
	        this._sendProcessedPayload(data);
	    },
	
	    _getUuid: function () {
	      return uuid4();
	    },
	
	    _sendProcessedPayload: function(data, callback) {
	        var self = this;
	        var globalOptions = this._globalOptions;
	
	        // Send along an event_id if not explicitly passed.
	        // This event_id can be used to reference the error within Sentry itself.
	        // Set lastEventId after we know the error should actually be sent
	        this._lastEventId = data.event_id || (data.event_id = this._getUuid());
	
	        // Try and clean up the packet before sending by truncating long values
	        data = this._trimPacket(data);
	
	        this._logDebug('debug', 'Raven about to send:', data);
	
	        if (!this.isSetup()) return;
	
	        var auth = {
	            sentry_version: '7',
	            sentry_client: 'raven-js/' + this.VERSION,
	            sentry_key: this._globalKey
	        };
	        if (this._globalSecret) {
	            auth.sentry_secret = this._globalSecret;
	        }
	
	        var exception = data.exception && data.exception.values[0];
	        this.captureBreadcrumb({
	            category: 'sentry',
	            message: exception
	                ? (exception.type ? exception.type + ': ' : '') + exception.value
	                : data.message,
	            event_id: data.event_id,
	            level: data.level || 'error' // presume error unless specified
	        });
	
	        var url = this._globalEndpoint;
	        (globalOptions.transport || this._makeRequest).call(this, {
	            url: url,
	            auth: auth,
	            data: data,
	            options: globalOptions,
	            onSuccess: function success() {
	                self._triggerEvent('success', {
	                    data: data,
	                    src: url
	                });
	                callback && callback();
	            },
	            onError: function failure(error) {
	                self._triggerEvent('failure', {
	                    data: data,
	                    src: url
	                });
	                error = error || new Error('Raven send failed (no additional details provided)');
	                callback && callback(error);
	            }
	        });
	    },
	
	    _makeRequest: function(opts) {
	        var request = new XMLHttpRequest();
	
	        // if browser doesn't support CORS (e.g. IE7), we are out of luck
	        var hasCORS =
	            'withCredentials' in request ||
	            typeof XDomainRequest !== 'undefined';
	
	        if (!hasCORS) return;
	
	        var url = opts.url;
	        function handler() {
	            if (request.status === 200) {
	                if (opts.onSuccess) {
	                    opts.onSuccess();
	                }
	            } else if (opts.onError) {
	                opts.onError(new Error('Sentry error code: ' + request.status));
	            }
	        }
	
	        if ('withCredentials' in request) {
	            request.onreadystatechange = function () {
	                if (request.readyState !== 4) {
	                    return;
	                }
	                handler();
	            };
	        } else {
	            request = new XDomainRequest();
	            // xdomainrequest cannot go http -> https (or vice versa),
	            // so always use protocol relative
	            url = url.replace(/^https?:/, '');
	
	            // onreadystatechange not supported by XDomainRequest
	            request.onload = handler;
	        }
	
	        // NOTE: auth is intentionally sent as part of query string (NOT as custom
	        //       HTTP header) so as to avoid preflight CORS requests
	        request.open('POST', url + '?' + urlencode(opts.auth));
	        request.send(stringify(opts.data));
	    },
	
	    _logDebug: function(level) {
	        if (this._originalConsoleMethods[level] && this.debug) {
	            // In IE<10 console methods do not have their own 'apply' method
	            Function.prototype.apply.call(
	                this._originalConsoleMethods[level],
	                this._originalConsole,
	                [].slice.call(arguments, 1)
	            );
	        }
	    },
	
	    _mergeContext: function(key, context) {
	        if (isUndefined(context)) {
	            delete this._globalContext[key];
	        } else {
	            this._globalContext[key] = objectMerge(this._globalContext[key] || {}, context);
	        }
	    }
	};
	
	/*------------------------------------------------
	 * utils
	 *
	 * conditionally exported for test via Raven.utils
	 =================================================
	 */
	var objectPrototype = Object.prototype;
	
	function isUndefined(what) {
	    return what === void 0;
	}
	
	function isFunction(what) {
	    return typeof what === 'function';
	}
	
	function isString(what) {
	    return objectPrototype.toString.call(what) === '[object String]';
	}
	
	function isObject(what) {
	    return typeof what === 'object' && what !== null;
	}
	
	function isEmptyObject(what) {
	    for (var _ in what) return false;  // eslint-disable-line guard-for-in, no-unused-vars
	    return true;
	}
	
	// Sorta yanked from https://github.com/joyent/node/blob/aa3b4b4/lib/util.js#L560
	// with some tiny modifications
	function isError(what) {
	    var toString = objectPrototype.toString.call(what);
	    return isObject(what) &&
	        toString === '[object Error]' ||
	        toString === '[object Exception]' || // Firefox NS_ERROR_FAILURE Exceptions
	        what instanceof Error;
	}
	
	function each(obj, callback) {
	    var i, j;
	
	    if (isUndefined(obj.length)) {
	        for (i in obj) {
	            if (hasKey(obj, i)) {
	                callback.call(null, i, obj[i]);
	            }
	        }
	    } else {
	        j = obj.length;
	        if (j) {
	            for (i = 0; i < j; i++) {
	                callback.call(null, i, obj[i]);
	            }
	        }
	    }
	}
	
	function objectMerge(obj1, obj2) {
	    if (!obj2) {
	        return obj1;
	    }
	    each(obj2, function(key, value){
	        obj1[key] = value;
	    });
	    return obj1;
	}
	
	function truncate(str, max) {
	    return !max || str.length <= max ? str : str.substr(0, max) + '\u2026';
	}
	
	/**
	 * hasKey, a better form of hasOwnProperty
	 * Example: hasKey(MainHostObject, property) === true/false
	 *
	 * @param {Object} host object to check property
	 * @param {string} key to check
	 */
	function hasKey(object, key) {
	    return objectPrototype.hasOwnProperty.call(object, key);
	}
	
	function joinRegExp(patterns) {
	    // Combine an array of regular expressions and strings into one large regexp
	    // Be mad.
	    var sources = [],
	        i = 0, len = patterns.length,
	        pattern;
	
	    for (; i < len; i++) {
	        pattern = patterns[i];
	        if (isString(pattern)) {
	            // If it's a string, we need to escape it
	            // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	            sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'));
	        } else if (pattern && pattern.source) {
	            // If it's a regexp already, we want to extract the source
	            sources.push(pattern.source);
	        }
	        // Intentionally skip other cases
	    }
	    return new RegExp(sources.join('|'), 'i');
	}
	
	function urlencode(o) {
	    var pairs = [];
	    each(o, function(key, value) {
	        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
	    });
	    return pairs.join('&');
	}
	
	// borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
	// intentionally using regex and not <a/> href parsing trick because React Native and other
	// environments where DOM might not be available
	function parseUrl(url) {
	    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
	    if (!match) return {};
	
	    // coerce to undefined values to empty string so we don't get 'undefined'
	    var query = match[6] || '';
	    var fragment = match[8] || '';
	    return {
	        protocol: match[2],
	        host: match[4],
	        path: match[5],
	        relative: match[5] + query + fragment // everything minus origin
	    };
	}
	function uuid4() {
	    var crypto = _window.crypto || _window.msCrypto;
	
	    if (!isUndefined(crypto) && crypto.getRandomValues) {
	        // Use window.crypto API if available
	        var arr = new Uint16Array(8);
	        crypto.getRandomValues(arr);
	
	        // set 4 in byte 7
	        arr[3] = arr[3] & 0xFFF | 0x4000;
	        // set 2 most significant bits of byte 9 to '10'
	        arr[4] = arr[4] & 0x3FFF | 0x8000;
	
	        var pad = function(num) {
	            var v = num.toString(16);
	            while (v.length < 4) {
	                v = '0' + v;
	            }
	            return v;
	        };
	
	        return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) +
	        pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
	    } else {
	        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
	        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	            var r = Math.random()*16|0,
	                v = c === 'x' ? r : r&0x3|0x8;
	            return v.toString(16);
	        });
	    }
	}
	
	/**
	 * Given a child DOM element, returns a query-selector statement describing that
	 * and its ancestors
	 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
	 * @param elem
	 * @returns {string}
	 */
	function htmlTreeAsString(elem) {
	    /* eslint no-extra-parens:0*/
	    var MAX_TRAVERSE_HEIGHT = 5,
	        MAX_OUTPUT_LEN = 80,
	        out = [],
	        height = 0,
	        len = 0,
	        separator = ' > ',
	        sepLength = separator.length,
	        nextStr;
	
	    while (elem && height++ < MAX_TRAVERSE_HEIGHT) {
	
	        nextStr = htmlElementAsString(elem);
	        // bail out if
	        // - nextStr is the 'html' element
	        // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
	        //   (ignore this limit if we are on the first iteration)
	        if (nextStr === 'html' || height > 1 && len + (out.length * sepLength) + nextStr.length >= MAX_OUTPUT_LEN) {
	            break;
	        }
	
	        out.push(nextStr);
	
	        len += nextStr.length;
	        elem = elem.parentNode;
	    }
	
	    return out.reverse().join(separator);
	}
	
	/**
	 * Returns a simple, query-selector representation of a DOM element
	 * e.g. [HTMLElement] => input#foo.btn[name=baz]
	 * @param HTMLElement
	 * @returns {string}
	 */
	function htmlElementAsString(elem) {
	    var out = [],
	        className,
	        classes,
	        key,
	        attr,
	        i;
	
	    if (!elem || !elem.tagName) {
	        return '';
	    }
	
	    out.push(elem.tagName.toLowerCase());
	    if (elem.id) {
	        out.push('#' + elem.id);
	    }
	
	    className = elem.className;
	    if (className && isString(className)) {
	        classes = className.split(' ');
	        for (i = 0; i < classes.length; i++) {
	            out.push('.' + classes[i]);
	        }
	    }
	    var attrWhitelist = ['type', 'name', 'title', 'alt'];
	    for (i = 0; i < attrWhitelist.length; i++) {
	        key = attrWhitelist[i];
	        attr = elem.getAttribute(key);
	        if (attr) {
	            out.push('[' + key + '="' + attr + '"]');
	        }
	    }
	    return out.join('');
	}
	
	/**
	 * Polyfill a method
	 * @param obj object e.g. `document`
	 * @param name method name present on object e.g. `addEventListener`
	 * @param replacement replacement function
	 * @param track {optional} record instrumentation to an array
	 */
	function fill(obj, name, replacement, track) {
	    var orig = obj[name];
	    obj[name] = replacement(orig);
	    if (track) {
	        track.push([obj, name, orig]);
	    }
	}
	
	if (typeof __DEV__ !== 'undefined' && __DEV__) {
	    Raven.utils = {
	        isUndefined: isUndefined,
	        isFunction: isFunction,
	        isString: isString,
	        isObject: isObject,
	        isEmptyObject: isEmptyObject,
	        isError: isError,
	        each: each,
	        objectMerge: objectMerge,
	        truncate: truncate,
	        hasKey: hasKey,
	        joinRegExp: joinRegExp,
	        urlencode: urlencode,
	        uuid4: uuid4,
	        htmlTreeAsString: htmlTreeAsString,
	        htmlElementAsString: htmlElementAsString,
	        parseUrl: parseUrl,
	        fill: fill
	    };
	};
	
	// Deprecations
	Raven.prototype.setUser = Raven.prototype.setUserContext;
	Raven.prototype.setReleaseContext = Raven.prototype.setRelease;
	
	module.exports = Raven;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	/*
	 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
	 MIT license
	*/
	
	var TraceKit = {
	    collectWindowErrors: true,
	    debug: false
	};
	
	// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
	var _window = typeof window !== 'undefined' ? window
	            : typeof global !== 'undefined' ? global
	            : typeof self !== 'undefined' ? self
	            : {};
	
	// global reference to slice
	var _slice = [].slice;
	var UNKNOWN_FUNCTION = '?';
	
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
	var ERROR_TYPES_RE = /^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;
	
	function getLocationHref() {
	    if (typeof document === 'undefined')
	        return '';
	
	    return document.location.href;
	}
	
	/**
	 * TraceKit.report: cross-browser processing of unhandled exceptions
	 *
	 * Syntax:
	 *   TraceKit.report.subscribe(function(stackInfo) { ... })
	 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
	 *   TraceKit.report(exception)
	 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
	 *
	 * Supports:
	 *   - Firefox: full stack trace with line numbers, plus column number
	 *              on top frame; column number is not guaranteed
	 *   - Opera:   full stack trace with line and column numbers
	 *   - Chrome:  full stack trace with line and column numbers
	 *   - Safari:  line and column number for the top frame only; some frames
	 *              may be missing, and column number is not guaranteed
	 *   - IE:      line and column number for the top frame only; some frames
	 *              may be missing, and column number is not guaranteed
	 *
	 * In theory, TraceKit should work on all of the following versions:
	 *   - IE5.5+ (only 8.0 tested)
	 *   - Firefox 0.9+ (only 3.5+ tested)
	 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
	 *     Exceptions Have Stacktrace to be enabled in opera:config)
	 *   - Safari 3+ (only 4+ tested)
	 *   - Chrome 1+ (only 5+ tested)
	 *   - Konqueror 3.5+ (untested)
	 *
	 * Requires TraceKit.computeStackTrace.
	 *
	 * Tries to catch all unhandled exceptions and report them to the
	 * subscribed handlers. Please note that TraceKit.report will rethrow the
	 * exception. This is REQUIRED in order to get a useful stack trace in IE.
	 * If the exception does not reach the top of the browser, you will only
	 * get a stack trace from the point where TraceKit.report was called.
	 *
	 * Handlers receive a stackInfo object as described in the
	 * TraceKit.computeStackTrace docs.
	 */
	TraceKit.report = (function reportModuleWrapper() {
	    var handlers = [],
	        lastArgs = null,
	        lastException = null,
	        lastExceptionStack = null;
	
	    /**
	     * Add a crash handler.
	     * @param {Function} handler
	     */
	    function subscribe(handler) {
	        installGlobalHandler();
	        handlers.push(handler);
	    }
	
	    /**
	     * Remove a crash handler.
	     * @param {Function} handler
	     */
	    function unsubscribe(handler) {
	        for (var i = handlers.length - 1; i >= 0; --i) {
	            if (handlers[i] === handler) {
	                handlers.splice(i, 1);
	            }
	        }
	    }
	
	    /**
	     * Remove all crash handlers.
	     */
	    function unsubscribeAll() {
	        uninstallGlobalHandler();
	        handlers = [];
	    }
	
	    /**
	     * Dispatch stack information to all handlers.
	     * @param {Object.<string, *>} stack
	     */
	    function notifyHandlers(stack, isWindowError) {
	        var exception = null;
	        if (isWindowError && !TraceKit.collectWindowErrors) {
	          return;
	        }
	        for (var i in handlers) {
	            if (handlers.hasOwnProperty(i)) {
	                try {
	                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
	                } catch (inner) {
	                    exception = inner;
	                }
	            }
	        }
	
	        if (exception) {
	            throw exception;
	        }
	    }
	
	    var _oldOnerrorHandler, _onErrorHandlerInstalled;
	
	    /**
	     * Ensures all global unhandled exceptions are recorded.
	     * Supported by Gecko and IE.
	     * @param {string} message Error message.
	     * @param {string} url URL of script that generated the exception.
	     * @param {(number|string)} lineNo The line number at which the error
	     * occurred.
	     * @param {?(number|string)} colNo The column number at which the error
	     * occurred.
	     * @param {?Error} ex The actual Error object.
	     */
	    function traceKitWindowOnError(message, url, lineNo, colNo, ex) {
	        var stack = null;
	
	        if (lastExceptionStack) {
	            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
	            processLastException();
	        } else if (ex) {
	            // New chrome and blink send along a real error object
	            // Let's just report that like a normal error.
	            // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
	            stack = TraceKit.computeStackTrace(ex);
	            notifyHandlers(stack, true);
	        } else {
	            var location = {
	                'url': url,
	                'line': lineNo,
	                'column': colNo
	            };
	
	            var name = undefined;
	            var msg = message; // must be new var or will modify original `arguments`
	            var groups;
	            if ({}.toString.call(message) === '[object String]') {
	                var groups = message.match(ERROR_TYPES_RE);
	                if (groups) {
	                    name = groups[1];
	                    msg = groups[2];
	                }
	            }
	
	            location.func = UNKNOWN_FUNCTION;
	
	            stack = {
	                'name': name,
	                'message': msg,
	                'url': getLocationHref(),
	                'stack': [location]
	            };
	            notifyHandlers(stack, true);
	        }
	
	        if (_oldOnerrorHandler) {
	            return _oldOnerrorHandler.apply(this, arguments);
	        }
	
	        return false;
	    }
	
	    function installGlobalHandler ()
	    {
	        if (_onErrorHandlerInstalled) {
	            return;
	        }
	        _oldOnerrorHandler = _window.onerror;
	        _window.onerror = traceKitWindowOnError;
	        _onErrorHandlerInstalled = true;
	    }
	
	    function uninstallGlobalHandler ()
	    {
	        if (!_onErrorHandlerInstalled) {
	            return;
	        }
	        _window.onerror = _oldOnerrorHandler;
	        _onErrorHandlerInstalled = false;
	        _oldOnerrorHandler = undefined;
	    }
	
	    function processLastException() {
	        var _lastExceptionStack = lastExceptionStack,
	            _lastArgs = lastArgs;
	        lastArgs = null;
	        lastExceptionStack = null;
	        lastException = null;
	        notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
	    }
	
	    /**
	     * Reports an unhandled Error to TraceKit.
	     * @param {Error} ex
	     * @param {?boolean} rethrow If false, do not re-throw the exception.
	     * Only used for window.onerror to not cause an infinite loop of
	     * rethrowing.
	     */
	    function report(ex, rethrow) {
	        var args = _slice.call(arguments, 1);
	        if (lastExceptionStack) {
	            if (lastException === ex) {
	                return; // already caught by an inner catch block, ignore
	            } else {
	              processLastException();
	            }
	        }
	
	        var stack = TraceKit.computeStackTrace(ex);
	        lastExceptionStack = stack;
	        lastException = ex;
	        lastArgs = args;
	
	        // If the stack trace is incomplete, wait for 2 seconds for
	        // slow slow IE to see if onerror occurs or not before reporting
	        // this exception; otherwise, we will end up with an incomplete
	        // stack trace
	        setTimeout(function () {
	            if (lastException === ex) {
	                processLastException();
	            }
	        }, (stack.incomplete ? 2000 : 0));
	
	        if (rethrow !== false) {
	            throw ex; // re-throw to propagate to the top level (and cause window.onerror)
	        }
	    }
	
	    report.subscribe = subscribe;
	    report.unsubscribe = unsubscribe;
	    report.uninstall = unsubscribeAll;
	    return report;
	}());
	
	/**
	 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
	 *
	 * Syntax:
	 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
	 * Returns:
	 *   s.name              - exception name
	 *   s.message           - exception message
	 *   s.stack[i].url      - JavaScript or HTML file URL
	 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
	 *   s.stack[i].args     - arguments passed to the function, if known
	 *   s.stack[i].line     - line number, if known
	 *   s.stack[i].column   - column number, if known
	 *
	 * Supports:
	 *   - Firefox:  full stack trace with line numbers and unreliable column
	 *               number on top frame
	 *   - Opera 10: full stack trace with line and column numbers
	 *   - Opera 9-: full stack trace with line numbers
	 *   - Chrome:   full stack trace with line and column numbers
	 *   - Safari:   line and column number for the topmost stacktrace element
	 *               only
	 *   - IE:       no line numbers whatsoever
	 *
	 * Tries to guess names of anonymous functions by looking for assignments
	 * in the source code. In IE and Safari, we have to guess source file names
	 * by searching for function bodies inside all page scripts. This will not
	 * work for scripts that are loaded cross-domain.
	 * Here be dragons: some function names may be guessed incorrectly, and
	 * duplicate functions may be mismatched.
	 *
	 * TraceKit.computeStackTrace should only be used for tracing purposes.
	 * Logging of unhandled exceptions should be done with TraceKit.report,
	 * which builds on top of TraceKit.computeStackTrace and provides better
	 * IE support by utilizing the window.onerror event to retrieve information
	 * about the top of the stack.
	 *
	 * Note: In IE and Safari, no stack trace is recorded on the Error object,
	 * so computeStackTrace instead walks its *own* chain of callers.
	 * This means that:
	 *  * in Safari, some methods may be missing from the stack trace;
	 *  * in IE, the topmost function in the stack trace will always be the
	 *    caller of computeStackTrace.
	 *
	 * This is okay for tracing (because you are likely to be calling
	 * computeStackTrace from the function you want to be the topmost element
	 * of the stack trace anyway), but not okay for logging unhandled
	 * exceptions (because your catch block will likely be far away from the
	 * inner function that actually caused the exception).
	 *
	 */
	TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
	    /**
	     * Escapes special characters, except for whitespace, in a string to be
	     * used inside a regular expression as a string literal.
	     * @param {string} text The string.
	     * @return {string} The escaped string literal.
	     */
	    function escapeRegExp(text) {
	        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
	    }
	
	    /**
	     * Escapes special characters in a string to be used inside a regular
	     * expression as a string literal. Also ensures that HTML entities will
	     * be matched the same as their literal friends.
	     * @param {string} body The string.
	     * @return {string} The escaped string.
	     */
	    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
	        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
	    }
	
	    // Contents of Exception in various browsers.
	    //
	    // SAFARI:
	    // ex.message = Can't find variable: qq
	    // ex.line = 59
	    // ex.sourceId = 580238192
	    // ex.sourceURL = http://...
	    // ex.expressionBeginOffset = 96
	    // ex.expressionCaretOffset = 98
	    // ex.expressionEndOffset = 98
	    // ex.name = ReferenceError
	    //
	    // FIREFOX:
	    // ex.message = qq is not defined
	    // ex.fileName = http://...
	    // ex.lineNumber = 59
	    // ex.columnNumber = 69
	    // ex.stack = ...stack trace... (see the example below)
	    // ex.name = ReferenceError
	    //
	    // CHROME:
	    // ex.message = qq is not defined
	    // ex.name = ReferenceError
	    // ex.type = not_defined
	    // ex.arguments = ['aa']
	    // ex.stack = ...stack trace...
	    //
	    // INTERNET EXPLORER:
	    // ex.message = ...
	    // ex.name = ReferenceError
	    //
	    // OPERA:
	    // ex.message = ...message... (see the example below)
	    // ex.name = ReferenceError
	    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
	    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'
	
	    /**
	     * Computes stack trace information from the stack property.
	     * Chrome and Gecko use this property.
	     * @param {Error} ex
	     * @return {?Object.<string, *>} Stack trace information.
	     */
	    function computeStackTraceFromStackProp(ex) {
	        if (typeof ex.stack === 'undefined' || !ex.stack) return;
	
	        var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
	            gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,
	            winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
	            lines = ex.stack.split('\n'),
	            stack = [],
	            parts,
	            element,
	            reference = /^(.*) is undefined$/.exec(ex.message);
	
	        for (var i = 0, j = lines.length; i < j; ++i) {
	            if ((parts = chrome.exec(lines[i]))) {
	                var isNative = parts[2] && parts[2].indexOf('native') !== -1;
	                element = {
	                    'url': !isNative ? parts[2] : null,
	                    'func': parts[1] || UNKNOWN_FUNCTION,
	                    'args': isNative ? [parts[2]] : [],
	                    'line': parts[3] ? +parts[3] : null,
	                    'column': parts[4] ? +parts[4] : null
	                };
	            } else if ( parts = winjs.exec(lines[i]) ) {
	                element = {
	                    'url': parts[2],
	                    'func': parts[1] || UNKNOWN_FUNCTION,
	                    'args': [],
	                    'line': +parts[3],
	                    'column': parts[4] ? +parts[4] : null
	                };
	            } else if ((parts = gecko.exec(lines[i]))) {
	                element = {
	                    'url': parts[3],
	                    'func': parts[1] || UNKNOWN_FUNCTION,
	                    'args': parts[2] ? parts[2].split(',') : [],
	                    'line': parts[4] ? +parts[4] : null,
	                    'column': parts[5] ? +parts[5] : null
	                };
	            } else {
	                continue;
	            }
	
	            if (!element.func && element.line) {
	                element.func = UNKNOWN_FUNCTION;
	            }
	
	            stack.push(element);
	        }
	
	        if (!stack.length) {
	            return null;
	        }
	
	        if (!stack[0].column && typeof ex.columnNumber !== 'undefined') {
	            // FireFox uses this awesome columnNumber property for its top frame
	            // Also note, Firefox's column number is 0-based and everything else expects 1-based,
	            // so adding 1
	            stack[0].column = ex.columnNumber + 1;
	        }
	
	        return {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref(),
	            'stack': stack
	        };
	    }
	
	    /**
	     * Adds information about the first frame to incomplete stack traces.
	     * Safari and IE require this to get complete data on the first frame.
	     * @param {Object.<string, *>} stackInfo Stack trace information from
	     * one of the compute* methods.
	     * @param {string} url The URL of the script that caused an error.
	     * @param {(number|string)} lineNo The line number of the script that
	     * caused an error.
	     * @param {string=} message The error generated by the browser, which
	     * hopefully contains the name of the object that caused the error.
	     * @return {boolean} Whether or not the stack information was
	     * augmented.
	     */
	    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
	        var initial = {
	            'url': url,
	            'line': lineNo
	        };
	
	        if (initial.url && initial.line) {
	            stackInfo.incomplete = false;
	
	            if (!initial.func) {
	                initial.func = UNKNOWN_FUNCTION;
	            }
	
	            if (stackInfo.stack.length > 0) {
	                if (stackInfo.stack[0].url === initial.url) {
	                    if (stackInfo.stack[0].line === initial.line) {
	                        return false; // already in stack trace
	                    } else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
	                        stackInfo.stack[0].line = initial.line;
	                        return false;
	                    }
	                }
	            }
	
	            stackInfo.stack.unshift(initial);
	            stackInfo.partial = true;
	            return true;
	        } else {
	            stackInfo.incomplete = true;
	        }
	
	        return false;
	    }
	
	    /**
	     * Computes stack trace information by walking the arguments.caller
	     * chain at the time the exception occurred. This will cause earlier
	     * frames to be missed but is the only way to get any stack trace in
	     * Safari and IE. The top frame is restored by
	     * {@link augmentStackTraceWithInitialElement}.
	     * @param {Error} ex
	     * @return {?Object.<string, *>} Stack trace information.
	     */
	    function computeStackTraceByWalkingCallerChain(ex, depth) {
	        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
	            stack = [],
	            funcs = {},
	            recursion = false,
	            parts,
	            item,
	            source;
	
	        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
	            if (curr === computeStackTrace || curr === TraceKit.report) {
	                // console.log('skipping internal function');
	                continue;
	            }
	
	            item = {
	                'url': null,
	                'func': UNKNOWN_FUNCTION,
	                'line': null,
	                'column': null
	            };
	
	            if (curr.name) {
	                item.func = curr.name;
	            } else if ((parts = functionName.exec(curr.toString()))) {
	                item.func = parts[1];
	            }
	
	            if (typeof item.func === 'undefined') {
	              try {
	                item.func = parts.input.substring(0, parts.input.indexOf('{'));
	              } catch (e) { }
	            }
	
	            if (funcs['' + curr]) {
	                recursion = true;
	            }else{
	                funcs['' + curr] = true;
	            }
	
	            stack.push(item);
	        }
	
	        if (depth) {
	            // console.log('depth is ' + depth);
	            // console.log('stack is ' + stack.length);
	            stack.splice(0, depth);
	        }
	
	        var result = {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref(),
	            'stack': stack
	        };
	        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
	        return result;
	    }
	
	    /**
	     * Computes a stack trace for an exception.
	     * @param {Error} ex
	     * @param {(string|number)=} depth
	     */
	    function computeStackTrace(ex, depth) {
	        var stack = null;
	        depth = (depth == null ? 0 : +depth);
	
	        try {
	            stack = computeStackTraceFromStackProp(ex);
	            if (stack) {
	                return stack;
	            }
	        } catch (e) {
	            if (TraceKit.debug) {
	                throw e;
	            }
	        }
	
	        try {
	            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
	            if (stack) {
	                return stack;
	            }
	        } catch (e) {
	            if (TraceKit.debug) {
	                throw e;
	            }
	        }
	
	        return {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref()
	        };
	    }
	
	    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
	    computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
	
	    return computeStackTrace;
	}());
	
	module.exports = TraceKit;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	function RavenConfigError(message) {
	    this.name = 'RavenConfigError';
	    this.message = message;
	}
	RavenConfigError.prototype = new Error();
	RavenConfigError.prototype.constructor = RavenConfigError;
	
	module.exports = RavenConfigError;


/***/ },
/* 30 */
/***/ function(module, exports) {

	exports = module.exports = stringify
	exports.getSerialize = serializer
	
	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}
	
	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = []
	
	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
	    if (stack[0] === value) return "[Circular ~]"
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  }
	
	  return function(key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this)
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
	    }
	    else stack.push(value)
	
	    return replacer == null ? value : replacer.call(this, key, value)
	  }
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	var wrapMethod = function(console, level, callback) {
	    var originalConsoleLevel = console[level];
	    var originalConsole = console;
	
	    if (!(level in console)) {
	        return;
	    }
	
	    var sentryLevel = level === 'warn'
	        ? 'warning'
	        : level;
	
	    console[level] = function () {
	        var args = [].slice.call(arguments);
	
	        var msg = '' + args.join(' ');
	        var data = {level: sentryLevel, logger: 'console', extra: {'arguments': args}};
	        callback && callback(msg, data);
	
	        // this fails for some browsers. :(
	        if (originalConsoleLevel) {
	            // IE9 doesn't allow calling apply on console functions directly
	            // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
	            Function.prototype.apply.call(
	                originalConsoleLevel,
	                originalConsole,
	                args
	            );
	        }
	    };
	};
	
	module.exports = {
	    wrapMethod: wrapMethod
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(33));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;
	
		    // Constants table
		    var T = [];
	
		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());
	
		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];
	
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
	
		            // Shortcuts
		            var H = this._hash.words;
	
		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];
	
		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
	
		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
	
		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
	
		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);
	
		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);
	
		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	
		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );
	
		            data.sigBytes = (dataWords.length + 1) * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;
	
		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];
	
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }
	
		            // Return final computed hash
		            return hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        }
		    });
	
		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));
	
	
		return CryptoJS.MD5;
	
	}));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory();
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	}(this, function () {
	
		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {};
	
		        return function (obj) {
		            var subtype;
	
		            F.prototype = obj;
	
		            subtype = new F();
	
		            F.prototype = null;
	
		            return subtype;
		        };
		    }())
	
		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};
	
		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};
	
		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {
	
	
		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);
	
		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }
	
		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }
	
		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;
	
		                // Reference supertype
		                subtype.$super = this;
	
		                return subtype;
		            },
	
		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);
	
		                return instance;
		            },
	
		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },
	
		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }
	
		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },
	
		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());
	
		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];
	
		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },
	
		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },
	
		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;
	
		            // Clamp excess bits
		            this.clamp();
	
		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;
	
		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },
	
		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);
	
		            return clone;
		        },
	
		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];
	
		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;
	
		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });
	
		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);
	
		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }
	
		            return new WordArray.init(words, nBytes);
		        }
		    });
	
		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};
	
		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }
	
		            return hexChars.join('');
		        },
	
		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }
	
		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };
	
		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }
	
		            return latin1Chars.join('');
		        },
	
		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }
	
		            return new WordArray.init(words, latin1StrLength);
		        }
		    };
	
		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },
	
		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };
	
		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },
	
		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }
	
		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },
	
		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;
	
		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }
	
		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;
	
		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
	
		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }
	
		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }
	
		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },
	
		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();
	
		            return clone;
		        },
	
		        _minBufferSize: 0
		    });
	
		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),
	
		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);
	
		            // Set initial values
		            this.reset();
		        },
	
		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);
	
		            // Perform concrete-hasher logic
		            this._doReset();
		        },
	
		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);
	
		            // Update the hash
		            this._process();
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }
	
		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();
	
		            return hash;
		        },
	
		        blockSize: 512/32,
	
		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },
	
		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });
	
		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};
	
		    return C;
		}(Math));
	
	
		return CryptoJS;
	
	}));

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmJkNjFkYzU4OGQ5Yjk5YTAwN2U/NDNjZCoqIiwid2VicGFjazovLy8uL2xpYi9DU0xvZ2dlci50cz9hYWRjKiIsIndlYnBhY2s6Ly8vLi9+L0FuaW1hdGlvbkZyYW1lL2xpYi9BbmltYXRpb25GcmFtZS50cz83OTdhKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlscy50cz9hYjNhKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbi50cz9hOWY0KiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbkVhc2luZy50cz83YWQ5KiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHM/ZjlhNCoiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNDb29raWUudHM/ZjhiOCoiLCJ3ZWJwYWNrOi8vLy4vfi91cmwvdXJsLmpzP2Q2YTQqIiwid2VicGFjazovLy8uL34vdXJsL34vcHVueWNvZGUvcHVueWNvZGUuanM/ODdkZSoiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcz9jM2MyKiIsIndlYnBhY2s6Ly8vLi9+L3VybC91dGlsLmpzPzU2ZWEqIiwid2VicGFjazovLy8uL34vcXVlcnlzdHJpbmcvaW5kZXguanM/ZmNlOCoiLCJ3ZWJwYWNrOi8vLy4vfi9xdWVyeXN0cmluZy9kZWNvZGUuanM/YzI1MCoiLCJ3ZWJwYWNrOi8vLy4vfi9xdWVyeXN0cmluZy9lbmNvZGUuanM/ZTg2YioiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNEb2N1bWVudC50cz9iYmZmKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc1dpbmRvdy50cz9lNjA1KiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0RPTS50cz8yYjg2KiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc01vdXNlLnRzP2VlNGQqIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzU2NyZWVuLnRzPzg0NGEqIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzU3lzdGVtLnRzPzRlOGYqIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzVXNlci50cz9lYWNiKiIsIndlYnBhY2s6Ly8vLi9+L3JhdmVuLWpzL3NyYy9zaW5nbGV0b24uanM/ZDQ5YSoiLCJ3ZWJwYWNrOi8vLy4vfi9yYXZlbi1qcy9zcmMvcmF2ZW4uanM/YWUwNioiLCJ3ZWJwYWNrOi8vLy4vfi9yYXZlbi1qcy92ZW5kb3IvVHJhY2VLaXQvdHJhY2VraXQuanM/MTUzYioiLCJ3ZWJwYWNrOi8vLy4vfi9yYXZlbi1qcy9zcmMvY29uZmlnRXJyb3IuanM/MGI1MSoiLCJ3ZWJwYWNrOi8vLy4vfi9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qcz9kOGMxKiIsIndlYnBhY2s6Ly8vLi9+L3JhdmVuLWpzL3NyYy9jb25zb2xlLmpzPzkzYTAqIiwid2VicGFjazovLy8uL34vY3J5cHRvLWpzL21kNS5qcz85ZDUyKiIsIndlYnBhY2s6Ly8vLi9+L2NyeXB0by1qcy9jb3JlLmpzPzBhY2UqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUVBOztBQUVBLHFHQUFvRyxtQkFBbUIsRUFBRSxt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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7OztBQ3RQQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxR0FBb0csbUJBQW1CLEVBQUUsbUJBQW1CLDhIQUE4SDs7QUFFMVE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUtBQW9LO0FBQ3BLOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7OztBQzFPQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Ysa0RBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1EOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJ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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNULDJKQUEwSjtBQUMxSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsMEI7Ozs7OztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Ysa0RBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFpQixVQUFVLGtEQUFrRCxXQUFXLGdCQUFnQiw4QkFBOEIsaURBQWlELCtCQUErQixXQUFXO0FBQ2pPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVELHdCOzs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUNoQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUErQztBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLE9BQU87QUFDdEIsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBdUc7O0FBRXZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWM7QUFDZDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxTQUFTO0FBQ3hCLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEIsZ0JBQWUsU0FBUztBQUN4QixnQkFBZSxTQUFTO0FBQ3hCLGlCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxNQUFNO0FBQ3JCLGdCQUFlLE9BQU87QUFDdEIsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxPQUFPO0FBQ3RCLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLHFEQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEIsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEIsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEIsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4QjtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixpQ0FBaUM7QUFDOUQ7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFNBQVM7QUFDeEI7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsaUNBQWlDO0FBQzlEOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLGlDQUFpQztBQUNoRTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLDBDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLGlCQUFpQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFvRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsRUFBRTtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdEQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBLHlDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsWUFBWTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0Esb0NBQW1DLGtCQUFrQjtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QixzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsMENBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjs7QUFFckI7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLGNBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7O0FBRUEsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSzs7QUFFTDtBQUNBO0FBQ0EscUJBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0EsZ0NBQStCLGlEQUFpRDtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixjQUFhO0FBQ2I7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7O0FBR0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwrQ0FBOEM7QUFDOUMsZ0RBQStDOztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0EsY0FBYTtBQUNiO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQW9CLCtDQUErQztBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDcENBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7O0FBRVY7QUFDQTtBQUNBLDZCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0Esc0JBQXFCLFVBQVU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFVOztBQUVWOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixPQUFPO0FBQzNCO0FBQ0Esc0JBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLE9BQU87QUFDM0I7QUFDQSxzQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7O0FBR0Y7O0FBRUEsRUFBQyxHIiwiZmlsZSI6Ii4vbGliL0NTTG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJDU0xvZ2dlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDU0xvZ2dlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJDU0xvZ2dlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YmQ2MWRjNTg4ZDliOTlhMDA3ZSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfQW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKFwiQW5pbWF0aW9uRnJhbWVcIik7XG5cbnZhciBfQW5pbWF0aW9uRnJhbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQW5pbWF0aW9uRnJhbWUpO1xuXG52YXIgX1V0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xuXG52YXIgX1V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzKTtcblxudmFyIF9yYXZlbkpzID0gcmVxdWlyZShcInJhdmVuLWpzXCIpO1xuXG52YXIgX3JhdmVuSnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmF2ZW5Kcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBNRDUgPSByZXF1aXJlKFwiY3J5cHRvLWpzL21kNVwiKTtcbi8qKlxuICogSW1wb3J0IEFuaW1hdGlvbiBmcmFtZVxuICovXG5cbnZhciByb290ID0gdm9pZCAwO1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByb290ID0gZ2xvYmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QgPSB7fTtcbiAgICB9XG59IGVsc2Uge1xuICAgIHJvb3QgPSB3aW5kb3c7XG59XG52YXIgU1RBVFVTRVMgPSB7XG4gICAgNjAwOiBcIlNvbWUgdW5jYXVnaHQgZXJyb3JcIixcbiAgICA1MDM6IFwiQXR0ZW1wdCByZWF0dGFjaCB0aGUgc2NyaXB0cyB0byB0aGUgbm9uLW9iamVjdFwiLFxuICAgIDUwMjogXCJCbG9jayBkb2Vzbid0IGV4aXN0XCIsXG4gICAgNTAxOiBcIkJhbm5lciBwbGFjZSBkb2Vzbid0IGV4aXN0XCIsXG4gICAgNTAwOiBcIlNvbWUgY2F1Z2h0IGVycm9yXCIsXG4gICAgNDAxOiBcIkRlcHJlY2F0ZWQgY2FsbFwiLFxuICAgIDQwMDogXCJTb21lIHdhcm5pbmdcIixcbiAgICAzMDA6IFwiU29tZSBpbmZvXCIsXG4gICAgMjAwOiBcIlNvbWUgbG9nXCIsXG4gICAgMTAxOiBcIkVudHJ5IHBvaW50XCIsXG4gICAgMTAwOiBcIlNvbWUgZGVidWdcIixcbiAgICAwOiBcIlNvbWV0aGluZ1wiXG59O1xuXG52YXIgQ1NMb2dnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ1NMb2dnZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDU0xvZ2dlcik7XG4gICAgfVxuXG4gICAgQ1NMb2dnZXIuaW5pdCA9IGZ1bmN0aW9uIGluaXQoc2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygc2V0dGluZ3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihzZXR0aW5ncykpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIENTTG9nZ2VyLnNldHRpbmdzW3Byb3BdID0gc2V0dGluZ3NbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgJiYgQ1NMb2dnZXIuc2V0dGluZ3Muc2VudHJ5VXJsKSB7XG4gICAgICAgICAgICBfcmF2ZW5KczIuZGVmYXVsdC5jb25maWcoQ1NMb2dnZXIuc2V0dGluZ3Muc2VudHJ5VXJsLCB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyOiBcIkNTTG9nZ2VyXCIsXG4gICAgICAgICAgICAgICAgcmVsZWFzZTogQ1NMb2dnZXIuc2V0dGluZ3MucHJvamVjdFZlcnNpb24sXG4gICAgICAgICAgICAgICAgZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WXG4gICAgICAgICAgICB9KS5pbnN0YWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENTTG9nZ2VyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTG9nIG1ldGhvZFxuICAgICAqIEBwYXJhbSBzdGF0dXNcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0aWVzXG4gICAgICovXG5cblxuICAgIENTTG9nZ2VyLmxvZyA9IGZ1bmN0aW9uIGxvZyhzdGF0dXMsIG1lc3NhZ2UsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0dXMgPT09IFwibnVtYmVyXCIgJiYgc3RhdHVzID4gMCAmJiB0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIiAmJiBtZXNzYWdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IHN0YXR1cyB8fCAxMDE7XG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBTVEFUVVNFU1tzdGF0dXNdIHx8IFwiXCI7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPj0gQ1NMb2dnZXIuc2V0dGluZ3MubWluTG9nZ2VyTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9nT2JqID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdE5hbWU6IENTTG9nZ2VyLnNldHRpbmdzLnByb2plY3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0VmVyc2lvbjogQ1NMb2dnZXIuc2V0dGluZ3MucHJvamVjdFZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrOiBfVXRpbHMyLmRlZmF1bHQuc3RhY2soKSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogX1V0aWxzMi5kZWZhdWx0LlVzZXIuZ2V0SW5mbygpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgQ1NMb2dnZXIuYXJyTG9nLnB1c2gobG9nT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIENTTG9nZ2VyLnN0YXR1c0xhdmVsID0gZnVuY3Rpb24gc3RhdHVzTGF2ZWwoc3RhdHVzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzID09PSBcIm51bWJlclwiICYmIHN0YXR1cyA+IDApIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImxvZ1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPj0gMzAwICYmIHN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImluZm9cIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDQwMCAmJiBzdGF0dXMgPCA1MDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ3YXJuaW5nXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlcnJvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiZGVidWdcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBDU0xvZ2dlci5zaG93TWVzc2FuZ2UgPSBmdW5jdGlvbiBzaG93TWVzc2FuZ2Uoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzID09PSBcIm51bWJlclwiICYmIHN0YXR1cyA+IDAgJiYgdHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiYgbWVzc2FnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FuZ2VMYXZlbCA9IENTTG9nZ2VyLnN0YXR1c0xhdmVsKHN0YXR1cyk7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih3aW5kb3cpKSA9PT0gXCJvYmplY3RcIiAmJiBfdHlwZW9mKHdpbmRvdy5EZWJ1ZykgPT09IFwib2JqZWN0XCIgJiYgX3R5cGVvZih3aW5kb3cuRGVidWcuY29uc29sZSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHdpbmRvdy5EZWJ1Zy5jb25zb2xlW21lc3NhbmdlTGF2ZWxdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuRGVidWcuY29uc29sZVttZXNzYW5nZUxhdmVsXShtZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih3aW5kb3cpKSA9PT0gXCJvYmplY3RcIiAmJiBfdHlwZW9mKHdpbmRvdy5DU0RlYnVnKSA9PT0gXCJvYmplY3RcIiAmJiBfdHlwZW9mKHdpbmRvdy5DU0RlYnVnLmNvbnNvbGUpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB3aW5kb3cuQ1NEZWJ1Zy5jb25zb2xlW21lc3NhbmdlTGF2ZWxdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuQ1NEZWJ1Zy5jb25zb2xlW21lc3NhbmdlTGF2ZWxdKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNvbnNvbGVbbWVzc2FuZ2VMYXZlbF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGVbbWVzc2FuZ2VMYXZlbF0obWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogTG9nIHNlbmQgd2F0Y2hlclxuICAgICAqL1xuXG5cbiAgICBDU0xvZ2dlci53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgICAgICBpZiAoQ1NMb2dnZXIuYXJyTG9nLmxlbmd0aCA+IDAgJiYgQ1NMb2dnZXIuYXJyTG9nLmxlbmd0aCA8IDEwMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gQ1NMb2dnZXIuYXJyTG9nLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBsID0gX3JlZjtcblxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGwpKTtcbiAgICAgICAgICAgICAgICB2YXIgdWlkID0gTUQ1KEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbC5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0TmFtZTogbC5wcm9qZWN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdFZlcnNpb246IGwucHJvamVjdFZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogbC5zdGF0dXNcbiAgICAgICAgICAgICAgICB9KSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoQ1NMb2dnZXIuYXJyU2VuZGVkLmluZGV4T2YodWlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgQ1NMb2dnZXIuYXJyU2VuZGVkLnB1c2godWlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiAmJiBDU0xvZ2dlci5zZXR0aW5ncy5zZW50cnlVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yYXZlbkpzMi5kZWZhdWx0LmNhcHR1cmVNZXNzYWdlKGwubWVzc2FnZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiBDU0xvZ2dlci5zdGF0dXNMYXZlbChsLnN0YXR1cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyOiBcIkNTTG9nZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmE6IGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiAmJiBDU0xvZ2dlci5zZXR0aW5ncy5sb2dnZXJVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLnNyYyA9IENTTG9nZ2VyLnNldHRpbmdzLmxvZ2dlclVybCArIFwiP3VpZD1cIiArIHVpZCArIFwiJmRhdGE9XCIgKyBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ1NMb2dnZXIuc2hvd01lc3NhbmdlKGwuc3RhdHVzLCBsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENTTG9nZ2VyLmFyckxvZyA9IFtdO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBDU0xvZ2dlcjtcbn0oKTtcblxuQ1NMb2dnZXIuZXZlbnRMaXN0ZW5lckFkZGVkID0gZmFsc2U7XG5DU0xvZ2dlci5hcnJMb2cgPSBbXTtcbkNTTG9nZ2VyLmFyclNlbmRlZCA9IFtdO1xuQ1NMb2dnZXIucHJvamVjdE5hbWUgPSBcIkNTTG9nZ2VyXCI7XG5DU0xvZ2dlci5wcm9qZWN0VmVyc2lvbiA9IFwiMS4wLjE4XCI7XG5DU0xvZ2dlci5zZXR0aW5ncyA9IHtcbiAgICBzZW50cnlVcmw6IFwiXCIsXG4gICAgbG9nZ2VyVXJsOiBcIlwiLFxuICAgIG1pbkxvZ2dlckxldmVsOiA1MDAsXG4gICAgcHJvamVjdE5hbWU6IFwiXCIsXG4gICAgcHJvamVjdFZlcnNpb246IFwiXCJcbn07XG4vKipcbiAqIEFkZCBsb2dnZXIgdG8gZ2xvYmFsIGVycm9yIGV2ZW50XG4gKi9cbmlmICghcm9vdC5ldmVudExpc3RlbmVyQWRkZWQpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXJyb3JIYW5kbGVyID0gcm9vdC5vbmVycm9yO1xuICAgICAgICByb290Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JNc2csIHVybCwgbGluZU51bWJlciwgY29sdW1uLCBlcnJvck9iaikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcihlcnJvck1zZywgdXJsLCBsaW5lTnVtYmVyLCBjb2x1bW4sIGVycm9yT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENTTG9nZ2VyLmxvZyg2MDAsIGVycm9yTXNnLCB7XG4gICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICAgICAgICAgICAgZXJyb3JPYmo6IGVycm9yT2JqLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IGxpbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByb290LmV2ZW50TGlzdGVuZXJBZGRlZCA9IHRydWU7XG4gICAgfSkoKTtcbn1cbi8qKlxuICogU3Vic2NyaWJlIGxvZ2dlciB0byB3YXRjaGVyXG4gKi9cbl9BbmltYXRpb25GcmFtZTIuZGVmYXVsdC5zdWJzY3JpYmUoe30sIENTTG9nZ2VyLndhdGNoLCBbXSk7XG4vKipcbiAqIFJldHVybiBsb2dnZXJcbiAqL1xudmFyIF9Jbml0ID0gQ1NMb2dnZXIuaW5pdDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9Jbml0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9Jbml0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL0NTTG9nZ2VyLnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcm9vdCA9IHZvaWQgMDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcm9vdCA9IGdsb2JhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290ID0ge307XG4gICAgfVxufSBlbHNlIHtcbiAgICByb290ID0gd2luZG93O1xufVxuLyoqXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcbiAqL1xucm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIChyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJvb3Quc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xufSgpO1xuLyoqXG4gKiBCaW5kIHBvbHlmaWxsXG4gKi9cbmZ1bmN0aW9uIGJpbmQoYikge1xuICAgIC8qKlxuICAgICAqIElmIHRyeSBiaW5kIHZhcmlhYmxlIHRoYXQgbm90IGEgZnVuY3Rpb24sIHRoZW4gdGhyb3cgZXJyb3JcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxldCBBcnJheSBzbGljZSBmdW5jdGlvblxuICAgICAqL1xuICAgIHZhciBhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGUgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICBpZiAoXG4gICAgICAgICB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgKSB7XG4gICAgICAgICByb290LmNvbnNvbGUubG9nKFwiQmluZCBwb2x5ZmlsbFwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoKSB7XG4gICAgICAgIHJldHVybiBlLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBjID8gdGhpcyA6IGIgfHwgcm9vdCwgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJlZCB0aGlzIHByb3RvdHlwZSBhcyBwcm90b3R5cGUgdG8gYmluZCBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBjLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIGQucHJvdG90eXBlID0gbmV3IGMoKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYmluZCBwb2x5ZmlsbFxuICAgICAqL1xuICAgIHJldHVybiBkO1xufVxuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBiaW5kO1xuLyoqXG4gKiBPYmplY3Qua2V5cyBwb2x5ZmlsbFxuICovXG5mdW5jdGlvbiBrZXlzKCkge1xuICAgIHZhciBoYXNEb05vdEVudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIik7XG4gICAgdmFyIGRvTm90RW51bXMgPSBbXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwidmFsdWVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgdmFyIGRvTm90RW51bXNMZW5ndGggPSBkb05vdEVudW1zLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSAhPT0gXCJvYmplY3RcIiAmJiAodHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRG9Ob3RFbnVtQnVnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvTm90RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb05vdEVudW1zW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkb05vdEVudW1zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuT2JqZWN0LmtleXMgPSBPYmplY3Qua2V5cyB8fCBrZXlzKCk7XG4vKipcbiAqIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIGNhbGwgc3RhY2sgY2xhc3NcbiAqL1xuXG52YXIgQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZWQgbWV0aG9kc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGFjayA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdhdGNoZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIG1ldGhvZCB0byB3YXRjaFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSBJRFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogcm9vdDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICAgIHZhciBJRCA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29udGV4dCBhbmQgY2FsbGJhY2sgcGFzc2VkIGFuZCB0aGV5IGFyZSBvYmplY3QgYW5kIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29udGV4dCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmICh0eXBlb2YgcGFyYW1zID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocGFyYW1zKSkgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMpICYmIChJRCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIFVJRFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgbG9jYWxJRCA9IElEIHx8IFwieC1cIiArIGQuZ2V0VGltZSgpICsgXCItXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTYpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbWV0aG9kIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnN0YWNrW2xvY2FsSURdID0ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcml0ZSB0byBjb25zb2xlIGNvdW50IG9mIHRoZSBzdWJzY3JpYmVkIG1ldGhvZHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gVUlEXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBsb2NhbElEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBtZXRob2QgYnkgSURcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKi9cblxuXG4gICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoSUQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiByZXF1aXJlZCBtZXRob2QgZXhpc3QgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW0lEXSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE51bGxpZnkgbWV0aG9kIGluIHRoZSBzdGFjayBhbmQgZGVzdHJveSBpdFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbSURdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBXYXRjaCBhbmQgY2FsbCBtZXRob2RzXG4gICAgICovXG5cblxuICAgIEFuaW1hdGlvbkZyYW1lLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzdGFjayBleGlzdCwgaXQgaXMgYW4gb2JqZWN0IGFuZCBpdCBpcyBjb250YWlucyBtZXRob2RzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrICYmIF90eXBlb2YodGhpcy5zdGFjaykgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXModGhpcy5zdGFjaykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExvb3AgYWxsIG1ldGhvZHMgaW4gc3RhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBJRCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBQcm9jZXNzIG9ubHkgbWV0aG9kcyB3aXRob3V0IGV4dGVuZGVkIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmhhc093blByb3BlcnR5KElEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBJRCBleGlzdCBhbmQgaXQgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSUQgJiYgdHlwZW9mIElEID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBHZXQgc3Vic2NyaWJlZCBtZXRob2QgcGFyYW1zIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqQ2FsbCA9IHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgcGFyYW1zIGV4aXN0LCBpdCBpcyBhbiBvYmplY3QsIGFuZCBpdCBpcyBjb250YWlucyBjYWxsIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGxiYWNrLCBhbmQgcGFyYW1ldGVycyB3aGljaCBpcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iakNhbGwgJiYgKHR5cGVvZiBvYmpDYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqQ2FsbCkpID09PSBcIm9iamVjdFwiICYmIG9iakNhbGwuY29udGV4dCAmJiBvYmpDYWxsLmNhbGxiYWNrICYmIG9iakNhbGwucGFyYW1zICYmIF90eXBlb2Yob2JqQ2FsbC5jb250ZXh0KSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqQ2FsbC5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIEFycmF5LmlzQXJyYXkob2JqQ2FsbC5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENhbGwgc3Vic2NyaWJlZCBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ2FsbC5jYWxsYmFjay5hcHBseShvYmpDYWxsLmNvbnRleHQsIG9iakNhbGwucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNhbGwgd2F0Y2hlclxuICAgICAgICAgKi9cbiAgICAgICAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy53YXRjaC5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFuaW1hdGlvbkZyYW1lO1xufSgpO1xuLyoqXG4gKiBDcmVhdGUgc2luZ2xlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIG9iamVjdFxuICogQHR5cGUge0FuaW1hdGlvbkZyYW1lfVxuICovXG5cblxucm9vdC5BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWUgfHwgbmV3IEFuaW1hdGlvbkZyYW1lKCk7XG4vKipcbiAqIEV4cG9ydCBzaW5nbGUgQW5pbWF0aW9uRnJhbWUgaW5zdGFuY2VcbiAqL1xudmFyIF9BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWU7XG5leHBvcnRzLmRlZmF1bHQgPSBfQW5pbWF0aW9uRnJhbWU7XG5cbm1vZHVsZS5leHBvcnRzID0gX0FuaW1hdGlvbkZyYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9BbmltYXRpb25GcmFtZS9saWIvQW5pbWF0aW9uRnJhbWUudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgc3ViY2xhc3Nlc1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbiA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uKTtcblxudmFyIF9VdGlsc0Jyb3dzZXIgPSByZXF1aXJlKFwiLi9VdGlsc0Jyb3dzZXJcIik7XG5cbnZhciBfVXRpbHNCcm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQnJvd3Nlcik7XG5cbnZhciBfVXRpbHNDb29raWUgPSByZXF1aXJlKFwiLi9VdGlsc0Nvb2tpZVwiKTtcblxudmFyIF9VdGlsc0Nvb2tpZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Nvb2tpZSk7XG5cbnZhciBfVXRpbHNEb2N1bWVudCA9IHJlcXVpcmUoXCIuL1V0aWxzRG9jdW1lbnRcIik7XG5cbnZhciBfVXRpbHNEb2N1bWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RvY3VtZW50KTtcblxudmFyIF9VdGlsc0RPTSA9IHJlcXVpcmUoXCIuL1V0aWxzRE9NXCIpO1xuXG52YXIgX1V0aWxzRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRE9NKTtcblxudmFyIF9VdGlsc01vdXNlID0gcmVxdWlyZShcIi4vVXRpbHNNb3VzZVwiKTtcblxudmFyIF9VdGlsc01vdXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzTW91c2UpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG52YXIgX1V0aWxzVXNlciA9IHJlcXVpcmUoXCIuL1V0aWxzVXNlclwiKTtcblxudmFyIF9VdGlsc1VzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNVc2VyKTtcblxudmFyIF9VdGlsc1dpbmRvdyA9IHJlcXVpcmUoXCIuL1V0aWxzV2luZG93XCIpO1xuXG52YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBHbG9iYWwgVXRpbHMgY2xhc3NcbiAqL1xudmFyIFV0aWxzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXRpbHMpO1xuICAgIH1cblxuICAgIFV0aWxzLndhcm4gPSBmdW5jdGlvbiB3YXJuKG1lc3NhbmdlKSB7XG4gICAgICAgIGlmICgodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUud2FybihtZXNzYW5nZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhbmdlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWVzc2FuZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgVXRpbHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgVXRpbHMuRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2QuXG4gICAgICovXG5cblxuICAgIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIFV0aWxzLndhcm4oXCJVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cIik7XG4gICAgICAgIHJldHVybiBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGRvbU5vZGUsIGRvbURvY3VtZW50LCBzaG93Rm9yY2UpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBVdGlscy5maW5kRWxlbWVudFBvc2l0aW9uIG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgVXRpbHMuRE9NLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kLlxuICAgICAqL1xuICAgIFV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiBmaW5kRWxlbWVudFBvc2l0aW9uKGRvbU5vZGUpIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIHNob3dGb3JjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgVXRpbHMud2FybihcIlV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuICAgICAgICByZXR1cm4gVXRpbHMuRE9NLmZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSwgZG9tRG9jdW1lbnQsIHNob3dGb3JjZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2ZlciBzdGF0aWMgbWV0aG9kcyBpbnRvIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gcmVhbE9iamVjdFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cblxuXG4gICAgVXRpbHMuaW1wbGVtZW50YXRpb25TdGF0aWNNZXRob2RzID0gZnVuY3Rpb24gaW1wbGVtZW50YXRpb25TdGF0aWNNZXRob2RzKHJlYWxPYmplY3QsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoISFyZWFsT2JqZWN0ICYmICh0eXBlb2YgcmVhbE9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHJlYWxPYmplY3QpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGljQ2xhc3MgPSByZWFsT2JqZWN0LmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGljQ2xhc3MgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kcyA9IE9iamVjdC5rZXlzKHN0YXRpY0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZHMgJiYgbWV0aG9kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFsT2JqZWN0W21ldGhvZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhbE9iamVjdFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLndhcm4oXCJUaGF0IG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgXCIgKyAoY2xhc3NOYW1lIHx8IHN0YXRpY0NsYXNzICYmIHN0YXRpY0NsYXNzLm5hbWUgfHwgXCJVbmtub3duXCIpICsgXCIuXCIgKyBtZXRob2QgKyBcIiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRpY0NsYXNzW21ldGhvZF0uYXBwbHkoc3RhdGljQ2xhc3MsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gbWV0aG9kcywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmV0MiA9IF9sb29wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3JldDIgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgY2FsbCBzdGFjayB0cmFjZVxuICAgICAqIEByZXR1cm4gQXJyYXk8T2JqZWN0PlxuICAgICAqL1xuXG5cbiAgICBVdGlscy5zdGFjayA9IGZ1bmN0aW9uIHN0YWNrKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcigpO1xuICAgICAgICByZXR1cm4gZSAmJiBlLnN0YWNrICYmIGUuc3RhY2suc3BsaXQoXCJcXG5cIikuc2xpY2UoNSkubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXiguKilAKC4qKVxcLmpzOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gLyhbXlxcLzxdKykvaWcuZXhlYyhtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPSBtYXRjaFsxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoaHR0cHxodHRwcyk6KFteOl0rKTooWzAtOV0rKTooWzAtOV0rKSQvaWcuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbNV0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbM10gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbNF0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFsxXSArIFwiOlwiICsgbWF0Y2hbMl0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoLiopOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyhbXihdKylcXHNcXCgoLiopOihbMC05XSspOihbMC05XSspXFwpJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyguKik6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzFdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSkgfHwgW107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgcmFuZG9tIElEXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBVdGlscy5nZXRVSUQgPSBmdW5jdGlvbiBnZXRVSUQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMik7XG4gICAgfTtcblxuICAgIHJldHVybiBVdGlscztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXRpbHM7XG5cblV0aWxzLkFuaW1hdGlvbiA9IF9VdGlsc0FuaW1hdGlvbjIuZGVmYXVsdDtcblV0aWxzLkJyb3dzZXIgPSBfVXRpbHNCcm93c2VyMi5kZWZhdWx0O1xuVXRpbHMuQ29va2llID0gX1V0aWxzQ29va2llMi5kZWZhdWx0O1xuVXRpbHMuRE9NID0gX1V0aWxzRE9NMi5kZWZhdWx0O1xuVXRpbHMuRG9jdW1lbnQgPSBfVXRpbHNEb2N1bWVudDIuZGVmYXVsdDtcblV0aWxzLk1vdXNlID0gX1V0aWxzTW91c2UyLmRlZmF1bHQ7XG5VdGlscy5TY3JlZW4gPSBfVXRpbHNTY3JlZW4yLmRlZmF1bHQ7XG5VdGlscy5TeXN0ZW0gPSBfVXRpbHNTeXN0ZW0yLmRlZmF1bHQ7XG5VdGlscy5Vc2VyID0gX1V0aWxzVXNlcjIuZGVmYXVsdDtcblV0aWxzLldpbmRvdyA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gVXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlscy50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEltcG9ydCBzdWJjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbkVhc2luZyA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uRWFzaW5nXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uRWFzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uRWFzaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEFuaW1hdGlvbiA9IGZ1bmN0aW9uIEFuaW1hdGlvbigpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFuaW1hdGlvbik7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBbmltYXRpb247XG5cbkFuaW1hdGlvbi5FYXNpbmcgPSBfVXRpbHNBbmltYXRpb25FYXNpbmcyLmRlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbi50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIERpZmZlcmVudCB0aW1lIGFuaW1hdGlvbiBmdW5jdGlvbnNcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRWFzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVhc2luZygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVhc2luZyk7XG4gICAgfVxuXG4gICAgRWFzaW5nLmlzVmFsaWRQYXJhbXMgPSBmdW5jdGlvbiBpc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBiID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBjID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBkID09PSBcIm51bWJlclwiICYmICh0eXBlb2YgcyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcyA9PT0gXCJudW1iZXJcIikgJiYgdCA8IGQ7XG4gICAgfTtcblxuICAgIEVhc2luZy5zd2luZyA9IGZ1bmN0aW9uIHN3aW5nKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nW0Vhc2luZy5kZWZdKHQsIGIsIGMsIGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluUXVhZCA9IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWFkID0gZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWFkID0gZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5DdWJpYyA9IGZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEN1YmljID0gZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEN1YmljID0gZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluUXVhcnQgPSBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0UXVhcnQgPSBmdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWFydCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblF1aW50ID0gZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWludCA9IGZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dFF1aW50ID0gZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblNpbmUgPSBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYyArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0U2luZSA9IGZ1bmN0aW9uIGVhc2VPdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0U2luZSA9IGZ1bmN0aW9uIGVhc2VJbk91dFNpbmUodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkV4cG8gPSBmdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMCA/IGIgOiBjICogTWF0aC5wb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEV4cG8gPSBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEV4cG8gPSBmdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQgPT09IGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQ2lyYyA9IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqIChNYXRoLnNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0Q2lyYyA9IGZ1bmN0aW9uIGVhc2VPdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0Q2lyYyA9IGZ1bmN0aW9uIGVhc2VJbk91dENpcmModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5FbGFzdGljID0gZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSBjO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgICAgIHAgPSBkICogLjM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0oYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRFbGFzdGljID0gZnVuY3Rpb24gZWFzZU91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gYztcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgICAgICBwID0gZCAqIC4zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGMgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0RWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gYztcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICAgICAgcCA9IGQgKiAoLjMgKiAxLjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0IDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQmFjayA9IGZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcykge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCwgcykpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEJhY2sgPSBmdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkLCBzKSkge1xuICAgICAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0QmFjayA9IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCwgcykpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5Cb3VuY2UgPSBmdW5jdGlvbiBlYXNlSW5Cb3VuY2UodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC0gRWFzaW5nLmVhc2VPdXRCb3VuY2UoZCAtIHQsIDAsIGMsIGQpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRCb3VuY2UgPSBmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIC43NSkgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSkgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEJvdW5jZSA9IGZ1bmN0aW9uIGVhc2VJbk91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBFYXNpbmcuZWFzZUluQm91bmNlKHQgKiAyLCAwLCBjLCBkKSAqIC41ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBFYXNpbmcuZWFzZU91dEJvdW5jZSh0ICogMiAtIGQsIDAsIGMsIGQpICogLjUgKyBjICogLjUgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRWFzaW5nO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFYXNpbmc7XG5cbkVhc2luZy5kZWYgPSBcImVhc2VPdXRRdWFkXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbkVhc2luZy50c1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggYnJvd3NlclxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBCcm93c2VyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyb3dzZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCcm93c2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYnJvd3NlciBpbmZvXG4gICAgICogQHJldHVybiB7e2Jyb3dzZXI6IHN0cmluZywgbW9iaWxlOiBib29sZWFuLCB2ZXJzaW9uOiBzdHJpbmd9fVxuICAgICAqL1xuICAgIEJyb3dzZXIuZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBicm93c2VyOiBCcm93c2VyLmdldE5hbWUoKSxcbiAgICAgICAgICAgIG1vYmlsZTogQnJvd3Nlci5pc01vYmlsZSgpLFxuICAgICAgICAgICAgdmVyc2lvbjogQnJvd3Nlci5nZXRWZXJzaW9uKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBicm93c2VyIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0TmFtZSA9IGZ1bmN0aW9uIGdldE5hbWUoKSB7XG4gICAgICAgIHZhciBicm93c2VyID0gdm9pZCAwO1xuICAgICAgICBpZiAoQnJvd3Nlci5pc09wZXJhKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIk9wZXJhXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc09wZXJhTmV3KCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIk9wZXJhXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUUoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUVOZXcoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0Nocm9tZSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJDaHJvbWVcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzRmlyZWZveCgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJGaXJlZm94XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc1NhZmFyaSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJTYWZhcmlcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3RoZXIoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IEJyb3dzZXIuZ2V0T3RoZXJOYW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldFZlcnNpb24gPSBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IHZvaWQgMDtcbiAgICAgICAgaWYgKEJyb3dzZXIuaXNPcGVyYSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPcGVyYVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3BlcmFOZXcoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0T3BlcmFOZXdWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUUoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRU5ldygpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNDaHJvbWUoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0Q2hyb21lVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNGaXJlZm94KCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldEZpcmVmb3hWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc1NhZmFyaSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRTYWZhcmlWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc090aGVyKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE90aGVyVmVyc2lvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJpbSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcGFyYW0gdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci50cmltVmVyc2lvbiA9IGZ1bmN0aW9uIHRyaW1WZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBbXCI7XCIsIFwiIFwiLCBcIilcIl07XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBjaGFycywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY2hhciA9IF9yZWY7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXggPSB2ZXJzaW9uLmluZGV4T2YoY2hhcik7XG4gICAgICAgICAgICAgICAgaWYgKGl4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG1vYmlsZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNb2JpbGUgPSBmdW5jdGlvbiBpc01vYmlsZSgpIHtcbiAgICAgICAgcmV0dXJuICgvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pXG4gICAgICAgICk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc09wZXJhID0gZnVuY3Rpb24gaXNPcGVyYSgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvcGVyYSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3BlcmFWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3BlcmFWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG4gICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBuZXcgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNPcGVyYU5ldyA9IGZ1bmN0aW9uIGlzT3BlcmFOZXcoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPUFJcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG9wZXJhIG5ldyBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3BlcmFOZXdWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3BlcmFOZXdWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT1BSXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG1zaWUgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNU0lFID0gZnVuY3Rpb24gaXNNU0lFKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbXNpZSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24gPSBmdW5jdGlvbiBnZXRNU0lFVmVyc2lvbigpIHtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbXNpZSBuZXcgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNU0lFTmV3ID0gZnVuY3Rpb24gaXNNU0lFTmV3KCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVHJpZGVudC9cIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG1zaWUgbmV3IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVOZXdWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcInJ2OlwiKSArIDMpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIGNocm9tZSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0Nocm9tZSA9IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBjaHJvbWUgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldENocm9tZVZlcnNpb24gPSBmdW5jdGlvbiBnZXRDaHJvbWVWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIHNhZmFyaSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1NhZmFyaSA9IGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9PSAtMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgPT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNhZmFyaSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0U2FmYXJpVmVyc2lvbiA9IGZ1bmN0aW9uIGdldFNhZmFyaVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG4gICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBmaXJlZm94IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzRmlyZWZveCA9IGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGZpcmVmb3ggYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldEZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24gZ2V0RmlyZWZveFZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG90aGVyIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzT3RoZXIgPSBmdW5jdGlvbiBpc090aGVyKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICByZXR1cm4gbmFtZU9mZnNldCA8IHZlck9mZnNldDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvdGhlciBicm93c2VyIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3RoZXJOYW1lID0gZnVuY3Rpb24gZ2V0T3RoZXJOYW1lKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICB2YXIgYnJvd3NlciA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG90aGVyIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPdGhlclZlcnNpb24gPSBmdW5jdGlvbiBnZXRPdGhlclZlcnNpb24oKSB7XG4gICAgICAgIHZhciBuYW1lT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIiBcIikgKyAxO1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYnJvd3NlciBzdXBwb3J0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gIUJyb3dzZXIuaXNNU0lFKCkgfHwgcGFyc2VJbnQoQnJvd3Nlci5nZXRNU0lFVmVyc2lvbigpLCAxMCkgPiA4O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgV2ViS2l0IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzV2ViS2l0ID0gZnVuY3Rpb24gaXNXZWJLaXQoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJBcHBsZVdlYktpdC9cIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgR2Vja28gYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNHZWNrbyA9IGZ1bmN0aW9uIGlzR2Vja28oKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJHZWNrb1wiKSA+IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIktIVE1MXCIpID09PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIEFuZHJvaWQgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNBbmRyb2lkID0gZnVuY3Rpb24gaXNBbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQW5kcm9pZFwiKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgTGludXggYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNMaW51eCA9IGZ1bmN0aW9uIGlzTGludXgoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJMaW51eFwiKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgaVBhZCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1RhYmxldFBDID0gZnVuY3Rpb24gaXNUYWJsZXRQQygpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcImlQYWRcIikgPiAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJyb3dzZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJyb3dzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVVJMID0gcmVxdWlyZShcInVybFwiKTtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBjb29raWVcbiAqL1xuXG52YXIgQ29va2llID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvb2tpZSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvb2tpZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIENvb2tpZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGRvY3VtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGRvY3VtZW50LmNvb2tpZSA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2Qgc2V0cyB0aGUgdmFsdWUgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBoYXMgYmVlbiBzZXRcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gZXhwaXJlcyB7bnVtYmVyfVxuICAgICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIGRvbWFpbiB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBzZWN1cmUge2Jvb2xlYW59XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQ29va2llLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMl07XG4gICAgICAgIHZhciBleHBpcmVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAzMDtcbiAgICAgICAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IFwiL1wiO1xuICAgICAgICB2YXIgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgICAgdmFyIHNlY3VyZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA2ICYmIGFyZ3VtZW50c1s2XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzZdIDogbG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiBDb29raWUucmVnVmFsaWRLZXkudGVzdChrZXkpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAodmFsdWUgPT09IFwiXCIgfHwgQ29va2llLnJlZ1ZhbGlkS2V5LnRlc3QodmFsdWUpKSAmJiB0eXBlb2YgZXhwaXJlcyA9PT0gXCJudW1iZXJcIiAmJiBleHBpcmVzIDwgMzY1ICYmIHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkb21haW4gPT09IFwic3RyaW5nXCIgJiYgZG9tYWluLmluZGV4T2YobG9jYXRpb24uaG9zdG5hbWUpICE9PSAtMSAmJiB0eXBlb2Ygc2VjdXJlID09PSBcImJvb2xlYW5cIiAmJiBzZWN1cmUgPT09IChsb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIikpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIHUgPSBVUkwucGFyc2UoXCJodHRwOi8vXCIgKyBkb21haW4gKyBwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAodS5ob3N0bmFtZSA9PT0gZG9tYWluIHx8IHUucGF0aCA9PT0gcGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIFNhdmUgY29va2llcyBmb3IgMzAgZGF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge0RhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIGV4cGlyZXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBkYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEVuY29kZSB2YWx1ZSBmb3Igc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogV3JpdGluZyB2YWx1ZSB0byB0aGUgZG9jdW1lbnQgY29va2llIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAgICovXG5cblxuICAgIENvb2tpZS5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIENvb2tpZS5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIGNvb2tpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFyckNvb2tpZSwgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgaXQgaXMgY29ycmVjdCBjb29raWUga2V5IHJldHVybiB0aGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbMF0gPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIElmIHRoZSB2YWx1ZSB3YXMgZm91bmQgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodlsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIHRoZSB2YWx1ZSB3YXMgbm90IGZvdW5kIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIENvb2tpZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIENvb2tpZS5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBTZXQgZW1wdHkgb3ZlcmR1ZSB2YWx1ZSBieSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIENvb2tpZS5zZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5LCBcIlwiLCAtMSAqIDI0ICogNjAgKiA2MCk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb29raWUuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHJpbmcgb2YgYXZhaWxhYmxlIGtleXNcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cblxuXG4gICAgQ29va2llLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGFycmF5IG9mIGF2YWlsYWJsZSBrZXlzXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnJLZXlzID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIGNvb2tpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJDb29raWUsIF9pc0FycmF5MiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMiksIF9pMiA9IDAsIF9pdGVyYXRvcjIgPSBfaXNBcnJheTIgPyBfaXRlcmF0b3IyIDogX2l0ZXJhdG9yMltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBfaXRlcmF0b3IyW19pMisrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pMi5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogQWRkIGtleSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodlswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycktleXMucHVzaCh2WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyS2V5cztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIENvb2tpZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyS2V5cyA9IENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJLZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gYXJyS2V5cywgX2lzQXJyYXkzID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IzKSwgX2kzID0gMCwgX2l0ZXJhdG9yMyA9IF9pc0FycmF5MyA/IF9pdGVyYXRvcjMgOiBfaXRlcmF0b3IzW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5Mykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaTMgPSBfaXRlcmF0b3IzLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pMy5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjMgPSBfaTMudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvb2tpZS5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBDb29raWU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvb2tpZTtcblxuQ29va2llLnJlZ1ZhbGlkS2V5ID0gbmV3IFJlZ0V4cChcIihbYS16QS1aMC05Xy1dezEsfSlcIiwgXCJpXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNDb29raWUudHNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwvdXJsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS4zLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsL34vcHVueWNvZGUvcHVueWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwvdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcXVlcnlzdHJpbmcvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfVXRpbHNXaW5kb3cgPSByZXF1aXJlKFwiLi9VdGlsc1dpbmRvd1wiKTtcblxudmFyIF9VdGlsc1dpbmRvdzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1dpbmRvdyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBkb2N1bWVudFxuICovXG52YXIgRG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEb2N1bWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IGhlaWdodFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgRG9jdW1lbnQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gZ2V0SGVpZ2h0KCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgdG9wIHNjcm9sbFxuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbFRvcCA9IGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5wYWdlWU9mZnNldCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5ICYmIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBkb2N1bWVudCBsZWZ0IHNjcm9sbFxuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbExlZnQgPSBmdW5jdGlvbiBnZXRTY3JvbGxMZWZ0KCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqV2luZG93LnBhZ2VYT2Zmc2V0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5ICYmIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgc2Nyb2xsc1xuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHt7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbCA9IGZ1bmN0aW9uIGdldFNjcm9sbCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBEb2N1bWVudC5nZXRTY3JvbGxMZWZ0KG9ialdpbmRvdyksXG4gICAgICAgICAgICAgICAgdG9wOiBEb2N1bWVudC5nZXRTY3JvbGxUb3Aob2JqV2luZG93KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGVmdDogTmFOLFxuICAgICAgICAgICAgICAgIHRvcDogTmFOXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBEb2N1bWVudDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRG9jdW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0RvY3VtZW50LnRzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggd2luZG93XG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgV2luZG93ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdpbmRvdygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpbmRvdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgd2luZG93XG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgV2luZG93LmlzV2luZG93ID0gZnVuY3Rpb24gaXNXaW5kb3cob2JqV2luZG93KSB7XG4gICAgICAgIHJldHVybiBvYmpXaW5kb3cgJiYgKHR5cGVvZiBvYmpXaW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmpXaW5kb3cpKSA9PT0gXCJvYmplY3RcIiAmJiBvYmpXaW5kb3cuZG9jdW1lbnQgJiYgX3R5cGVvZihvYmpXaW5kb3cuZG9jdW1lbnQpID09PSBcIm9iamVjdFwiO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHdpbmRvdyBoZWlnaHRcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBXaW5kb3cuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gZ2V0SGVpZ2h0KCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKFdpbmRvdy5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqV2luZG93LmlubmVySGVpZ2h0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB3aW5kb3cgd2lkdGhcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBXaW5kb3cuZ2V0V2lkdGggPSBmdW5jdGlvbiBnZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChXaW5kb3cuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5pbm5lcldpZHRoIHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgd2luZG93IHNpemVzXG4gICAgICogQHJldHVybiB7e2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldFNpemVzID0gZnVuY3Rpb24gZ2V0U2l6ZXMoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBXaW5kb3cuZ2V0SGVpZ2h0KG9ialdpbmRvdyksXG4gICAgICAgICAgICB3aWR0aDogV2luZG93LmdldFdpZHRoKG9ialdpbmRvdylcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFdpbmRvdztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gV2luZG93O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNXaW5kb3cudHNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX1V0aWxzID0gcmVxdWlyZShcIi4vVXRpbHNcIik7XG5cbnZhciBfVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggRE9NXG4gKi9cbnZhciBET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRE9NKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRE9NKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB2YXJpYWJsZSBpcyBkb20gZG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIERPTS5pc0RPTURvY3VtZW50ID0gZnVuY3Rpb24gaXNET01Eb2N1bWVudChkb21Eb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gISghZG9tRG9jdW1lbnQgfHwgdHlwZW9mIGRvbURvY3VtZW50ID09PSBcImJvb2xlYW5cIiB8fCB0eXBlb2YgZG9tRG9jdW1lbnQgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIGRvbURvY3VtZW50ID09PSBcInN0cmluZ1wiIHx8IGRvbURvY3VtZW50Lm5vZGVUeXBlICE9PSA5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZpbmQgYW5kIHZhbGlkYXRlIE5vZGUgaW4gRE9NIERvY3VtZW50XG4gICAgICogQHBhcmFtIGRvbU5vZGVcbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50IHwgYm9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgRE9NLmdldERPTU5vZGUgPSBmdW5jdGlvbiBnZXRET01Ob2RlKGRvbU5vZGUpIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgZG9tRG9jdW1lbnQgaXMgYSB2YWxpZCB2YXJpYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFET00uaXNET01Eb2N1bWVudChkb21Eb2N1bWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgZG9tTm9kZSBpcyBhIHZhbGlkIHZhcmlhYmxlXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWRvbU5vZGUgfHwgdHlwZW9mIGRvbU5vZGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiBkb21Ob2RlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkb21Ob2RlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGRvbU5vZGUgaXMgYSBzdHJpbmcgaXQgbWlnaHQgYmUgYW4gSURcbiAgICAgICAgICovXG4gICAgICAgIGlmICh0eXBlb2YgZG9tTm9kZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZG9tTm9kZSA9IGRvbURvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvbU5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBkb21Ob2RlIGlzIGEgdmFsaWQgdmFyaWFibGVcbiAgICAgICAgICovXG4gICAgICAgIGlmICghZG9tTm9kZSB8fCBkb21Ob2RlLm5vZGVUeXBlICE9PSAxIHx8ICFkb21Ob2RlLnBhcmVudE5vZGUgfHwgZG9tTm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSBcIkhUTUxcIiB8fCBkb21Eb2N1bWVudC5jb250YWlucyAmJiAhZG9tRG9jdW1lbnQuY29udGFpbnMoZG9tTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9tTm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBlbGVtZW50IHNpemVzIGFuZCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSBkb21Ob2RlXG4gICAgICogQHBhcmFtIGRvbURvY3VtZW50XG4gICAgICogQHBhcmFtIHNob3dGb3JjZVxuICAgICAqIEByZXR1cm4ge3tib3R0b206IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID0gZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGRvbU5vZGUpIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIHNob3dGb3JjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSByZXN1bHQgc2l6ZSBhbmQgcG9zaXRpb24gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgb2JqUmV0ID0ge1xuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgfTtcbiAgICAgICAgZG9tTm9kZSA9IERPTS5nZXRET01Ob2RlKGRvbU5vZGUsIGRvbURvY3VtZW50KTtcbiAgICAgICAgaWYgKCFkb21Ob2RlKSB7XG4gICAgICAgICAgICBfVXRpbHMyLmRlZmF1bHQud2FybihcIlV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3Q6IERPTSBlbGVtZW50IGRvZXNuJ3QgZXhpc3QgaW4gdGhhdCBET00gRG9jdW1lbnRcIik7XG4gICAgICAgICAgICByZXR1cm4gb2JqUmV0O1xuICAgICAgICB9XG4gICAgICAgIHNob3dGb3JjZSA9ICEhc2hvd0ZvcmNlO1xuICAgICAgICB2YXIgc3R5bGVzID0gdm9pZCAwO1xuICAgICAgICBpZiAoc2hvd0ZvcmNlKSB7XG4gICAgICAgICAgICBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvbU5vZGUpO1xuICAgICAgICAgICAgaWYgKHN0eWxlcyAmJiBzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGRlZmF1bHQgbWV0aG9kIGlzIHN1cHBvcnRlZCB0aGFuIHVzZSBpdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGRvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgICAgICBvYmpSZXQgPSBkb21Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJRSBoYWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG9ialJldCA9IHtcbiAgICAgICAgICAgICAgICBib3R0b206IG9ialJldC5ib3R0b20sXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmpSZXQuaGVpZ2h0IHx8IGRvbU5vZGUuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnQ6IG9ialJldC5sZWZ0LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBvYmpSZXQucmlnaHQsXG4gICAgICAgICAgICAgICAgdG9wOiBvYmpSZXQudG9wLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBvYmpSZXQud2lkdGggfHwgZG9tTm9kZS5jbGllbnRXaWR0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV3JpdGUgdGhlIGVsZW1lbnQgaW4gYSB0ZW1wb3JhcnkgdmFyaWFibGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSBkb21Ob2RlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDYWxjdWxhdGVkIGJhc2ljIHBhcmFtZXRlcnMgb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBvYmpDb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoOiBkb21FbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQXJlIHBhc3NlZCBvbiB0byBhbGwgcGFyZW50cyBhbmQgdGFrZSBpbnRvIGFjY291bnQgdGhlaXIgb2Zmc2V0c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB3aGlsZSAoZG9tRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIG9iakNvb3JkaW5hdGVzLnggKz0gZG9tRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIG9iakNvb3JkaW5hdGVzLnkgKz0gZG9tRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgb2JqUmV0ID0ge1xuICAgICAgICAgICAgICAgIGJvdHRvbTogb2JqQ29vcmRpbmF0ZXMueSArIG9iakNvb3JkaW5hdGVzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG9iakNvb3JkaW5hdGVzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBvYmpDb29yZGluYXRlcy54LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBvYmpDb29yZGluYXRlcy54ICsgb2JqQ29vcmRpbmF0ZXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdG9wOiBvYmpDb29yZGluYXRlcy55LFxuICAgICAgICAgICAgICAgIHdpZHRoOiBvYmpDb29yZGluYXRlcy53aWR0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvd0ZvcmNlICYmIGRvbU5vZGUpIHtcbiAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBzaXplIGFuZCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIG9ialJldDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluZCBlbGVtZW50IHBvc2l0aW9uXG4gICAgICogQHBhcmFtIGRvbU5vZGVcbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gc2hvd0ZvcmNlXG4gICAgICogQHJldHVybiB7e3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuICAgICAqL1xuICAgIERPTS5maW5kRWxlbWVudFBvc2l0aW9uID0gZnVuY3Rpb24gZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIHZhciBvYmpSZXQgPSB7XG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwXG4gICAgICAgIH07XG4gICAgICAgIGRvbU5vZGUgPSBET00uZ2V0RE9NTm9kZShkb21Ob2RlLCBkb21Eb2N1bWVudCk7XG4gICAgICAgIGlmICghZG9tTm9kZSkge1xuICAgICAgICAgICAgX1V0aWxzMi5kZWZhdWx0Lndhcm4oXCJVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbjogRE9NIGVsZW1lbnQgZG9lc24ndCBleGlzdCBpbiB0aGF0IERPTSBEb2N1bWVudFwiKTtcbiAgICAgICAgICAgIHJldHVybiBvYmpSZXQ7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd0ZvcmNlID0gISFzaG93Rm9yY2U7XG4gICAgICAgIHdoaWxlIChkb21Ob2RlKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHNob3dGb3JjZSkge1xuICAgICAgICAgICAgICAgIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbU5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZXMgJiYgc3R5bGVzLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmpSZXQubGVmdCArPSBkb21Ob2RlLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBvYmpSZXQudG9wICs9IGRvbU5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgZG9tTm9kZSA9IGRvbU5vZGUub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgaWYgKHNob3dGb3JjZSAmJiBkb21Ob2RlKSB7XG4gICAgICAgICAgICAgICAgZG9tTm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqUmV0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKi9cblxuXG4gICAgRE9NLmFkZEV2ZW50ID0gZnVuY3Rpb24gYWRkRXZlbnQob2JqLCBuYW1lLCBmdW5jKSB7XG4gICAgICAgIGlmIChvYmogJiYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZnVuYyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAob2JqLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iai5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIG9iai5hdHRhY2hFdmVudChcIm9uXCIgKyBuYW1lLCBmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqL1xuXG5cbiAgICBET00ucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChvYmosIG5hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaikpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmIChvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgb2JqLmRldGFjaEV2ZW50KFwib25cIiArIG5hbWUsIGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET00uaGFzQ2xhc3NOYW1lID0gZnVuY3Rpb24gaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgcmV0dXJuIChcIiBcIiArIGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgIT09IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00uYWRkQ2xhc3NOYW1lID0gZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFET00uaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2wgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsID8gY2wgKyBcIiBcIiArIGNsYXNzTmFtZSA6IGNsYXNzTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cblxuICAgIERPTS5yZW1vdmVDbGFzc05hbWUgPSBmdW5jdGlvbiByZW1vdmVDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGNsYXNzZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzW2ldID0gY2xhc3Nlc1tpXS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjbGFzc2VzW2ldIHx8IGNsYXNzZXNbaV0gPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB0b2dnbGVcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuXG4gICAgRE9NLnRvZ2dsZUNsYXNzTmFtZSA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUsIHRvZ2dsZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgdG9nZ2xlID09PSBcImJvb2xlYW5cIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIERPTS5hZGRDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2xkQ2xhc3NOYW1lXG4gICAgICogQHBhcmFtIG5ld0NsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00ucmVwbGFjZUNsYXNzID0gZnVuY3Rpb24gcmVwbGFjZUNsYXNzKGVsZW1lbnQsIG9sZENsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2xkQ2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBuZXdDbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgb2xkQ2xhc3NOYW1lID0gb2xkQ2xhc3NOYW1lLnRyaW0oKTtcbiAgICAgICAgICAgIG5ld0NsYXNzTmFtZSA9IG5ld0NsYXNzTmFtZS50cmltKCk7XG4gICAgICAgICAgICBET00ucmVtb3ZlQ2xhc3NOYW1lKGVsZW1lbnQsIG9sZENsYXNzTmFtZSk7XG4gICAgICAgICAgICBET00uYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZWxlbWVudCBieSB0YWcgbmFtZSBhbmQgaW5kZXhcbiAgICAgKiBAcGFyYW0gdG5cbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0RWxlbWVudEJ5VGFnTmFtZSA9IGZ1bmN0aW9uIGdldEVsZW1lbnRCeVRhZ05hbWUodG4pIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdG4gPT09IFwic3RyaW5nXCIgJiYgRE9NLmlzRE9NRG9jdW1lbnQoZG9tRG9jdW1lbnQpICYmIHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdmFyIGVscyA9IGRvbURvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRuKTtcbiAgICAgICAgICAgIHJldHVybiBlbHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGxpbmUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0TGluZUhlaWdodCA9IGZ1bmN0aW9uIGdldExpbmVIZWlnaHQoKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IHN0eWxlcy5saW5lSGVpZ2h0O1xuICAgICAgICB2YXIgbGluZUhlaWdodERpZyA9IHBhcnNlSW50KGxpbmVIZWlnaHQsIDEwKTtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuICAgICAgICB2YXIgZm9udFNpemVEaWcgPSBwYXJzZUludChmb250U2l6ZSwgMTApO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGluZUhlaWdodERpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lSGVpZ2h0RGlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplRGlnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBET007XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzRE9NLnRzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEltcG9ydCBhZGRpdGlvbmFsIGNsYXNzZXNcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfVXRpbHNET00gPSByZXF1aXJlKFwiLi9VdGlsc0RPTVwiKTtcblxudmFyIF9VdGlsc0RPTTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RPTSk7XG5cbnZhciBfVXRpbHNXaW5kb3cgPSByZXF1aXJlKFwiLi9VdGlsc1dpbmRvd1wiKTtcblxudmFyIF9VdGlsc1dpbmRvdzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1dpbmRvdyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBNb3VzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb3VzZSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vdXNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpc2UgbW91c2UgZGVsdGFcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBNb3VzZS5nZXRXaGVlbERlbHRhID0gZnVuY3Rpb24gZ2V0V2hlZWxEZWx0YShlKSB7XG4gICAgICAgIGlmIChlICYmICh0eXBlb2YgZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGUpKSA9PT0gXCJvYmplY3RcIiAmJiAoXCJkZXRhaWxcIiBpbiBlIHx8IFwid2hlZWxEZWx0YVwiIGluIGUgfHwgXCJ3aGVlbERlbHRhWVwiIGluIGUgfHwgXCJ3aGVlbERlbHRhWFwiIGluIGUgfHwgXCJkZWx0YVlcIiBpbiBlIHx8IFwiZGVsdGFYXCIgaW4gZSB8fCBcImF4aXNcIiBpbiBlIHx8IFwiZGVsdGFNb2RlXCIgaW4gZSkpIHtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBkZWx0YVggPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgZGVsdGFZID0gdm9pZCAwO1xuICAgICAgICAgICAgLy8gT2xkIHNjaG9vbCBzY3JvbGx3aGVlbCBkZWx0YVxuICAgICAgICAgICAgaWYgKFwiZGV0YWlsXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUuZGV0YWlsICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJ3aGVlbERlbHRhXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcIndoZWVsRGVsdGFZXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJ3aGVlbERlbHRhWFwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVggPSBlLndoZWVsRGVsdGFYICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaXJlZm94IDwgMTcgaG9yaXpvbnRhbCBzY3JvbGxpbmcgcmVsYXRlZCB0byBET01Nb3VzZVNjcm9sbCBldmVudFxuICAgICAgICAgICAgaWYgKFwiYXhpc1wiIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOZXcgc2Nob29sIHdoZWVsIGRlbHRhICh3aGVlbCBldmVudClcbiAgICAgICAgICAgIGlmIChcImRlbHRhWVwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBlLmRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwiZGVsdGFYXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGUuZGVsdGFYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmVlZCB0byBjb252ZXJ0IGxpbmVzIGFuZCBwYWdlcyB0byBwaXhlbHMgaWYgd2UgYXJlblwidCBhbHJlYWR5IGluIHBpeGVsc1xuICAgICAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAwIGlzIGJ5IHBpeGVscywgbm90aGluZyB0byBkb1xuICAgICAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAxIGlzIGJ5IGxpbmVzXG4gICAgICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgICAgIGlmIChlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gX1V0aWxzRE9NMi5kZWZhdWx0LmdldExpbmVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWCAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuZGVsdGFNb2RlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd2hlZ2lodCA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5nZXRIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiB3aW5kb3doZWdpaHQ7XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFYICogd2luZG93aGVnaWh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsdGEgPSBkZWx0YVkgPT09IDAgPyBkZWx0YVggOiBkZWx0YVk7XG4gICAgICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBNb3VzZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW91c2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc01vdXNlLnRzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggc2NyZWVuXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY3JlZW4oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JlZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaW5mb1xuICAgICAqIEByZXR1cm4ge3thdmFpbGFibGVTaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9LCBjb2xvckRlcHRoOiBudW1iZXIsIHBpeGVsUmF0aW86IG51bWJlciwgc2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX19XG4gICAgICovXG4gICAgU2NyZWVuLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXZhaWxhYmxlU2l6ZTogU2NyZWVuLmdldEF2YWlsYWJsZVNpemVzKCksXG4gICAgICAgICAgICBjb2xvckRlcHRoOiBTY3JlZW4uZ2V0Q29sb3JEZXB0aCgpLFxuICAgICAgICAgICAgcGl4ZWxSYXRpbzogU2NyZWVuLmdldFBpeGVsUmF0aW8oKSxcbiAgICAgICAgICAgIHNpemU6IFNjcmVlbi5nZXRTaXplcygpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIGhlaWdodFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRIZWlnaHQgPSBmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4uaGVpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLndpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0SGVpZ2h0KCksXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLmdldFdpZHRoKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZUhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5hdmFpbEhlaWdodDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0QXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiBnZXRBdmFpbGFibGVXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5hdmFpbFdpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRBdmFpbGFibGVTaXplcyA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVNpemVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0KCksXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLmdldEF2YWlsYWJsZVdpZHRoKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gcGl4ZWwgcmF0aW9cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gZ2V0UGl4ZWxSYXRpbygpIHtcbiAgICAgICAgdmFyIHJhdGlvID0gMTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnNjcmVlbi5zeXN0ZW1YRFBJID4gd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSkge1xuICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgLyB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF0aW87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIGNvbG9yIGRlcHRoXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0Q29sb3JEZXB0aCA9IGZ1bmN0aW9uIGdldENvbG9yRGVwdGgoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4uY29sb3JEZXB0aDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjcmVlbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2NyZWVuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNTY3JlZW4udHNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBzeXN0ZW1cbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN5c3RlbSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHN5c3RlbSBpbmZvXG4gICAgICogQHJldHVybiB7e25hbWU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBTeXN0ZW0uZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBTeXN0ZW0uZ2V0TmFtZSgpLFxuICAgICAgICAgICAgdmVyc2lvbjogU3lzdGVtLmdldFZlcnNpb24oKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IE9TIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFN5c3RlbS5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgdmFyIG9zID0gXCJcIjtcbiAgICAgICAgdmFyIGNsaWVudFN0cmluZ3MgPSBbe1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMTBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOC4xXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA3XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbmRvd3MgTlQgNi4wLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBWaXN0YVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIE5UIDUuMi8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgU2VydmVyIDIwMDNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBYUFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMjAwMFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIE1FXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOThcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDk1XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgTlQgNC4wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbmRvd3MgQ0UvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIENFXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbjE2LyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyAzLjExXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL0FuZHJvaWQvLFxuICAgICAgICAgICAgczogXCJBbmRyb2lkXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL09wZW5CU0QvLFxuICAgICAgICAgICAgczogXCJPcGVuIEJTRFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9TdW5PUy8sXG4gICAgICAgICAgICBzOiBcIlN1biBPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oTGludXh8WDExKS8sXG4gICAgICAgICAgICBzOiBcIkxpbnV4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS8sXG4gICAgICAgICAgICBzOiBcImlPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9NYWMgT1MgWC8sXG4gICAgICAgICAgICBzOiBcIk1hYyBPUyBYXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS8sXG4gICAgICAgICAgICBzOiBcIk1hYyBPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9RTlgvLFxuICAgICAgICAgICAgczogXCJRTlhcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvVU5JWC8sXG4gICAgICAgICAgICBzOiBcIlVOSVhcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvQmVPUy8sXG4gICAgICAgICAgICBzOiBcIkJlT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvT1NcXC8yLyxcbiAgICAgICAgICAgIHM6IFwiT1MvMlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS8sXG4gICAgICAgICAgICBzOiBcIlNlYXJjaCBCb3RcIlxuICAgICAgICB9XTtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2xpZW50U3RyaW5ncywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjcyA9IF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChjcy5yLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgICAgICBvcyA9IGNzLnM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IE9TIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFN5c3RlbS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gZ2V0VmVyc2lvbigpIHtcbiAgICAgICAgdmFyIG9zID0gU3lzdGVtLmdldE5hbWUoKTtcbiAgICAgICAgdmFyIG9zVmVyc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xuICAgICAgICAgICAgb3MgPSBcIldpbmRvd3NcIjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9zKSB7XG4gICAgICAgICAgICBjYXNlIFwiTWFjIE9TIFhcIjpcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkFuZHJvaWRcIjpcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImlPU1wiOlxuICAgICAgICAgICAgICAgIHZhciByZWcgPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gcmVnWzFdICsgXCIuXCIgKyByZWdbMl0gKyBcIi5cIiArIChyZWdbM10gfHwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvc1ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiBTeXN0ZW07XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN5c3RlbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzU3lzdGVtLnRzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggdXNlclxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfVXRpbHNCcm93c2VyID0gcmVxdWlyZShcIi4vVXRpbHNCcm93c2VyXCIpO1xuXG52YXIgX1V0aWxzQnJvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Jyb3dzZXIpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVc2VyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgaW5mb1xuICAgICAqIEByZXR1cm4ge3ticm93c2VyOiB7YnJvd3Nlcjogc3RyaW5nLCBtb2JpbGU6IGJvb2xlYW4sIHZlcnNpb246IHN0cmluZ30sIHNjcmVlbjoge2F2YWlsYWJsZVNpemU6IHtoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn0sIGNvbG9yRGVwdGg6IG51bWJlciwgcGl4ZWxSYXRpbzogbnVtYmVyLCBzaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fSwgc3lzdGVtOiB7bmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmd9fX1cbiAgICAgKi9cbiAgICBVc2VyLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogX1V0aWxzQnJvd3NlcjIuZGVmYXVsdC5nZXRJbmZvKCksXG4gICAgICAgICAgICBzY3JlZW46IF9VdGlsc1NjcmVlbjIuZGVmYXVsdC5nZXRJbmZvKCksXG4gICAgICAgICAgICBzeXN0ZW06IF9VdGlsc1N5c3RlbTIuZGVmYXVsdC5nZXRJbmZvKClcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVzZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFVzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc1VzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvKipcbiAqIEVuZm9yY2VzIGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBSYXZlbiBjbGllbnQsIGFuZCB0aGVcbiAqIG1haW4gZW50cnkgcG9pbnQgZm9yIFJhdmVuLiBJZiB5b3UgYXJlIGEgY29uc3VtZXIgb2YgdGhlXG4gKiBSYXZlbiBsaWJyYXJ5LCB5b3UgU0hPVUxEIGxvYWQgdGhpcyBmaWxlICh2cyByYXZlbi5qcykuXG4gKiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJhdmVuQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL3JhdmVuJyk7XG5cbi8vIFRoaXMgaXMgdG8gYmUgZGVmZW5zaXZlIGluIGVudmlyb25tZW50cyB3aGVyZSB3aW5kb3cgZG9lcyBub3QgZXhpc3QgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ2V0c2VudHJ5L3JhdmVuLWpzL3B1bGwvNzg1KVxudmFyIF93aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvd1xuICAgICAgICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFxuICAgICAgICAgICAgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmXG4gICAgICAgICAgICA6IHt9O1xudmFyIF9SYXZlbiA9IF93aW5kb3cuUmF2ZW47XG5cbnZhciBSYXZlbiA9IG5ldyBSYXZlbkNvbnN0cnVjdG9yKCk7XG5cbi8qXG4gKiBBbGxvdyBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBSYXZlbiB0byBiZSBpbnN0YWxsZWQuXG4gKiBTdHJpcCBSYXZlbiBmcm9tIHRoZSBnbG9iYWwgY29udGV4dCBhbmQgcmV0dXJucyB0aGUgaW5zdGFuY2UuXG4gKlxuICogQHJldHVybiB7UmF2ZW59XG4gKi9cblJhdmVuLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG5cdF93aW5kb3cuUmF2ZW4gPSBfUmF2ZW47XG5cdHJldHVybiBSYXZlbjtcbn07XG5cblJhdmVuLmFmdGVyTG9hZCgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhdmVuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JhdmVuLWpzL3NyYy9zaW5nbGV0b24uanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvKmdsb2JhbCBYRG9tYWluUmVxdWVzdDpmYWxzZSwgX19ERVZfXzpmYWxzZSovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBUcmFjZUtpdCA9IHJlcXVpcmUoJy4uL3ZlbmRvci9UcmFjZUtpdC90cmFjZWtpdCcpO1xudmFyIFJhdmVuQ29uZmlnRXJyb3IgPSByZXF1aXJlKCcuL2NvbmZpZ0Vycm9yJyk7XG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuXG52YXIgd3JhcENvbnNvbGVNZXRob2QgPSByZXF1aXJlKCcuL2NvbnNvbGUnKS53cmFwTWV0aG9kO1xuXG52YXIgZHNuS2V5cyA9ICdzb3VyY2UgcHJvdG9jb2wgdXNlciBwYXNzIGhvc3QgcG9ydCBwYXRoJy5zcGxpdCgnICcpLFxuICAgIGRzblBhdHRlcm4gPSAvXig/OihcXHcrKTopP1xcL1xcLyg/OihcXHcrKSg6XFx3Kyk/QCk/KFtcXHdcXC4tXSspKD86OihcXGQrKSk/KFxcLy4qKS87XG5cbmZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gK25ldyBEYXRlKCk7XG59XG5cbi8vIFRoaXMgaXMgdG8gYmUgZGVmZW5zaXZlIGluIGVudmlyb25tZW50cyB3aGVyZSB3aW5kb3cgZG9lcyBub3QgZXhpc3QgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ2V0c2VudHJ5L3JhdmVuLWpzL3B1bGwvNzg1KVxudmFyIF93aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvd1xuICAgICAgICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFxuICAgICAgICAgICAgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmXG4gICAgICAgICAgICA6IHt9O1xudmFyIF9kb2N1bWVudCA9IF93aW5kb3cuZG9jdW1lbnQ7XG5cbi8vIEZpcnN0LCBjaGVjayBmb3IgSlNPTiBzdXBwb3J0XG4vLyBJZiB0aGVyZSBpcyBubyBKU09OLCB3ZSBuby1vcCB0aGUgY29yZSBmZWF0dXJlcyBvZiBSYXZlblxuLy8gc2luY2UgSlNPTiBpcyByZXF1aXJlZCB0byBlbmNvZGUgdGhlIHBheWxvYWRcbmZ1bmN0aW9uIFJhdmVuKCkge1xuICAgIHRoaXMuX2hhc0pTT04gPSAhISh0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgJiYgSlNPTi5zdHJpbmdpZnkpO1xuICAgIC8vIFJhdmVuIGNhbiBydW4gaW4gY29udGV4dHMgd2hlcmUgdGhlcmUncyBubyBkb2N1bWVudCAocmVhY3QtbmF0aXZlKVxuICAgIHRoaXMuX2hhc0RvY3VtZW50ID0gIWlzVW5kZWZpbmVkKF9kb2N1bWVudCk7XG4gICAgdGhpcy5fbGFzdENhcHR1cmVkRXhjZXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLl9sYXN0RXZlbnRJZCA9IG51bGw7XG4gICAgdGhpcy5fZ2xvYmFsU2VydmVyID0gbnVsbDtcbiAgICB0aGlzLl9nbG9iYWxLZXkgPSBudWxsO1xuICAgIHRoaXMuX2dsb2JhbFByb2plY3QgPSBudWxsO1xuICAgIHRoaXMuX2dsb2JhbENvbnRleHQgPSB7fTtcbiAgICB0aGlzLl9nbG9iYWxPcHRpb25zID0ge1xuICAgICAgICBsb2dnZXI6ICdqYXZhc2NyaXB0JyxcbiAgICAgICAgaWdub3JlRXJyb3JzOiBbXSxcbiAgICAgICAgaWdub3JlVXJsczogW10sXG4gICAgICAgIHdoaXRlbGlzdFVybHM6IFtdLFxuICAgICAgICBpbmNsdWRlUGF0aHM6IFtdLFxuICAgICAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cycsXG4gICAgICAgIGNvbGxlY3RXaW5kb3dFcnJvcnM6IHRydWUsXG4gICAgICAgIG1heE1lc3NhZ2VMZW5ndGg6IDAsXG4gICAgICAgIHN0YWNrVHJhY2VMaW1pdDogNTAsXG4gICAgICAgIGF1dG9CcmVhZGNydW1iczogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5faWdub3JlT25FcnJvciA9IDA7XG4gICAgdGhpcy5faXNSYXZlbkluc3RhbGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX29yaWdpbmFsRXJyb3JTdGFja1RyYWNlTGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXQ7XG4gICAgLy8gY2FwdHVyZSByZWZlcmVuY2VzIHRvIHdpbmRvdy5jb25zb2xlICphbmQqIGFsbCBpdHMgbWV0aG9kcyBmaXJzdFxuICAgIC8vIGJlZm9yZSB0aGUgY29uc29sZSBwbHVnaW4gaGFzIGEgY2hhbmNlIHRvIG1vbmtleSBwYXRjaFxuICAgIHRoaXMuX29yaWdpbmFsQ29uc29sZSA9IF93aW5kb3cuY29uc29sZSB8fCB7fTtcbiAgICB0aGlzLl9vcmlnaW5hbENvbnNvbGVNZXRob2RzID0ge307XG4gICAgdGhpcy5fcGx1Z2lucyA9IFtdO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IG5vdygpO1xuICAgIHRoaXMuX3dyYXBwZWRCdWlsdElucyA9IFtdO1xuICAgIHRoaXMuX2JyZWFkY3J1bWJzID0gW107XG4gICAgdGhpcy5fbGFzdENhcHR1cmVkRXZlbnQgPSBudWxsO1xuICAgIHRoaXMuX2tleXByZXNzVGltZW91dDtcbiAgICB0aGlzLl9sb2NhdGlvbiA9IF93aW5kb3cubG9jYXRpb247XG4gICAgdGhpcy5fbGFzdEhyZWYgPSB0aGlzLl9sb2NhdGlvbiAmJiB0aGlzLl9sb2NhdGlvbi5ocmVmO1xuXG4gICAgZm9yICh2YXIgbWV0aG9kIGluIHRoaXMuX29yaWdpbmFsQ29uc29sZSkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBndWFyZC1mb3ItaW5cbiAgICAgIHRoaXMuX29yaWdpbmFsQ29uc29sZU1ldGhvZHNbbWV0aG9kXSA9IHRoaXMuX29yaWdpbmFsQ29uc29sZVttZXRob2RdO1xuICAgIH1cbn1cblxuLypcbiAqIFRoZSBjb3JlIFJhdmVuIHNpbmdsZXRvblxuICpcbiAqIEB0aGlzIHtSYXZlbn1cbiAqL1xuXG5SYXZlbi5wcm90b3R5cGUgPSB7XG4gICAgLy8gSGFyZGNvZGUgdmVyc2lvbiBzdHJpbmcgc28gdGhhdCByYXZlbiBzb3VyY2UgY2FuIGJlIGxvYWRlZCBkaXJlY3RseSB2aWFcbiAgICAvLyB3ZWJwYWNrICh1c2luZyBhIGJ1aWxkIHN0ZXAgY2F1c2VzIHdlYnBhY2sgIzE2MTcpLiBHcnVudCB2ZXJpZmllcyB0aGF0XG4gICAgLy8gdGhpcyB2YWx1ZSBtYXRjaGVzIHBhY2thZ2UuanNvbiBkdXJpbmcgYnVpbGQuXG4gICAgLy8gICBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9nZXRzZW50cnkvcmF2ZW4tanMvaXNzdWVzLzQ2NVxuICAgIFZFUlNJT046ICczLjkuMScsXG5cbiAgICBkZWJ1ZzogZmFsc2UsXG5cbiAgICBUcmFjZUtpdDogVHJhY2VLaXQsIC8vIGFsaWFzIHRvIFRyYWNlS2l0XG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBSYXZlbiB3aXRoIGEgRFNOIGFuZCBleHRyYSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHNuIFRoZSBwdWJsaWMgU2VudHJ5IERTTlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9wdGlvbmFsIHNldCBvZiBvZiBnbG9iYWwgb3B0aW9ucyBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbihkc24sIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmIChzZWxmLl9nbG9iYWxTZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dEZWJ1ZygnZXJyb3InLCAnRXJyb3I6IFJhdmVuIGhhcyBhbHJlYWR5IGJlZW4gY29uZmlndXJlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkc24pIHJldHVybiBzZWxmO1xuXG4gICAgICAgIHZhciBnbG9iYWxPcHRpb25zID0gc2VsZi5fZ2xvYmFsT3B0aW9ucztcblxuICAgICAgICAvLyBtZXJnZSBpbiBvcHRpb25zXG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBlYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIC8vIHRhZ3MgYW5kIGV4dHJhIGFyZSBzcGVjaWFsIGFuZCBuZWVkIHRvIGJlIHB1dCBpbnRvIGNvbnRleHRcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAndGFncycgfHwga2V5ID09PSAnZXh0cmEnIHx8IGtleSA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2dsb2JhbENvbnRleHRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbE9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5zZXREU04oZHNuKTtcblxuICAgICAgICAvLyBcIlNjcmlwdCBlcnJvci5cIiBpcyBoYXJkIGNvZGVkIGludG8gYnJvd3NlcnMgZm9yIGVycm9ycyB0aGF0IGl0IGNhbid0IHJlYWQuXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHJlc3VsdCBvZiBhIHNjcmlwdCBiZWluZyBwdWxsZWQgaW4gZnJvbSBhbiBleHRlcm5hbCBkb21haW4gYW5kIENPUlMuXG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnB1c2goL15TY3JpcHQgZXJyb3JcXC4/JC8pO1xuICAgICAgICBnbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy5wdXNoKC9eSmF2YXNjcmlwdCBlcnJvcjogU2NyaXB0IGVycm9yXFwuPyBvbiBsaW5lIDAkLyk7XG5cbiAgICAgICAgLy8gam9pbiByZWdleHAgcnVsZXMgaW50byBvbmUgYmlnIHJ1bGVcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMgPSBqb2luUmVnRXhwKGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzKTtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzID0gZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzLmxlbmd0aCA/IGpvaW5SZWdFeHAoZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzKSA6IGZhbHNlO1xuICAgICAgICBnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMgPSBnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMubGVuZ3RoID8gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMpIDogZmFsc2U7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaW5jbHVkZVBhdGhzID0gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLmluY2x1ZGVQYXRocyk7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMubWF4QnJlYWRjcnVtYnMgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihnbG9iYWxPcHRpb25zLm1heEJyZWFkY3J1bWJzIHx8IDEwMCwgMTAwKSk7IC8vIGRlZmF1bHQgYW5kIGhhcmQgbGltaXQgaXMgMTAwXG5cbiAgICAgICAgdmFyIGF1dG9CcmVhZGNydW1iRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICB4aHI6IHRydWUsXG4gICAgICAgICAgICBjb25zb2xlOiB0cnVlLFxuICAgICAgICAgICAgZG9tOiB0cnVlLFxuICAgICAgICAgICAgbG9jYXRpb246IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYXV0b0JyZWFkY3J1bWJzID0gZ2xvYmFsT3B0aW9ucy5hdXRvQnJlYWRjcnVtYnM7XG4gICAgICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGF1dG9CcmVhZGNydW1icykgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICBhdXRvQnJlYWRjcnVtYnMgPSBvYmplY3RNZXJnZShhdXRvQnJlYWRjcnVtYkRlZmF1bHRzLCBhdXRvQnJlYWRjcnVtYnMpO1xuICAgICAgICB9IGVsc2UgaWYgKGF1dG9CcmVhZGNydW1icyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGF1dG9CcmVhZGNydW1icyA9IGF1dG9CcmVhZGNydW1iRGVmYXVsdHM7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5hdXRvQnJlYWRjcnVtYnMgPSBhdXRvQnJlYWRjcnVtYnM7XG5cbiAgICAgICAgVHJhY2VLaXQuY29sbGVjdFdpbmRvd0Vycm9ycyA9ICEhZ2xvYmFsT3B0aW9ucy5jb2xsZWN0V2luZG93RXJyb3JzO1xuXG4gICAgICAgIC8vIHJldHVybiBmb3IgY2hhaW5pbmdcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5zdGFsbHMgYSBnbG9iYWwgd2luZG93Lm9uZXJyb3IgZXJyb3IgaGFuZGxlclxuICAgICAqIHRvIGNhcHR1cmUgYW5kIHJlcG9ydCB1bmNhdWdodCBleGNlcHRpb25zLlxuICAgICAqIEF0IHRoaXMgcG9pbnQsIGluc3RhbGwoKSBpcyByZXF1aXJlZCB0byBiZSBjYWxsZWQgZHVlXG4gICAgICogdG8gdGhlIHdheSBUcmFjZUtpdCBpcyBzZXQgdXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBpbnN0YWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5pc1NldHVwKCkgJiYgIXNlbGYuX2lzUmF2ZW5JbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2hhbmRsZU9uRXJyb3JTdGFja0luZm8uYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5faW5zdHJ1bWVudFRyeUNhdGNoKCk7XG4gICAgICAgICAgICBpZiAoc2VsZi5fZ2xvYmFsT3B0aW9ucy5hdXRvQnJlYWRjcnVtYnMpXG4gICAgICAgICAgICAgICAgc2VsZi5faW5zdHJ1bWVudEJyZWFkY3J1bWJzKCk7XG5cbiAgICAgICAgICAgIC8vIEluc3RhbGwgYWxsIG9mIHRoZSBwbHVnaW5zXG4gICAgICAgICAgICBzZWxmLl9kcmFpblBsdWdpbnMoKTtcblxuICAgICAgICAgICAgc2VsZi5faXNSYXZlbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBzZWxmLl9nbG9iYWxPcHRpb25zLnN0YWNrVHJhY2VMaW1pdDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHRoZSBEU04gKGNhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZSB1bmxpa2UgY29uZmlnKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRzbiBUaGUgcHVibGljIFNlbnRyeSBEU05cbiAgICAgKi9cbiAgICBzZXREU046IGZ1bmN0aW9uKGRzbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICB1cmkgPSBzZWxmLl9wYXJzZURTTihkc24pLFxuICAgICAgICAgIGxhc3RTbGFzaCA9IHVyaS5wYXRoLmxhc3RJbmRleE9mKCcvJyksXG4gICAgICAgICAgcGF0aCA9IHVyaS5wYXRoLnN1YnN0cigxLCBsYXN0U2xhc2gpO1xuXG4gICAgICAgIHNlbGYuX2RzbiA9IGRzbjtcbiAgICAgICAgc2VsZi5fZ2xvYmFsS2V5ID0gdXJpLnVzZXI7XG4gICAgICAgIHNlbGYuX2dsb2JhbFNlY3JldCA9IHVyaS5wYXNzICYmIHVyaS5wYXNzLnN1YnN0cigxKTtcbiAgICAgICAgc2VsZi5fZ2xvYmFsUHJvamVjdCA9IHVyaS5wYXRoLnN1YnN0cihsYXN0U2xhc2ggKyAxKTtcblxuICAgICAgICBzZWxmLl9nbG9iYWxTZXJ2ZXIgPSBzZWxmLl9nZXRHbG9iYWxTZXJ2ZXIodXJpKTtcblxuICAgICAgICBzZWxmLl9nbG9iYWxFbmRwb2ludCA9IHNlbGYuX2dsb2JhbFNlcnZlciArXG4gICAgICAgICAgICAnLycgKyBwYXRoICsgJ2FwaS8nICsgc2VsZi5fZ2xvYmFsUHJvamVjdCArICcvc3RvcmUvJztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBXcmFwIGNvZGUgd2l0aGluIGEgY29udGV4dCBzbyBSYXZlbiBjYW4gY2FwdHVyZSBlcnJvcnNcbiAgICAgKiByZWxpYWJseSBhY3Jvc3MgZG9tYWlucyB0aGF0IGlzIGV4ZWN1dGVkIGltbWVkaWF0ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgQSBzcGVjaWZpYyBzZXQgb2Ygb3B0aW9ucyBmb3IgdGhpcyBjb250ZXh0IFtvcHRpb25hbF1cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIFRoZSBjYWxsYmFjayB0byBiZSBpbW1lZGlhdGVseSBleGVjdXRlZCB3aXRoaW4gdGhlIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhcmdzIEFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBiZSBjYWxsZWQgd2l0aCB0aGUgY2FsbGJhY2sgW29wdGlvbmFsXVxuICAgICAqL1xuICAgIGNvbnRleHQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGZ1bmMsIGFyZ3MpIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgIGFyZ3MgPSBmdW5jIHx8IFtdO1xuICAgICAgICAgICAgZnVuYyA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcChvcHRpb25zLCBmdW5jKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBXcmFwIGNvZGUgd2l0aGluIGEgY29udGV4dCBhbmQgcmV0dXJucyBiYWNrIGEgbmV3IGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBIHNwZWNpZmljIHNldCBvZiBvcHRpb25zIGZvciB0aGlzIGNvbnRleHQgW29wdGlvbmFsXVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgaW4gYSBuZXcgY29udGV4dFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgQSBmdW5jdGlvbiB0byBjYWxsIGJlZm9yZSB0aGUgdHJ5L2NhdGNoIHdyYXBwZXIgW29wdGlvbmFsLCBwcml2YXRlXVxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgbmV3bHkgd3JhcHBlZCBmdW5jdGlvbnMgd2l0aCBhIGNvbnRleHRcbiAgICAgKi9cbiAgICB3cmFwOiBmdW5jdGlvbihvcHRpb25zLCBmdW5jLCBfYmVmb3JlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gMSBhcmd1bWVudCBoYXMgYmVlbiBwYXNzZWQsIGFuZCBpdCdzIG5vdCBhIGZ1bmN0aW9uXG4gICAgICAgIC8vIHNvIGp1c3QgcmV0dXJuIGl0XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChmdW5jKSAmJiAhaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb25zIGlzIG9wdGlvbmFsXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBmdW5jID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSd2ZSBwYXNzZWQgYWxvbmcgMiBhcmd1bWVudHMsIGFuZCB0aGUgc2Vjb25kIG9uZVxuICAgICAgICAvLyBpcyBub3QgYSBmdW5jdGlvbiBlaXRoZXIsIHNvIHdlJ2xsIGp1c3QgcmV0dXJuIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBkb24ndCB3YW5uYSB3cmFwIGl0IHR3aWNlIVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGZ1bmMuX19yYXZlbl9fKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaGFzIGFscmVhZHkgYmVlbiB3cmFwcGVkIGluIHRoZSBwYXN0LCByZXR1cm4gdGhhdFxuICAgICAgICAgICAgaWYgKGZ1bmMuX19yYXZlbl93cmFwcGVyX18gKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYy5fX3JhdmVuX3dyYXBwZXJfXyA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIEp1c3QgYWNjZXNzaW5nIGN1c3RvbSBwcm9wcyBpbiBzb21lIFNlbGVuaXVtIGVudmlyb25tZW50c1xuICAgICAgICAgICAgLy8gY2FuIGNhdXNlIGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGV4Y2VwdGlvbiAoc2VlIHJhdmVuLWpzIzQ5NSkuXG4gICAgICAgICAgICAvLyBCYWlsIG9uIHdyYXBwaW5nIGFuZCByZXR1cm4gdGhlIGZ1bmN0aW9uIGFzLWlzIChkZWZlcnMgdG8gd2luZG93Lm9uZXJyb3IpLlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3cmFwcGVkKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgaSA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgZGVlcCA9ICFvcHRpb25zIHx8IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWVwICE9PSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKF9iZWZvcmUgJiYgaXNGdW5jdGlvbihfYmVmb3JlKSkge1xuICAgICAgICAgICAgICAgIF9iZWZvcmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgd3JhcCBhbGwgb2YgYSBmdW5jdGlvbidzIGFyZ3VtZW50cyB0aGF0IGFyZVxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIHRoZW1zZWx2ZXMuXG4gICAgICAgICAgICB3aGlsZShpLS0pIGFyZ3NbaV0gPSBkZWVwID8gc2VsZi53cmFwKG9wdGlvbnMsIGFyZ3VtZW50c1tpXSkgOiBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9pZ25vcmVOZXh0T25FcnJvcigpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2FwdHVyZUV4Y2VwdGlvbihlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29weSBvdmVyIHByb3BlcnRpZXMgb2YgdGhlIG9sZCBmdW5jdGlvblxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBmdW5jKSB7XG4gICAgICAgICAgICBpZiAoaGFzS2V5KGZ1bmMsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIHdyYXBwZWRbcHJvcGVydHldID0gZnVuY1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3JhcHBlZC5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcblxuICAgICAgICBmdW5jLl9fcmF2ZW5fd3JhcHBlcl9fID0gd3JhcHBlZDtcbiAgICAgICAgLy8gU2lnbmFsIHRoYXQgdGhpcyBmdW5jdGlvbiBoYXMgYmVlbiB3cmFwcGVkIGFscmVhZHlcbiAgICAgICAgLy8gZm9yIGJvdGggZGVidWdnaW5nIGFuZCB0byBwcmV2ZW50IGl0IHRvIGJlaW5nIHdyYXBwZWQgdHdpY2VcbiAgICAgICAgd3JhcHBlZC5fX3JhdmVuX18gPSB0cnVlO1xuICAgICAgICB3cmFwcGVkLl9faW5uZXJfXyA9IGZ1bmM7XG5cbiAgICAgICAgcmV0dXJuIHdyYXBwZWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogVW5pbnN0YWxscyB0aGUgZ2xvYmFsIGVycm9yIGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICB1bmluc3RhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBUcmFjZUtpdC5yZXBvcnQudW5pbnN0YWxsKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzdG9yZUJ1aWx0SW5zKCk7XG5cbiAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gdGhpcy5fb3JpZ2luYWxFcnJvclN0YWNrVHJhY2VMaW1pdDtcbiAgICAgICAgdGhpcy5faXNSYXZlbkluc3RhbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIE1hbnVhbGx5IGNhcHR1cmUgYW4gZXhjZXB0aW9uIGFuZCBzZW5kIGl0IG92ZXIgdG8gU2VudHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Vycm9yfSBleCBBbiBleGNlcHRpb24gdG8gYmUgbG9nZ2VkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgQSBzcGVjaWZpYyBzZXQgb2Ygb3B0aW9ucyBmb3IgdGhpcyBlcnJvciBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY2FwdHVyZUV4Y2VwdGlvbjogZnVuY3Rpb24oZXgsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gSWYgbm90IGFuIEVycm9yIGlzIHBhc3NlZCB0aHJvdWdoLCByZWNhbGwgYXMgYSBtZXNzYWdlIGluc3RlYWRcbiAgICAgICAgaWYgKCFpc0Vycm9yKGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwdHVyZU1lc3NhZ2UoZXgsIG9iamVjdE1lcmdlKHtcbiAgICAgICAgICAgICAgICB0cmltSGVhZEZyYW1lczogMSxcbiAgICAgICAgICAgICAgICBzdGFja3RyYWNlOiB0cnVlIC8vIGlmIHdlIGZhbGwgYmFjayB0byBjYXB0dXJlTWVzc2FnZSwgZGVmYXVsdCB0byBhdHRlbXB0aW5nIGEgbmV3IHRyYWNlXG4gICAgICAgICAgICB9LCBvcHRpb25zKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9yZSB0aGUgcmF3IGV4Y2VwdGlvbiBvYmplY3QgZm9yIHBvdGVudGlhbCBkZWJ1Z2dpbmcgYW5kIGludHJvc3BlY3Rpb25cbiAgICAgICAgdGhpcy5fbGFzdENhcHR1cmVkRXhjZXB0aW9uID0gZXg7XG5cbiAgICAgICAgLy8gVHJhY2VLaXQucmVwb3J0IHdpbGwgcmUtcmFpc2UgYW55IGV4Y2VwdGlvbiBwYXNzZWQgdG8gaXQsXG4gICAgICAgIC8vIHdoaWNoIG1lYW5zIHlvdSBoYXZlIHRvIHdyYXAgaXQgaW4gdHJ5L2NhdGNoLiBJbnN0ZWFkLCB3ZVxuICAgICAgICAvLyBjYW4gd3JhcCBpdCBoZXJlIGFuZCBvbmx5IHJlLXJhaXNlIGlmIFRyYWNlS2l0LnJlcG9ydFxuICAgICAgICAvLyByYWlzZXMgYW4gZXhjZXB0aW9uIGRpZmZlcmVudCBmcm9tIHRoZSBvbmUgd2UgYXNrZWQgdG9cbiAgICAgICAgLy8gcmVwb3J0IG9uLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHN0YWNrID0gVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UoZXgpO1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlU3RhY2tJbmZvKHN0YWNrLCBvcHRpb25zKTtcbiAgICAgICAgfSBjYXRjaChleDEpIHtcbiAgICAgICAgICAgIGlmKGV4ICE9PSBleDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBleDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNYW51YWxseSBzZW5kIGEgbWVzc2FnZSB0byBTZW50cnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgQSBwbGFpbiBtZXNzYWdlIHRvIGJlIGNhcHR1cmVkIGluIFNlbnRyeVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIEEgc3BlY2lmaWMgc2V0IG9mIG9wdGlvbnMgZm9yIHRoaXMgbWVzc2FnZSBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY2FwdHVyZU1lc3NhZ2U6IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgICAgICAvLyBjb25maWcoKSBhdXRvbWFnaWNhbGx5IGNvbnZlcnRzIGlnbm9yZUVycm9ycyBmcm9tIGEgbGlzdCB0byBhIFJlZ0V4cCBzbyB3ZSBuZWVkIHRvIHRlc3QgZm9yIGFuXG4gICAgICAgIC8vIGVhcmx5IGNhbGw7IHdlJ2xsIGVycm9yIG9uIHRoZSBzaWRlIG9mIGxvZ2dpbmcgYW55dGhpbmcgY2FsbGVkIGJlZm9yZSBjb25maWd1cmF0aW9uIHNpbmNlIGl0J3NcbiAgICAgICAgLy8gcHJvYmFibHkgc29tZXRoaW5nIHlvdSBzaG91bGQgc2VlOlxuICAgICAgICBpZiAoISF0aGlzLl9nbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy50ZXN0ICYmIHRoaXMuX2dsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnRlc3QobXNnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdmFyIGRhdGEgPSBvYmplY3RNZXJnZSh7XG4gICAgICAgICAgICBtZXNzYWdlOiBtc2cgKyAnJyAgLy8gTWFrZSBzdXJlIGl0J3MgYWN0dWFsbHkgYSBzdHJpbmdcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2dsb2JhbE9wdGlvbnMuc3RhY2t0cmFjZSB8fCAob3B0aW9ucyAmJiBvcHRpb25zLnN0YWNrdHJhY2UpKSB7XG4gICAgICAgICAgICB2YXIgZXg7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzdGFjayB0cmFjZSBmcm9tIHRoaXMgcG9pbnQ7IGp1c3QgdHJpbVxuICAgICAgICAgICAgLy8gb2ZmIGV4dHJhIGZyYW1lcyBzbyB0aGV5IGRvbid0IGluY2x1ZGUgdGhpcyBmdW5jdGlvbiBjYWxsIChvclxuICAgICAgICAgICAgLy8gZWFybGllciBSYXZlbi5qcyBsaWJyYXJ5IGZuIGNhbGxzKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4MSkge1xuICAgICAgICAgICAgICAgIGV4ID0gZXgxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBudWxsIGV4Y2VwdGlvbiBuYW1lIHNvIGBFcnJvcmAgaXNuJ3QgcHJlZml4ZWQgdG8gbXNnXG4gICAgICAgICAgICBleC5uYW1lID0gbnVsbDtcblxuICAgICAgICAgICAgb3B0aW9ucyA9IG9iamVjdE1lcmdlKHtcbiAgICAgICAgICAgICAgICAvLyBmaW5nZXJwcmludCBvbiBtc2csIG5vdCBzdGFjayB0cmFjZSAobGVnYWN5IGJlaGF2aW9yLCBjb3VsZCBiZVxuICAgICAgICAgICAgICAgIC8vIHJldmlzaXRlZClcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludDogbXNnLFxuICAgICAgICAgICAgICAgIHRyaW1IZWFkRnJhbWVzOiAob3B0aW9ucy50cmltSGVhZEZyYW1lcyB8fCAwKSArIDFcbiAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZShleCk7XG4gICAgICAgICAgICB2YXIgZnJhbWVzID0gdGhpcy5fcHJlcGFyZUZyYW1lcyhzdGFjaywgb3B0aW9ucyk7XG4gICAgICAgICAgICBkYXRhLnN0YWNrdHJhY2UgPSB7XG4gICAgICAgICAgICAgICAgLy8gU2VudHJ5IGV4cGVjdHMgZnJhbWVzIG9sZGVzdCB0byBuZXdlc3RcbiAgICAgICAgICAgICAgICBmcmFtZXM6IGZyYW1lcy5yZXZlcnNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcmUgYXdheSFcbiAgICAgICAgdGhpcy5fc2VuZChkYXRhKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2FwdHVyZUJyZWFkY3J1bWI6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGNydW1iID0gb2JqZWN0TWVyZ2Uoe1xuICAgICAgICAgICAgdGltZXN0YW1wOiBub3coKSAvIDEwMDBcbiAgICAgICAgfSwgb2JqKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLl9nbG9iYWxPcHRpb25zLmJyZWFkY3J1bWJDYWxsYmFjaykpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9nbG9iYWxPcHRpb25zLmJyZWFkY3J1bWJDYWxsYmFjayhjcnVtYik7XG5cbiAgICAgICAgICAgIGlmIChpc09iamVjdChyZXN1bHQpICYmICFpc0VtcHR5T2JqZWN0KHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICBjcnVtYiA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnJlYWRjcnVtYnMucHVzaChjcnVtYik7XG4gICAgICAgIGlmICh0aGlzLl9icmVhZGNydW1icy5sZW5ndGggPiB0aGlzLl9nbG9iYWxPcHRpb25zLm1heEJyZWFkY3J1bWJzKSB7XG4gICAgICAgICAgICB0aGlzLl9icmVhZGNydW1icy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBhZGRQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiAvKmFyZzEsIGFyZzIsIC4uLiBhcmdOKi8pIHtcbiAgICAgICAgdmFyIHBsdWdpbkFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICAgICAgdGhpcy5fcGx1Z2lucy5wdXNoKFtwbHVnaW4sIHBsdWdpbkFyZ3NdKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmF2ZW5JbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWluUGx1Z2lucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0L2NsZWFyIGEgdXNlciB0byBiZSBzZW50IGFsb25nIHdpdGggdGhlIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdXNlciBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHVzZXIgZGF0YSBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0VXNlckNvbnRleHQ6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgLy8gSW50ZW50aW9uYWxseSBkbyBub3QgbWVyZ2UgaGVyZSBzaW5jZSB0aGF0J3MgYW4gdW5leHBlY3RlZCBiZWhhdmlvci5cbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29udGV4dC51c2VyID0gdXNlcjtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNZXJnZSBleHRyYSBhdHRyaWJ1dGVzIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIGV4dHJhIGRhdGEgW29wdGlvbmFsXVxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHNldEV4dHJhQ29udGV4dDogZnVuY3Rpb24oZXh0cmEpIHtcbiAgICAgICAgdGhpcy5fbWVyZ2VDb250ZXh0KCdleHRyYScsIGV4dHJhKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNZXJnZSB0YWdzIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YWdzIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGFncyBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0VGFnc0NvbnRleHQ6IGZ1bmN0aW9uKHRhZ3MpIHtcbiAgICAgICAgdGhpcy5fbWVyZ2VDb250ZXh0KCd0YWdzJywgdGFncyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQ2xlYXIgYWxsIG9mIHRoZSBjb250ZXh0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY2xlYXJDb250ZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29udGV4dCA9IHt9O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldCBhIGNvcHkgb2YgdGhlIGN1cnJlbnQgY29udGV4dC4gVGhpcyBjYW5ub3QgYmUgbXV0YXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gY29weSBvZiBjb250ZXh0XG4gICAgICovXG4gICAgZ2V0Q29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGxvbCBqYXZhc2NyaXB0XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZ2lmeSh0aGlzLl9nbG9iYWxDb250ZXh0KSk7XG4gICAgfSxcblxuXG4gICAgLypcbiAgICAgKiBTZXQgZW52aXJvbm1lbnQgb2YgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbnZpcm9ubWVudCBUeXBpY2FsbHkgc29tZXRoaW5nIGxpa2UgJ3Byb2R1Y3Rpb24nLlxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHNldEVudmlyb25tZW50OiBmdW5jdGlvbihlbnZpcm9ubWVudCkge1xuICAgICAgICB0aGlzLl9nbG9iYWxPcHRpb25zLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHJlbGVhc2UgdmVyc2lvbiBvZiBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGVhc2UgVHlwaWNhbGx5IHNvbWV0aGluZyBsaWtlIGEgZ2l0IFNIQSB0byBpZGVudGlmeSB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0UmVsZWFzZTogZnVuY3Rpb24ocmVsZWFzZSkge1xuICAgICAgICB0aGlzLl9nbG9iYWxPcHRpb25zLnJlbGVhc2UgPSByZWxlYXNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCB0aGUgZGF0YUNhbGxiYWNrIG9wdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJ1biB3aGljaCBhbGxvd3MgdGhlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSBibG9iIHRvIGJlIG11dGF0ZWQgYmVmb3JlIHNlbmRpbmdcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXREYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbCA9IHRoaXMuX2dsb2JhbE9wdGlvbnMuZGF0YUNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9nbG9iYWxPcHRpb25zLmRhdGFDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spXG4gICAgICAgICAgPyBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gY2FsbGJhY2soZGF0YSwgb3JpZ2luYWwpOyB9XG4gICAgICAgICAgOiBjYWxsYmFjaztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgdGhlIGJyZWFkY3J1bWJDYWxsYmFjayBvcHRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBydW4gd2hpY2ggYWxsb3dzIGZpbHRlcmluZ1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIG11dGF0aW5nIGJyZWFkY3J1bWJzXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0QnJlYWRjcnVtYkNhbGxiYWNrOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgb3JpZ2luYWwgPSB0aGlzLl9nbG9iYWxPcHRpb25zLmJyZWFkY3J1bWJDYWxsYmFjaztcbiAgICAgICAgdGhpcy5fZ2xvYmFsT3B0aW9ucy5icmVhZGNydW1iQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKVxuICAgICAgICAgID8gZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGNhbGxiYWNrKGRhdGEsIG9yaWdpbmFsKTsgfVxuICAgICAgICAgIDogY2FsbGJhY2s7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHRoZSBzaG91bGRTZW5kQ2FsbGJhY2sgb3B0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcnVuIHdoaWNoIGFsbG93c1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludHJvc3BlY3RpbmcgdGhlIGJsb2IgYmVmb3JlIHNlbmRpbmdcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRTaG91bGRTZW5kQ2FsbGJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbCA9IHRoaXMuX2dsb2JhbE9wdGlvbnMuc2hvdWxkU2VuZENhbGxiYWNrO1xuICAgICAgICB0aGlzLl9nbG9iYWxPcHRpb25zLnNob3VsZFNlbmRDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spXG4gICAgICAgICAgICA/IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBjYWxsYmFjayhkYXRhLCBvcmlnaW5hbCk7IH1cbiAgICAgICAgICAgIDogY2FsbGJhY2s7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IEhUVFAgdHJhbnNwb3J0IG1lY2hhbmlzbSB0aGF0IHRyYW5zbWl0cyBkYXRhXG4gICAgICogdG8gdGhlIFNlbnRyeSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0cmFuc3BvcnQgRnVuY3Rpb24gaW52b2tlZCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBtYWtlUmVxdWVzdGAgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydDogZnVuY3Rpb24odHJhbnNwb3J0KSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbE9wdGlvbnMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldCB0aGUgbGF0ZXN0IHJhdyBleGNlcHRpb24gdGhhdCB3YXMgY2FwdHVyZWQgYnkgUmF2ZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtlcnJvcn1cbiAgICAgKi9cbiAgICBsYXN0RXhjZXB0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RDYXB0dXJlZEV4Y2VwdGlvbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBHZXQgdGhlIGxhc3QgZXZlbnQgaWRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBsYXN0RXZlbnRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0RXZlbnRJZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBEZXRlcm1pbmUgaWYgUmF2ZW4gaXMgc2V0dXAgYW5kIHJlYWR5IHRvIGdvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1NldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNKU09OKSByZXR1cm4gZmFsc2U7ICAvLyBuZWVkcyBKU09OIHN1cHBvcnRcbiAgICAgICAgaWYgKCF0aGlzLl9nbG9iYWxTZXJ2ZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yYXZlbk5vdENvbmZpZ3VyZWRFcnJvcikge1xuICAgICAgICAgICAgICB0aGlzLnJhdmVuTm90Q29uZmlndXJlZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fbG9nRGVidWcoJ2Vycm9yJywgJ0Vycm9yOiBSYXZlbiBoYXMgbm90IGJlZW4gY29uZmlndXJlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgYWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSB3aW5kb3cgZGVwZW5kZW5jZT9cblxuICAgICAgICAvLyBBdHRlbXB0IHRvIGluaXRpYWxpemUgUmF2ZW4gb24gbG9hZFxuICAgICAgICB2YXIgUmF2ZW5Db25maWcgPSBfd2luZG93LlJhdmVuQ29uZmlnO1xuICAgICAgICBpZiAoUmF2ZW5Db25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnKFJhdmVuQ29uZmlnLmRzbiwgUmF2ZW5Db25maWcuY29uZmlnKS5pbnN0YWxsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd1JlcG9ydERpYWxvZzogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFfZG9jdW1lbnQpIC8vIGRvZXNuJ3Qgd29yayB3aXRob3V0IGEgZG9jdW1lbnQgKFJlYWN0IG5hdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgbGFzdEV2ZW50SWQgPSBvcHRpb25zLmV2ZW50SWQgfHwgdGhpcy5sYXN0RXZlbnRJZCgpO1xuICAgICAgICBpZiAoIWxhc3RFdmVudElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmF2ZW5Db25maWdFcnJvcignTWlzc2luZyBldmVudElkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHNuID0gb3B0aW9ucy5kc24gfHwgdGhpcy5fZHNuO1xuICAgICAgICBpZiAoIWRzbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhdmVuQ29uZmlnRXJyb3IoJ01pc3NpbmcgRFNOJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5jb2RlID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuICAgICAgICB2YXIgcXMgPSAnJztcbiAgICAgICAgcXMgKz0gJz9ldmVudElkPScgKyBlbmNvZGUobGFzdEV2ZW50SWQpO1xuICAgICAgICBxcyArPSAnJmRzbj0nICsgZW5jb2RlKGRzbik7XG5cbiAgICAgICAgdmFyIHVzZXIgPSBvcHRpb25zLnVzZXIgfHwgdGhpcy5fZ2xvYmFsQ29udGV4dC51c2VyO1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgaWYgKHVzZXIubmFtZSkgIHFzICs9ICcmbmFtZT0nICsgZW5jb2RlKHVzZXIubmFtZSk7XG4gICAgICAgICAgICBpZiAodXNlci5lbWFpbCkgcXMgKz0gJyZlbWFpbD0nICsgZW5jb2RlKHVzZXIuZW1haWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdsb2JhbFNlcnZlciA9IHRoaXMuX2dldEdsb2JhbFNlcnZlcih0aGlzLl9wYXJzZURTTihkc24pKTtcblxuICAgICAgICB2YXIgc2NyaXB0ID0gX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuc3JjID0gZ2xvYmFsU2VydmVyICsgJy9hcGkvZW1iZWQvZXJyb3ItcGFnZS8nICsgcXM7XG4gICAgICAgIChfZG9jdW1lbnQuaGVhZCB8fCBfZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9LFxuXG4gICAgLyoqKiogUHJpdmF0ZSBmdW5jdGlvbnMgKioqKi9cbiAgICBfaWdub3JlTmV4dE9uRXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9pZ25vcmVPbkVycm9yICs9IDE7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gb25lcnJvciBzaG91bGQgdHJpZ2dlciBiZWZvcmUgc2V0VGltZW91dFxuICAgICAgICAgICAgc2VsZi5faWdub3JlT25FcnJvciAtPSAxO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX3RyaWdnZXJFdmVudDogZnVuY3Rpb24oZXZlbnRUeXBlLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIE5PVEU6IGBldmVudGAgaXMgYSBuYXRpdmUgYnJvd3NlciB0aGluZywgc28gbGV0J3MgYXZvaWQgY29uZmxpY3Rpbmcgd2lodCBpdFxuICAgICAgICB2YXIgZXZ0LCBrZXk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9oYXNEb2N1bWVudClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBldmVudFR5cGUgPSAncmF2ZW4nICsgZXZlbnRUeXBlLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkgKyBldmVudFR5cGUuc3Vic3RyKDEpO1xuXG4gICAgICAgIGlmIChfZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgIGV2dCA9IF9kb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZ0ID0gX2RvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgICAgICBldnQuZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChrZXkgaW4gb3B0aW9ucykgaWYgKGhhc0tleShvcHRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgICBldnRba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgIC8vIElFOSBpZiBzdGFuZGFyZHNcbiAgICAgICAgICAgIF9kb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJRTggcmVnYXJkbGVzcyBvZiBRdWlya3Mgb3IgU3RhbmRhcmRzXG4gICAgICAgICAgICAvLyBJRTkgaWYgcXVpcmtzXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF9kb2N1bWVudC5maXJlRXZlbnQoJ29uJyArIGV2dC5ldmVudFR5cGUudG9Mb3dlckNhc2UoKSwgZXZ0KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdGhpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhZGRFdmVudExpc3RlbmVyIHRvIGNhcHR1cmUgVUkgYnJlYWRjcnVtYnNcbiAgICAgKiBAcGFyYW0gZXZ0TmFtZSB0aGUgZXZlbnQgbmFtZSAoZS5nLiBcImNsaWNrXCIpXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2JyZWFkY3J1bWJFdmVudEhhbmRsZXI6IGZ1bmN0aW9uKGV2dE5hbWUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgLy8gcmVzZXQga2V5cHJlc3MgdGltZW91dDsgZS5nLiB0cmlnZ2VyaW5nIGEgJ2NsaWNrJyBhZnRlclxuICAgICAgICAgICAgLy8gYSAna2V5cHJlc3MnIHdpbGwgcmVzZXQgdGhlIGtleXByZXNzIGRlYm91bmNlIHNvIHRoYXQgYSBuZXdcbiAgICAgICAgICAgIC8vIHNldCBvZiBrZXlwcmVzc2VzIGNhbiBiZSByZWNvcmRlZFxuICAgICAgICAgICAgc2VsZi5fa2V5cHJlc3NUaW1lb3V0ID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSXQncyBwb3NzaWJsZSB0aGlzIGhhbmRsZXIgbWlnaHQgdHJpZ2dlciBtdWx0aXBsZSB0aW1lcyBmb3IgdGhlIHNhbWVcbiAgICAgICAgICAgIC8vIGV2ZW50IChlLmcuIGV2ZW50IHByb3BhZ2F0aW9uIHRocm91Z2ggbm9kZSBhbmNlc3RvcnMpLiBJZ25vcmUgaWYgd2UndmVcbiAgICAgICAgICAgIC8vIGFscmVhZHkgY2FwdHVyZWQgdGhlIGV2ZW50LlxuICAgICAgICAgICAgaWYgKHNlbGYuX2xhc3RDYXB0dXJlZEV2ZW50ID09PSBldnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBzZWxmLl9sYXN0Q2FwdHVyZWRFdmVudCA9IGV2dDtcbiAgICAgICAgICAgIHZhciBlbGVtID0gZXZ0LnRhcmdldDtcblxuICAgICAgICAgICAgdmFyIHRhcmdldDtcblxuICAgICAgICAgICAgLy8gdHJ5L2NhdGNoIGh0bWxUcmVlQXNTdHJpbmcgYmVjYXVzZSBpdCdzIHBhcnRpY3VsYXJseSBjb21wbGljYXRlZCwgYW5kXG4gICAgICAgICAgICAvLyBqdXN0IGFjY2Vzc2luZyB0aGUgRE9NIGluY29ycmVjdGx5IGNhbiB0aHJvdyBhbiBleGNlcHRpb24gaW4gc29tZSBjaXJjdW1zdGFuY2VzLlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBodG1sVHJlZUFzU3RyaW5nKGVsZW0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9ICc8dW5rbm93bj4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmNhcHR1cmVCcmVhZGNydW1iKHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3VpLicgKyBldnROYW1lLCAvLyBlLmcuIHVpLmNsaWNrLCB1aS5pbnB1dFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGFkZEV2ZW50TGlzdGVuZXIgdG8gY2FwdHVyZSBrZXlwcmVzcyBVSSBldmVudHNcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfa2V5cHJlc3NFdmVudEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBkZWJvdW5jZUR1cmF0aW9uID0gMTAwMDsgLy8gbWlsbGlzZWNvbmRzXG5cbiAgICAgICAgLy8gVE9ETzogaWYgc29tZWhvdyB1c2VyIHN3aXRjaGVzIGtleXByZXNzIHRhcmdldCBiZWZvcmVcbiAgICAgICAgLy8gICAgICAgZGVib3VuY2UgdGltZW91dCBpcyB0cmlnZ2VyZWQsIHdlIHdpbGwgb25seSBjYXB0dXJlXG4gICAgICAgIC8vICAgICAgIGEgc2luZ2xlIGJyZWFkY3J1bWIgZnJvbSB0aGUgRklSU1QgdGFyZ2V0IChhY2NlcHRhYmxlPylcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWU7XG5cbiAgICAgICAgICAgIC8vIG9ubHkgY29uc2lkZXIga2V5cHJlc3MgZXZlbnRzIG9uIGFjdHVhbCBpbnB1dCBlbGVtZW50c1xuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIGRpc3JlZ2FyZCBrZXlwcmVzc2VzIHRhcmdldGluZyBib2R5IChlLmcuIHRhYmJpbmdcbiAgICAgICAgICAgIC8vIHRocm91Z2ggZWxlbWVudHMsIGhvdGtleXMsIGV0YylcbiAgICAgICAgICAgIGlmICghdGFnTmFtZSB8fCB0YWdOYW1lICE9PSAnSU5QVVQnICYmIHRhZ05hbWUgIT09ICdURVhUQVJFQScgJiYgIXRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIHJlY29yZCBmaXJzdCBrZXlwcmVzcyBpbiBhIHNlcmllcywgYnV0IGlnbm9yZSBzdWJzZXF1ZW50XG4gICAgICAgICAgICAvLyBrZXlwcmVzc2VzIHVudGlsIGRlYm91bmNlIGNsZWFyc1xuICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBzZWxmLl9rZXlwcmVzc1RpbWVvdXQ7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9icmVhZGNydW1iRXZlbnRIYW5kbGVyKCdpbnB1dCcpKGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICBzZWxmLl9rZXlwcmVzc1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9rZXlwcmVzc1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfSwgZGVib3VuY2VEdXJhdGlvbik7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhcHR1cmVzIGEgYnJlYWRjcnVtYiBvZiB0eXBlIFwibmF2aWdhdGlvblwiLCBub3JtYWxpemluZyBpbnB1dCBVUkxzXG4gICAgICogQHBhcmFtIHRvIHRoZSBvcmlnaW5hdGluZyBVUkxcbiAgICAgKiBAcGFyYW0gZnJvbSB0aGUgdGFyZ2V0IFVSTFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NhcHR1cmVVcmxDaGFuZ2U6IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gICAgICAgIHZhciBwYXJzZWRMb2MgPSBwYXJzZVVybCh0aGlzLl9sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgdmFyIHBhcnNlZFRvID0gcGFyc2VVcmwodG8pO1xuICAgICAgICB2YXIgcGFyc2VkRnJvbSA9IHBhcnNlVXJsKGZyb20pO1xuXG4gICAgICAgIC8vIGJlY2F1c2Ugb25wb3BzdGF0ZSBvbmx5IHRlbGxzIHlvdSB0aGUgXCJuZXdcIiAodG8pIHZhbHVlIG9mIGxvY2F0aW9uLmhyZWYsIGFuZFxuICAgICAgICAvLyBub3QgdGhlIHByZXZpb3VzIChmcm9tKSB2YWx1ZSwgd2UgbmVlZCB0byB0cmFjayB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnQgVVJMXG4gICAgICAgIC8vIHN0YXRlIG91cnNlbHZlc1xuICAgICAgICB0aGlzLl9sYXN0SHJlZiA9IHRvO1xuXG4gICAgICAgIC8vIFVzZSBvbmx5IHRoZSBwYXRoIGNvbXBvbmVudCBvZiB0aGUgVVJMIGlmIHRoZSBVUkwgbWF0Y2hlcyB0aGUgY3VycmVudFxuICAgICAgICAvLyBkb2N1bWVudCAoYWxtb3N0IGFsbCB0aGUgdGltZSB3aGVuIHVzaW5nIHB1c2hTdGF0ZSlcbiAgICAgICAgaWYgKHBhcnNlZExvYy5wcm90b2NvbCA9PT0gcGFyc2VkVG8ucHJvdG9jb2wgJiYgcGFyc2VkTG9jLmhvc3QgPT09IHBhcnNlZFRvLmhvc3QpXG4gICAgICAgICAgICB0byA9IHBhcnNlZFRvLnJlbGF0aXZlO1xuICAgICAgICBpZiAocGFyc2VkTG9jLnByb3RvY29sID09PSBwYXJzZWRGcm9tLnByb3RvY29sICYmIHBhcnNlZExvYy5ob3N0ID09PSBwYXJzZWRGcm9tLmhvc3QpXG4gICAgICAgICAgICBmcm9tID0gcGFyc2VkRnJvbS5yZWxhdGl2ZTtcblxuICAgICAgICB0aGlzLmNhcHR1cmVCcmVhZGNydW1iKHtcbiAgICAgICAgICAgIGNhdGVnb3J5OiAnbmF2aWdhdGlvbicsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgdG86IHRvLFxuICAgICAgICAgICAgICAgIGZyb206IGZyb21cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEluc3RhbGwgYW55IHF1ZXVlZCBwbHVnaW5zXG4gICAgICovXG4gICAgX2luc3RydW1lbnRUcnlDYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgd3JhcHBlZEJ1aWx0SW5zID0gc2VsZi5fd3JhcHBlZEJ1aWx0SW5zO1xuXG4gICAgICAgIGZ1bmN0aW9uIHdyYXBUaW1lRm4ob3JpZykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmbiwgdCkgeyAvLyBwcmVzZXJ2ZSBhcml0eVxuICAgICAgICAgICAgICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBhcmd1bWVudHMgdG8gcHJldmVudCBkZW9wdGltaXphdGlvblxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzMi1sZWFraW5nLWFyZ3VtZW50c1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbENhbGxiYWNrID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihvcmlnaW5hbENhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzWzBdID0gc2VsZi53cmFwKG9yaWdpbmFsQ2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElFIDwgOSBkb2Vzbid0IHN1cHBvcnQgLmNhbGwvLmFwcGx5IG9uIHNldEludGVydmFsL3NldFRpbWVvdXQsIGJ1dCBpdFxuICAgICAgICAgICAgICAgIC8vIGFsc28gc3VwcG9ydHMgb25seSB0d28gYXJndW1lbnRzIGFuZCBkb2Vzbid0IGNhcmUgd2hhdCB0aGlzIGlzLCBzbyB3ZVxuICAgICAgICAgICAgICAgIC8vIGNhbiBqdXN0IGNhbGwgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRpcmVjdGx5LlxuICAgICAgICAgICAgICAgIGlmIChvcmlnLmFwcGx5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXV0b0JyZWFkY3J1bWJzID0gdGhpcy5fZ2xvYmFsT3B0aW9ucy5hdXRvQnJlYWRjcnVtYnM7XG5cbiAgICAgICAgZnVuY3Rpb24gd3JhcEV2ZW50VGFyZ2V0KGdsb2JhbCkge1xuICAgICAgICAgICAgdmFyIHByb3RvID0gX3dpbmRvd1tnbG9iYWxdICYmIF93aW5kb3dbZ2xvYmFsXS5wcm90b3R5cGU7XG4gICAgICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uaGFzT3duUHJvcGVydHkgJiYgcHJvdG8uaGFzT3duUHJvcGVydHkoJ2FkZEV2ZW50TGlzdGVuZXInKSkge1xuICAgICAgICAgICAgICAgIGZpbGwocHJvdG8sICdhZGRFdmVudExpc3RlbmVyJywgZnVuY3Rpb24ob3JpZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2dE5hbWUsIGZuLCBjYXB0dXJlLCBzZWN1cmUpIHsgLy8gcHJlc2VydmUgYXJpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZuICYmIGZuLmhhbmRsZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmhhbmRsZUV2ZW50ID0gc2VsZi53cmFwKGZuLmhhbmRsZUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW4gc29tZXRpbWVzIGdldCAnUGVybWlzc2lvbiBkZW5pZWQgdG8gYWNjZXNzIHByb3BlcnR5IFwiaGFuZGxlIEV2ZW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb3JlIGJyZWFkY3J1bWIgRE9NIGNhcHR1cmUgLi4uIGRvbmUgaGVyZSBhbmQgbm90IGluIGBfaW5zdHJ1bWVudEJyZWFkY3J1bWJzYFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gdGhhdCB3ZSBkb24ndCBoYXZlIG1vcmUgdGhhbiBvbmUgd3JhcHBlciBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJlZm9yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja0hhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3NIYW5kbGVyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXV0b0JyZWFkY3J1bWJzICYmIGF1dG9CcmVhZGNydW1icy5kb20gJiYgKGdsb2JhbCA9PT0gJ0V2ZW50VGFyZ2V0JyB8fCBnbG9iYWwgPT09ICdOb2RlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBnZW5lcmF0aW5nIG11bHRpcGxlIGhhbmRsZXJzIHBlciBhZGRFdmVudExpc3RlbmVyIGludm9jYXRpb24sIHNob3VsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHJldmlzaXQgYW5kIHZlcmlmeSB3ZSBjYW4ganVzdCB1c2Ugb25lIChhbG1vc3QgY2VydGFpbmx5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrSGFuZGxlciA9IHNlbGYuX2JyZWFkY3J1bWJFdmVudEhhbmRsZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3NIYW5kbGVyID0gc2VsZi5fa2V5cHJlc3NFdmVudEhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmUgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gaW50ZXJjZXB0IGV2ZXJ5IERPTSBldmVudCBpbiBgYmVmb3JlYCBhcmd1bWVudCwgaW4gY2FzZSB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhbWUgd3JhcHBlZCBtZXRob2QgaXMgcmUtdXNlZCBmb3IgZGlmZmVyZW50IGV2ZW50cyAoZS5nLiBtb3VzZW1vdmUgVEhFTiBjbGljaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VlICM3MjRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldnQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xpY2tIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2dC50eXBlID09PSAna2V5cHJlc3MnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleXByZXNzSGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZy5jYWxsKHRoaXMsIGV2dE5hbWUsIHNlbGYud3JhcChmbiwgdW5kZWZpbmVkLCBiZWZvcmUpLCBjYXB0dXJlLCBzZWN1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sIHdyYXBwZWRCdWlsdElucyk7XG4gICAgICAgICAgICAgICAgZmlsbChwcm90bywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCBmdW5jdGlvbiAob3JpZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2dCwgZm4sIGNhcHR1cmUsIHNlY3VyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiA9IGZuICYmIChmbi5fX3JhdmVuX3dyYXBwZXJfXyA/IGZuLl9fcmF2ZW5fd3JhcHBlcl9fICA6IGZuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUsIGFjY2Vzc2luZyBfX3JhdmVuX3dyYXBwZXJfXyB3aWxsIHRocm93IGluIHNvbWUgU2VsZW5pdW0gZW52aXJvbm1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZy5jYWxsKHRoaXMsIGV2dCwgZm4sIGNhcHR1cmUsIHNlY3VyZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSwgd3JhcHBlZEJ1aWx0SW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZpbGwoX3dpbmRvdywgJ3NldFRpbWVvdXQnLCB3cmFwVGltZUZuLCB3cmFwcGVkQnVpbHRJbnMpO1xuICAgICAgICBmaWxsKF93aW5kb3csICdzZXRJbnRlcnZhbCcsIHdyYXBUaW1lRm4sIHdyYXBwZWRCdWlsdElucyk7XG4gICAgICAgIGlmIChfd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgICAgZmlsbChfd2luZG93LCAncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgZnVuY3Rpb24gKG9yaWcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnKHNlbGYud3JhcChjYikpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCB3cmFwcGVkQnVpbHRJbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXZlbnQgdGFyZ2V0cyBib3Jyb3dlZCBmcm9tIGJ1Z3NuYWctanM6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9idWdzbmFnL2J1Z3NuYWctanMvYmxvYi9tYXN0ZXIvc3JjL2J1Z3NuYWcuanMjTDY2NlxuICAgICAgICB2YXIgZXZlbnRUYXJnZXRzID0gWydFdmVudFRhcmdldCcsICdXaW5kb3cnLCAnTm9kZScsICdBcHBsaWNhdGlvbkNhY2hlJywgJ0F1ZGlvVHJhY2tMaXN0JywgJ0NoYW5uZWxNZXJnZXJOb2RlJywgJ0NyeXB0b09wZXJhdGlvbicsICdFdmVudFNvdXJjZScsICdGaWxlUmVhZGVyJywgJ0hUTUxVbmtub3duRWxlbWVudCcsICdJREJEYXRhYmFzZScsICdJREJSZXF1ZXN0JywgJ0lEQlRyYW5zYWN0aW9uJywgJ0tleU9wZXJhdGlvbicsICdNZWRpYUNvbnRyb2xsZXInLCAnTWVzc2FnZVBvcnQnLCAnTW9kYWxXaW5kb3cnLCAnTm90aWZpY2F0aW9uJywgJ1NWR0VsZW1lbnRJbnN0YW5jZScsICdTY3JlZW4nLCAnVGV4dFRyYWNrJywgJ1RleHRUcmFja0N1ZScsICdUZXh0VHJhY2tMaXN0JywgJ1dlYlNvY2tldCcsICdXZWJTb2NrZXRXb3JrZXInLCAnV29ya2VyJywgJ1hNTEh0dHBSZXF1ZXN0JywgJ1hNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQnLCAnWE1MSHR0cFJlcXVlc3RVcGxvYWQnXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudFRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHdyYXBFdmVudFRhcmdldChldmVudFRhcmdldHNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICQgPSBfd2luZG93LmpRdWVyeSB8fCBfd2luZG93LiQ7XG4gICAgICAgIGlmICgkICYmICQuZm4gJiYgJC5mbi5yZWFkeSkge1xuICAgICAgICAgICAgZmlsbCgkLmZuLCAncmVhZHknLCBmdW5jdGlvbiAob3JpZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWcuY2FsbCh0aGlzLCBzZWxmLndyYXAoZm4pKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgd3JhcHBlZEJ1aWx0SW5zKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEluc3RydW1lbnQgYnJvd3NlciBidWlsdC1pbnMgdy8gYnJlYWRjcnVtYiBjYXB0dXJpbmdcbiAgICAgKiAgLSBYTUxIdHRwUmVxdWVzdHNcbiAgICAgKiAgLSBET00gaW50ZXJhY3Rpb25zIChjbGljay90eXBpbmcpXG4gICAgICogIC0gd2luZG93LmxvY2F0aW9uIGNoYW5nZXNcbiAgICAgKiAgLSBjb25zb2xlXG4gICAgICpcbiAgICAgKiBDYW4gYmUgZGlzYWJsZWQgb3IgaW5kaXZpZHVhbGx5IGNvbmZpZ3VyZWQgdmlhIHRoZSBgYXV0b0JyZWFkY3J1bWJzYCBjb25maWcgb3B0aW9uXG4gICAgICovXG4gICAgX2luc3RydW1lbnRCcmVhZGNydW1iczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBhdXRvQnJlYWRjcnVtYnMgPSB0aGlzLl9nbG9iYWxPcHRpb25zLmF1dG9CcmVhZGNydW1icztcblxuICAgICAgICB2YXIgd3JhcHBlZEJ1aWx0SW5zID0gc2VsZi5fd3JhcHBlZEJ1aWx0SW5zO1xuXG4gICAgICAgIGZ1bmN0aW9uIHdyYXBQcm9wKHByb3AsIHhocikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4geGhyICYmIGlzRnVuY3Rpb24oeGhyW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgIGZpbGwoeGhyLCBwcm9wLCBmdW5jdGlvbiAob3JpZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi53cmFwKG9yaWcpO1xuICAgICAgICAgICAgICAgIH0pOyAvLyBpbnRlbnRpb25hbGx5IGRvbid0IHRyYWNrIGZpbGxlZCBtZXRob2RzIG9uIFhIUiBpbnN0YW5jZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdXRvQnJlYWRjcnVtYnMueGhyICYmICdYTUxIdHRwUmVxdWVzdCcgaW4gX3dpbmRvdykge1xuICAgICAgICAgICAgdmFyIHhocnByb3RvID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlO1xuICAgICAgICAgICAgZmlsbCh4aHJwcm90bywgJ29wZW4nLCBmdW5jdGlvbihvcmlnT3Blbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kLCB1cmwpIHsgLy8gcHJlc2VydmUgYXJpdHlcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTZW50cnkga2V5IGFwcGVhcnMgaW4gVVJMLCBkb24ndCBjYXB0dXJlXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyh1cmwpICYmIHVybC5pbmRleE9mKHNlbGYuX2dsb2JhbEtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fcmF2ZW5feGhyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c19jb2RlOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdPcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIHdyYXBwZWRCdWlsdElucyk7XG5cbiAgICAgICAgICAgIGZpbGwoeGhycHJvdG8sICdzZW5kJywgZnVuY3Rpb24ob3JpZ1NlbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHsgLy8gcHJlc2VydmUgYXJpdHlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gb25yZWFkeXN0YXRlY2hhbmdlSGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIuX19yYXZlbl94aHIgJiYgKHhoci5yZWFkeVN0YXRlID09PSAxIHx8IHhoci5yZWFkeVN0YXRlID09PSA0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvdWNoaW5nIHN0YXR1c0NvZGUgaW4gc29tZSBwbGF0Zm9ybXMgdGhyb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuIGV4Y2VwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuX19yYXZlbl94aHIuc3RhdHVzX2NvZGUgPSB4aHIuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgLyogZG8gbm90aGluZyAqLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYXB0dXJlQnJlYWRjcnVtYih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdodHRwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd4aHInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB4aHIuX19yYXZlbl94aHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IFsnb25sb2FkJywgJ29uZXJyb3InLCAnb25wcm9ncmVzcyddO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHByb3BzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwUHJvcChwcm9wc1tqXSwgeGhyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiB4aHIgJiYgaXNGdW5jdGlvbih4aHIub25yZWFkeXN0YXRlY2hhbmdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbCh4aHIsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiAob3JpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLndyYXAob3JpZywgdW5kZWZpbmVkLCBvbnJlYWR5c3RhdGVjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gLyogaW50ZW50aW9uYWxseSBkb24ndCB0cmFjayB0aGlzIGluc3RydW1lbnRhdGlvbiAqLyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBvbnJlYWR5c3RhdGVjaGFuZ2Ugd2Fzbid0IGFjdHVhbGx5IHNldCBieSB0aGUgcGFnZSBvbiB0aGlzIHhociwgd2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFyZSBmcmVlIHRvIHNldCBvdXIgb3duIGFuZCBjYXB0dXJlIHRoZSBicmVhZGNydW1iXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gb25yZWFkeXN0YXRlY2hhbmdlSGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnU2VuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCB3cmFwcGVkQnVpbHRJbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF1dG9CcmVhZGNydW1icy54aHIgJiYgJ2ZldGNoJyBpbiBfd2luZG93KSB7XG4gICAgICAgICAgICBmaWxsKF93aW5kb3csICdmZXRjaCcsIGZ1bmN0aW9uKG9yaWdGZXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZm4sIHQpIHsgLy8gcHJlc2VydmUgYXJpdHlcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhIGNvcHkgb2YgdGhlIGFyZ3VtZW50cyB0byBwcmV2ZW50IGRlb3B0aW1pemF0aW9uXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzMi1sZWFraW5nLWFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gJ0dFVCc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0gJiYgYXJnc1sxXS5tZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCA9IGFyZ3NbMV0ubWV0aG9kO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZldGNoRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzX2NvZGU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhcHR1cmVCcmVhZGNydW1iKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdodHRwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZmV0Y2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZmV0Y2hEYXRhXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnRmV0Y2guYXBwbHkodGhpcywgYXJncykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoRGF0YS5zdGF0dXNfY29kZSA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgd3JhcHBlZEJ1aWx0SW5zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhcHR1cmUgYnJlYWRjcnVtYnMgZnJvbSBhbnkgY2xpY2sgdGhhdCBpcyB1bmhhbmRsZWQgLyBidWJibGVkIHVwIGFsbCB0aGUgd2F5XG4gICAgICAgIC8vIHRvIHRoZSBkb2N1bWVudC4gRG8gdGhpcyBiZWZvcmUgd2UgaW5zdHJ1bWVudCBhZGRFdmVudExpc3RlbmVyLlxuICAgICAgICBpZiAoYXV0b0JyZWFkY3J1bWJzLmRvbSAmJiB0aGlzLl9oYXNEb2N1bWVudCkge1xuICAgICAgICAgICAgaWYgKF9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZi5fYnJlYWRjcnVtYkV2ZW50SGFuZGxlcignY2xpY2snKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIF9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHNlbGYuX2tleXByZXNzRXZlbnRIYW5kbGVyKCksIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElFOCBDb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgX2RvY3VtZW50LmF0dGFjaEV2ZW50KCdvbmNsaWNrJywgc2VsZi5fYnJlYWRjcnVtYkV2ZW50SGFuZGxlcignY2xpY2snKSk7XG4gICAgICAgICAgICAgICAgX2RvY3VtZW50LmF0dGFjaEV2ZW50KCdvbmtleXByZXNzJywgc2VsZi5fa2V5cHJlc3NFdmVudEhhbmRsZXIoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWNvcmQgbmF2aWdhdGlvbiAoVVJMKSBjaGFuZ2VzXG4gICAgICAgIC8vIE5PVEU6IGluIENocm9tZSBBcHAgZW52aXJvbm1lbnQsIHRvdWNoaW5nIGhpc3RvcnkucHVzaFN0YXRlLCAqZXZlbiBpbnNpZGVcbiAgICAgICAgLy8gICAgICAgYSB0cnkvY2F0Y2ggYmxvY2sqLCB3aWxsIGNhdXNlIENocm9tZSB0byBvdXRwdXQgYW4gZXJyb3IgdG8gY29uc29sZS5lcnJvclxuICAgICAgICAvLyBib3Jyb3dlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLmpzL3B1bGwvMTM5NDUvZmlsZXNcbiAgICAgICAgdmFyIGNocm9tZSA9IF93aW5kb3cuY2hyb21lO1xuICAgICAgICB2YXIgaXNDaHJvbWVQYWNrYWdlZEFwcCA9IGNocm9tZSAmJiBjaHJvbWUuYXBwICYmIGNocm9tZS5hcHAucnVudGltZTtcbiAgICAgICAgdmFyIGhhc1B1c2hTdGF0ZSA9ICFpc0Nocm9tZVBhY2thZ2VkQXBwICYmIF93aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnB1c2hTdGF0ZTtcbiAgICAgICAgaWYgKGF1dG9CcmVhZGNydW1icy5sb2NhdGlvbiAmJiBoYXNQdXNoU3RhdGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IHJlbW92ZSBvbnBvcHN0YXRlIGhhbmRsZXIgb24gdW5pbnN0YWxsKClcbiAgICAgICAgICAgIHZhciBvbGRPblBvcFN0YXRlID0gX3dpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgICAgICAgX3dpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SHJlZiA9IHNlbGYuX2xvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2FwdHVyZVVybENoYW5nZShzZWxmLl9sYXN0SHJlZiwgY3VycmVudEhyZWYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9sZE9uUG9wU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9sZE9uUG9wU3RhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmaWxsKGhpc3RvcnksICdwdXNoU3RhdGUnLCBmdW5jdGlvbiAob3JpZ1B1c2hTdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIG5vdGUgaGlzdG9yeS5wdXNoU3RhdGUubGVuZ3RoIGlzIDA7IGludGVudGlvbmFsbHkgbm90IGRlY2xhcmluZ1xuICAgICAgICAgICAgICAgIC8vIHBhcmFtcyB0byBwcmVzZXJ2ZSAwIGFyaXR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgvKiBzdGF0ZSwgdGl0bGUsIHVybCAqLykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsIGFyZ3VtZW50IGlzIG9wdGlvbmFsXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvZXJjZSB0byBzdHJpbmcgKHRoaXMgaXMgd2hhdCBwdXNoU3RhdGUgZG9lcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2NhcHR1cmVVcmxDaGFuZ2Uoc2VsZi5fbGFzdEhyZWYsIHVybCArICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnUHVzaFN0YXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIHdyYXBwZWRCdWlsdElucyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXV0b0JyZWFkY3J1bWJzLmNvbnNvbGUgJiYgJ2NvbnNvbGUnIGluIF93aW5kb3cgJiYgY29uc29sZS5sb2cpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGVcbiAgICAgICAgICAgIHZhciBjb25zb2xlTWV0aG9kQ2FsbGJhY2sgPSBmdW5jdGlvbiAobXNnLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jYXB0dXJlQnJlYWRjcnVtYih7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IGRhdGEubGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnY29uc29sZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGVhY2goWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InLCAnbG9nJ10sIGZ1bmN0aW9uIChfLCBsZXZlbCkge1xuICAgICAgICAgICAgICAgIHdyYXBDb25zb2xlTWV0aG9kKGNvbnNvbGUsIGxldmVsLCBjb25zb2xlTWV0aG9kQ2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBfcmVzdG9yZUJ1aWx0SW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJlc3RvcmUgYW55IHdyYXBwZWQgYnVpbHRpbnNcbiAgICAgICAgdmFyIGJ1aWx0aW47XG4gICAgICAgIHdoaWxlICh0aGlzLl93cmFwcGVkQnVpbHRJbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBidWlsdGluID0gdGhpcy5fd3JhcHBlZEJ1aWx0SW5zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIHZhciBvYmogPSBidWlsdGluWzBdLFxuICAgICAgICAgICAgICBuYW1lID0gYnVpbHRpblsxXSxcbiAgICAgICAgICAgICAgb3JpZyA9IGJ1aWx0aW5bMl07XG5cbiAgICAgICAgICAgIG9ialtuYW1lXSA9IG9yaWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RyYWluUGx1Z2luczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBGSVggTUUgVE9ET1xuICAgICAgICBlYWNoKHRoaXMuX3BsdWdpbnMsIGZ1bmN0aW9uKF8sIHBsdWdpbikge1xuICAgICAgICAgICAgdmFyIGluc3RhbGxlciA9IHBsdWdpblswXTtcbiAgICAgICAgICAgIHZhciBhcmdzID0gcGx1Z2luWzFdO1xuICAgICAgICAgICAgaW5zdGFsbGVyLmFwcGx5KHNlbGYsIFtzZWxmXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX3BhcnNlRFNOOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgdmFyIG0gPSBkc25QYXR0ZXJuLmV4ZWMoc3RyKSxcbiAgICAgICAgICAgIGRzbiA9IHt9LFxuICAgICAgICAgICAgaSA9IDc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIGRzbltkc25LZXlzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhdmVuQ29uZmlnRXJyb3IoJ0ludmFsaWQgRFNOOiAnICsgc3RyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkc24ucGFzcyAmJiAhdGhpcy5fZ2xvYmFsT3B0aW9ucy5hbGxvd1NlY3JldEtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhdmVuQ29uZmlnRXJyb3IoJ0RvIG5vdCBzcGVjaWZ5IHlvdXIgc2VjcmV0IGtleSBpbiB0aGUgRFNOLiBTZWU6IGh0dHA6Ly9iaXQubHkvcmF2ZW4tc2VjcmV0LWtleScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRzbjtcbiAgICB9LFxuXG4gICAgX2dldEdsb2JhbFNlcnZlcjogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIC8vIGFzc2VtYmxlIHRoZSBlbmRwb2ludCBmcm9tIHRoZSB1cmkgcGllY2VzXG4gICAgICAgIHZhciBnbG9iYWxTZXJ2ZXIgPSAnLy8nICsgdXJpLmhvc3QgK1xuICAgICAgICAgICAgKHVyaS5wb3J0ID8gJzonICsgdXJpLnBvcnQgOiAnJyk7XG5cbiAgICAgICAgaWYgKHVyaS5wcm90b2NvbCkge1xuICAgICAgICAgICAgZ2xvYmFsU2VydmVyID0gdXJpLnByb3RvY29sICsgJzonICsgZ2xvYmFsU2VydmVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnbG9iYWxTZXJ2ZXI7XG4gICAgfSxcblxuICAgIF9oYW5kbGVPbkVycm9yU3RhY2tJbmZvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gaWYgd2UgYXJlIGludGVudGlvbmFsbHkgaWdub3JpbmcgZXJyb3JzIHZpYSBvbmVycm9yLCBiYWlsIG91dFxuICAgICAgICBpZiAoIXRoaXMuX2lnbm9yZU9uRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVN0YWNrSW5mby5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9oYW5kbGVTdGFja0luZm86IGZ1bmN0aW9uKHN0YWNrSW5mbywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZnJhbWVzID0gdGhpcy5fcHJlcGFyZUZyYW1lcyhzdGFja0luZm8sIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudCgnaGFuZGxlJywge1xuICAgICAgICAgICAgc3RhY2tJbmZvOiBzdGFja0luZm8sXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NFeGNlcHRpb24oXG4gICAgICAgICAgICBzdGFja0luZm8ubmFtZSxcbiAgICAgICAgICAgIHN0YWNrSW5mby5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2tJbmZvLnVybCxcbiAgICAgICAgICAgIHN0YWNrSW5mby5saW5lbm8sXG4gICAgICAgICAgICBmcmFtZXMsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIF9wcmVwYXJlRnJhbWVzOiBmdW5jdGlvbihzdGFja0luZm8sIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZnJhbWVzID0gW107XG4gICAgICAgIGlmIChzdGFja0luZm8uc3RhY2sgJiYgc3RhY2tJbmZvLnN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgZWFjaChzdGFja0luZm8uc3RhY2ssIGZ1bmN0aW9uKGksIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyYW1lID0gc2VsZi5fbm9ybWFsaXplRnJhbWUoc3RhY2spO1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGUuZy4gZnJhbWVzIGNhcHR1cmVkIHZpYSBjYXB0dXJlTWVzc2FnZSB0aHJvd1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy50cmltSGVhZEZyYW1lcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb3B0aW9ucy50cmltSGVhZEZyYW1lcyAmJiBqIDwgZnJhbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lc1tqXS5pbl9hcHAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnJhbWVzID0gZnJhbWVzLnNsaWNlKDAsIHRoaXMuX2dsb2JhbE9wdGlvbnMuc3RhY2tUcmFjZUxpbWl0KTtcbiAgICAgICAgcmV0dXJuIGZyYW1lcztcbiAgICB9LFxuXG5cbiAgICBfbm9ybWFsaXplRnJhbWU6IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgIGlmICghZnJhbWUudXJsKSByZXR1cm47XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIHRoZSBmcmFtZXMgZGF0YVxuICAgICAgICB2YXIgbm9ybWFsaXplZCA9IHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiAgIGZyYW1lLnVybCxcbiAgICAgICAgICAgIGxpbmVubzogICAgIGZyYW1lLmxpbmUsXG4gICAgICAgICAgICBjb2xubzogICAgICBmcmFtZS5jb2x1bW4sXG4gICAgICAgICAgICAnZnVuY3Rpb24nOiBmcmFtZS5mdW5jIHx8ICc/J1xuICAgICAgICB9O1xuXG4gICAgICAgIG5vcm1hbGl6ZWQuaW5fYXBwID0gISggLy8gZGV0ZXJtaW5lIGlmIGFuIGV4Y2VwdGlvbiBjYW1lIGZyb20gb3V0c2lkZSBvZiBvdXIgYXBwXG4gICAgICAgICAgICAvLyBmaXJzdCB3ZSBjaGVjayB0aGUgZ2xvYmFsIGluY2x1ZGVQYXRocyBsaXN0LlxuICAgICAgICAgICAgISF0aGlzLl9nbG9iYWxPcHRpb25zLmluY2x1ZGVQYXRocy50ZXN0ICYmICF0aGlzLl9nbG9iYWxPcHRpb25zLmluY2x1ZGVQYXRocy50ZXN0KG5vcm1hbGl6ZWQuZmlsZW5hbWUpIHx8XG4gICAgICAgICAgICAvLyBOb3cgd2UgY2hlY2sgZm9yIGZ1biwgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaXMgUmF2ZW4gb3IgVHJhY2VLaXRcbiAgICAgICAgICAgIC8oUmF2ZW58VHJhY2VLaXQpXFwuLy50ZXN0KG5vcm1hbGl6ZWRbJ2Z1bmN0aW9uJ10pIHx8XG4gICAgICAgICAgICAvLyBmaW5hbGx5LCB3ZSBkbyBhIGxhc3QgZGl0Y2ggZWZmb3J0IGFuZCBjaGVjayBmb3IgcmF2ZW4ubWluLmpzXG4gICAgICAgICAgICAvcmF2ZW5cXC4obWluXFwuKT9qcyQvLnRlc3Qobm9ybWFsaXplZC5maWxlbmFtZSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgICB9LFxuXG4gICAgX3Byb2Nlc3NFeGNlcHRpb246IGZ1bmN0aW9uKHR5cGUsIG1lc3NhZ2UsIGZpbGV1cmwsIGxpbmVubywgZnJhbWVzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzdGFja3RyYWNlO1xuICAgICAgICBpZiAoISF0aGlzLl9nbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy50ZXN0ICYmIHRoaXMuX2dsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnRlc3QobWVzc2FnZSkpIHJldHVybjtcblxuICAgICAgICBtZXNzYWdlICs9ICcnO1xuXG4gICAgICAgIGlmIChmcmFtZXMgJiYgZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZmlsZXVybCA9IGZyYW1lc1swXS5maWxlbmFtZSB8fCBmaWxldXJsO1xuICAgICAgICAgICAgLy8gU2VudHJ5IGV4cGVjdHMgZnJhbWVzIG9sZGVzdCB0byBuZXdlc3RcbiAgICAgICAgICAgIC8vIGFuZCBKUyBzZW5kcyB0aGVtIGFzIG5ld2VzdCB0byBvbGRlc3RcbiAgICAgICAgICAgIGZyYW1lcy5yZXZlcnNlKCk7XG4gICAgICAgICAgICBzdGFja3RyYWNlID0ge2ZyYW1lczogZnJhbWVzfTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxldXJsKSB7XG4gICAgICAgICAgICBzdGFja3RyYWNlID0ge1xuICAgICAgICAgICAgICAgIGZyYW1lczogW3tcbiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGV1cmwsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVubzogbGluZW5vLFxuICAgICAgICAgICAgICAgICAgICBpbl9hcHA6IHRydWVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghIXRoaXMuX2dsb2JhbE9wdGlvbnMuaWdub3JlVXJscy50ZXN0ICYmIHRoaXMuX2dsb2JhbE9wdGlvbnMuaWdub3JlVXJscy50ZXN0KGZpbGV1cmwpKSByZXR1cm47XG4gICAgICAgIGlmICghIXRoaXMuX2dsb2JhbE9wdGlvbnMud2hpdGVsaXN0VXJscy50ZXN0ICYmICF0aGlzLl9nbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMudGVzdChmaWxldXJsKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkYXRhID0gb2JqZWN0TWVyZ2Uoe1xuICAgICAgICAgICAgLy8gc2VudHJ5LmludGVyZmFjZXMuRXhjZXB0aW9uXG4gICAgICAgICAgICBleGNlcHRpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBzdGFja3RyYWNlOiBzdGFja3RyYWNlXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdWxwcml0OiBmaWxldXJsXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIEZpcmUgYXdheSFcbiAgICAgICAgdGhpcy5fc2VuZChkYXRhKTtcbiAgICB9LFxuXG4gICAgX3RyaW1QYWNrZXQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gRm9yIG5vdywgd2Ugb25seSB3YW50IHRvIHRydW5jYXRlIHRoZSB0d28gZGlmZmVyZW50IG1lc3NhZ2VzXG4gICAgICAgIC8vIGJ1dCB0aGlzIGNvdWxkL3Nob3VsZCBiZSBleHBhbmRlZCB0byBqdXN0IHRyaW0gZXZlcnl0aGluZ1xuICAgICAgICB2YXIgbWF4ID0gdGhpcy5fZ2xvYmFsT3B0aW9ucy5tYXhNZXNzYWdlTGVuZ3RoO1xuICAgICAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBkYXRhLm1lc3NhZ2UgPSB0cnVuY2F0ZShkYXRhLm1lc3NhZ2UsIG1heCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICB2YXIgZXhjZXB0aW9uID0gZGF0YS5leGNlcHRpb24udmFsdWVzWzBdO1xuICAgICAgICAgICAgZXhjZXB0aW9uLnZhbHVlID0gdHJ1bmNhdGUoZXhjZXB0aW9uLnZhbHVlLCBtYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcblxuICAgIF9nZXRIdHRwRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5faGFzRG9jdW1lbnQgfHwgIV9kb2N1bWVudC5sb2NhdGlvbiB8fCAhX2RvY3VtZW50LmxvY2F0aW9uLmhyZWYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBodHRwRGF0YSA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBodHRwRGF0YS51cmwgPSBfZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBpZiAoX2RvY3VtZW50LnJlZmVycmVyKSB7XG4gICAgICAgICAgICBodHRwRGF0YS5oZWFkZXJzLlJlZmVyZXIgPSBfZG9jdW1lbnQucmVmZXJyZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHR0cERhdGE7XG4gICAgfSxcblxuXG4gICAgX3NlbmQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIGdsb2JhbE9wdGlvbnMgPSB0aGlzLl9nbG9iYWxPcHRpb25zO1xuXG4gICAgICAgIHZhciBiYXNlRGF0YSA9IHtcbiAgICAgICAgICAgIHByb2plY3Q6IHRoaXMuX2dsb2JhbFByb2plY3QsXG4gICAgICAgICAgICBsb2dnZXI6IGdsb2JhbE9wdGlvbnMubG9nZ2VyLFxuICAgICAgICAgICAgcGxhdGZvcm06ICdqYXZhc2NyaXB0J1xuICAgICAgICB9LCBodHRwRGF0YSA9IHRoaXMuX2dldEh0dHBEYXRhKCk7XG5cbiAgICAgICAgaWYgKGh0dHBEYXRhKSB7XG4gICAgICAgICAgICBiYXNlRGF0YS5yZXF1ZXN0ID0gaHR0cERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIQUNLOiBkZWxldGUgYHRyaW1IZWFkRnJhbWVzYCB0byBwcmV2ZW50IGZyb20gYXBwZWFyaW5nIGluIG91dGJvdW5kIHBheWxvYWRcbiAgICAgICAgaWYgKGRhdGEudHJpbUhlYWRGcmFtZXMpIGRlbGV0ZSBkYXRhLnRyaW1IZWFkRnJhbWVzO1xuXG4gICAgICAgIGRhdGEgPSBvYmplY3RNZXJnZShiYXNlRGF0YSwgZGF0YSk7XG5cbiAgICAgICAgLy8gTWVyZ2UgaW4gdGhlIHRhZ3MgYW5kIGV4dHJhIHNlcGFyYXRlbHkgc2luY2Ugb2JqZWN0TWVyZ2UgZG9lc24ndCBoYW5kbGUgYSBkZWVwIG1lcmdlXG4gICAgICAgIGRhdGEudGFncyA9IG9iamVjdE1lcmdlKG9iamVjdE1lcmdlKHt9LCB0aGlzLl9nbG9iYWxDb250ZXh0LnRhZ3MpLCBkYXRhLnRhZ3MpO1xuICAgICAgICBkYXRhLmV4dHJhID0gb2JqZWN0TWVyZ2Uob2JqZWN0TWVyZ2Uoe30sIHRoaXMuX2dsb2JhbENvbnRleHQuZXh0cmEpLCBkYXRhLmV4dHJhKTtcblxuICAgICAgICAvLyBTZW5kIGFsb25nIG91ciBvd24gY29sbGVjdGVkIG1ldGFkYXRhIHdpdGggZXh0cmFcbiAgICAgICAgZGF0YS5leHRyYVsnc2Vzc2lvbjpkdXJhdGlvbiddID0gbm93KCkgLSB0aGlzLl9zdGFydFRpbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX2JyZWFkY3J1bWJzICYmIHRoaXMuX2JyZWFkY3J1bWJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGludGVudGlvbmFsbHkgbWFrZSBzaGFsbG93IGNvcHkgc28gdGhhdCBhZGRpdGlvbnNcbiAgICAgICAgICAgIC8vIHRvIGJyZWFkY3J1bWJzIGFyZW4ndCBhY2NpZGVudGFsbHkgc2VudCBpbiB0aGlzIHJlcXVlc3RcbiAgICAgICAgICAgIGRhdGEuYnJlYWRjcnVtYnMgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbXS5zbGljZS5jYWxsKHRoaXMuX2JyZWFkY3J1bWJzLCAwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyB0YWdzL2V4dHJhLCBzdHJpcCB0aGUga2V5IGZyb20gdGhlIHBheWxvYWQgYWxsdG9ndGhlci5cbiAgICAgICAgaWYgKGlzRW1wdHlPYmplY3QoZGF0YS50YWdzKSkgZGVsZXRlIGRhdGEudGFncztcblxuICAgICAgICBpZiAodGhpcy5fZ2xvYmFsQ29udGV4dC51c2VyKSB7XG4gICAgICAgICAgICAvLyBzZW50cnkuaW50ZXJmYWNlcy5Vc2VyXG4gICAgICAgICAgICBkYXRhLnVzZXIgPSB0aGlzLl9nbG9iYWxDb250ZXh0LnVzZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbmNsdWRlIHRoZSBlbnZpcm9ubWVudCBpZiBpdCdzIGRlZmluZWQgaW4gZ2xvYmFsT3B0aW9uc1xuICAgICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5lbnZpcm9ubWVudCkgZGF0YS5lbnZpcm9ubWVudCA9IGdsb2JhbE9wdGlvbnMuZW52aXJvbm1lbnQ7XG5cbiAgICAgICAgLy8gSW5jbHVkZSB0aGUgcmVsZWFzZSBpZiBpdCdzIGRlZmluZWQgaW4gZ2xvYmFsT3B0aW9uc1xuICAgICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5yZWxlYXNlKSBkYXRhLnJlbGVhc2UgPSBnbG9iYWxPcHRpb25zLnJlbGVhc2U7XG5cbiAgICAgICAgLy8gSW5jbHVkZSBzZXJ2ZXJfbmFtZSBpZiBpdCdzIGRlZmluZWQgaW4gZ2xvYmFsT3B0aW9uc1xuICAgICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5zZXJ2ZXJOYW1lKSBkYXRhLnNlcnZlcl9uYW1lID0gZ2xvYmFsT3B0aW9ucy5zZXJ2ZXJOYW1lO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGdsb2JhbE9wdGlvbnMuZGF0YUNhbGxiYWNrKSkge1xuICAgICAgICAgICAgZGF0YSA9IGdsb2JhbE9wdGlvbnMuZGF0YUNhbGxiYWNrKGRhdGEpIHx8IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaHk/Pz8/Pz8/Pz8/XG4gICAgICAgIGlmICghZGF0YSB8fCBpc0VtcHR5T2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgZmlsdGVyZWQgb3Igbm90XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGdsb2JhbE9wdGlvbnMuc2hvdWxkU2VuZENhbGxiYWNrKSAmJiAhZ2xvYmFsT3B0aW9ucy5zaG91bGRTZW5kQ2FsbGJhY2soZGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbmRQcm9jZXNzZWRQYXlsb2FkKGRhdGEpO1xuICAgIH0sXG5cbiAgICBfZ2V0VXVpZDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHV1aWQ0KCk7XG4gICAgfSxcblxuICAgIF9zZW5kUHJvY2Vzc2VkUGF5bG9hZDogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZ2xvYmFsT3B0aW9ucyA9IHRoaXMuX2dsb2JhbE9wdGlvbnM7XG5cbiAgICAgICAgLy8gU2VuZCBhbG9uZyBhbiBldmVudF9pZCBpZiBub3QgZXhwbGljaXRseSBwYXNzZWQuXG4gICAgICAgIC8vIFRoaXMgZXZlbnRfaWQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBlcnJvciB3aXRoaW4gU2VudHJ5IGl0c2VsZi5cbiAgICAgICAgLy8gU2V0IGxhc3RFdmVudElkIGFmdGVyIHdlIGtub3cgdGhlIGVycm9yIHNob3VsZCBhY3R1YWxseSBiZSBzZW50XG4gICAgICAgIHRoaXMuX2xhc3RFdmVudElkID0gZGF0YS5ldmVudF9pZCB8fCAoZGF0YS5ldmVudF9pZCA9IHRoaXMuX2dldFV1aWQoKSk7XG5cbiAgICAgICAgLy8gVHJ5IGFuZCBjbGVhbiB1cCB0aGUgcGFja2V0IGJlZm9yZSBzZW5kaW5nIGJ5IHRydW5jYXRpbmcgbG9uZyB2YWx1ZXNcbiAgICAgICAgZGF0YSA9IHRoaXMuX3RyaW1QYWNrZXQoZGF0YSk7XG5cbiAgICAgICAgdGhpcy5fbG9nRGVidWcoJ2RlYnVnJywgJ1JhdmVuIGFib3V0IHRvIHNlbmQ6JywgZGF0YSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzU2V0dXAoKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBhdXRoID0ge1xuICAgICAgICAgICAgc2VudHJ5X3ZlcnNpb246ICc3JyxcbiAgICAgICAgICAgIHNlbnRyeV9jbGllbnQ6ICdyYXZlbi1qcy8nICsgdGhpcy5WRVJTSU9OLFxuICAgICAgICAgICAgc2VudHJ5X2tleTogdGhpcy5fZ2xvYmFsS2V5XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9nbG9iYWxTZWNyZXQpIHtcbiAgICAgICAgICAgIGF1dGguc2VudHJ5X3NlY3JldCA9IHRoaXMuX2dsb2JhbFNlY3JldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBleGNlcHRpb24gPSBkYXRhLmV4Y2VwdGlvbiAmJiBkYXRhLmV4Y2VwdGlvbi52YWx1ZXNbMF07XG4gICAgICAgIHRoaXMuY2FwdHVyZUJyZWFkY3J1bWIoe1xuICAgICAgICAgICAgY2F0ZWdvcnk6ICdzZW50cnknLFxuICAgICAgICAgICAgbWVzc2FnZTogZXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgPyAoZXhjZXB0aW9uLnR5cGUgPyBleGNlcHRpb24udHlwZSArICc6ICcgOiAnJykgKyBleGNlcHRpb24udmFsdWVcbiAgICAgICAgICAgICAgICA6IGRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgIGV2ZW50X2lkOiBkYXRhLmV2ZW50X2lkLFxuICAgICAgICAgICAgbGV2ZWw6IGRhdGEubGV2ZWwgfHwgJ2Vycm9yJyAvLyBwcmVzdW1lIGVycm9yIHVubGVzcyBzcGVjaWZpZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHVybCA9IHRoaXMuX2dsb2JhbEVuZHBvaW50O1xuICAgICAgICAoZ2xvYmFsT3B0aW9ucy50cmFuc3BvcnQgfHwgdGhpcy5fbWFrZVJlcXVlc3QpLmNhbGwodGhpcywge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBhdXRoOiBhdXRoLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIG9wdGlvbnM6IGdsb2JhbE9wdGlvbnMsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fdHJpZ2dlckV2ZW50KCdzdWNjZXNzJywge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzcmM6IHVybFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FcnJvcjogZnVuY3Rpb24gZmFpbHVyZShlcnJvcikge1xuICAgICAgICAgICAgICAgIHNlbGYuX3RyaWdnZXJFdmVudCgnZmFpbHVyZScsIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB1cmxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGVycm9yIHx8IG5ldyBFcnJvcignUmF2ZW4gc2VuZCBmYWlsZWQgKG5vIGFkZGl0aW9uYWwgZGV0YWlscyBwcm92aWRlZCknKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfbWFrZVJlcXVlc3Q6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAvLyBpZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDT1JTIChlLmcuIElFNyksIHdlIGFyZSBvdXQgb2YgbHVja1xuICAgICAgICB2YXIgaGFzQ09SUyA9XG4gICAgICAgICAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0IHx8XG4gICAgICAgICAgICB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGlmICghaGFzQ09SUykgcmV0dXJuO1xuXG4gICAgICAgIHZhciB1cmwgPSBvcHRzLnVybDtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMub25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMub25TdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLm9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm9uRXJyb3IobmV3IEVycm9yKCdTZW50cnkgZXJyb3IgY29kZTogJyArIHJlcXVlc3Quc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkge1xuICAgICAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhbmRsZXIoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXF1ZXN0ID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgICAgICAgICAvLyB4ZG9tYWlucmVxdWVzdCBjYW5ub3QgZ28gaHR0cCAtPiBodHRwcyAob3IgdmljZSB2ZXJzYSksXG4gICAgICAgICAgICAvLyBzbyBhbHdheXMgdXNlIHByb3RvY29sIHJlbGF0aXZlXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXmh0dHBzPzovLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIG9ucmVhZHlzdGF0ZWNoYW5nZSBub3Qgc3VwcG9ydGVkIGJ5IFhEb21haW5SZXF1ZXN0XG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGhhbmRsZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOT1RFOiBhdXRoIGlzIGludGVudGlvbmFsbHkgc2VudCBhcyBwYXJ0IG9mIHF1ZXJ5IHN0cmluZyAoTk9UIGFzIGN1c3RvbVxuICAgICAgICAvLyAgICAgICBIVFRQIGhlYWRlcikgc28gYXMgdG8gYXZvaWQgcHJlZmxpZ2h0IENPUlMgcmVxdWVzdHNcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsICsgJz8nICsgdXJsZW5jb2RlKG9wdHMuYXV0aCkpO1xuICAgICAgICByZXF1ZXN0LnNlbmQoc3RyaW5naWZ5KG9wdHMuZGF0YSkpO1xuICAgIH0sXG5cbiAgICBfbG9nRGVidWc6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcmlnaW5hbENvbnNvbGVNZXRob2RzW2xldmVsXSAmJiB0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAvLyBJbiBJRTwxMCBjb25zb2xlIG1ldGhvZHMgZG8gbm90IGhhdmUgdGhlaXIgb3duICdhcHBseScgbWV0aG9kXG4gICAgICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5hbENvbnNvbGVNZXRob2RzW2xldmVsXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5hbENvbnNvbGUsXG4gICAgICAgICAgICAgICAgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9tZXJnZUNvbnRleHQ6IGZ1bmN0aW9uKGtleSwgY29udGV4dCkge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQoY29udGV4dCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9nbG9iYWxDb250ZXh0W2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxDb250ZXh0W2tleV0gPSBvYmplY3RNZXJnZSh0aGlzLl9nbG9iYWxDb250ZXh0W2tleV0gfHwge30sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIHV0aWxzXG4gKlxuICogY29uZGl0aW9uYWxseSBleHBvcnRlZCBmb3IgdGVzdCB2aWEgUmF2ZW4udXRpbHNcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh3aGF0KSB7XG4gICAgcmV0dXJuIHdoYXQgPT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih3aGF0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aGF0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh3aGF0KSB7XG4gICAgcmV0dXJuIG9iamVjdFByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdoYXQpID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3Qod2hhdCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2hhdCA9PT0gJ29iamVjdCcgJiYgd2hhdCAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eU9iamVjdCh3aGF0KSB7XG4gICAgZm9yICh2YXIgXyBpbiB3aGF0KSByZXR1cm4gZmFsc2U7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGd1YXJkLWZvci1pbiwgbm8tdW51c2VkLXZhcnNcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gU29ydGEgeWFua2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2Jsb2IvYWEzYjRiNC9saWIvdXRpbC5qcyNMNTYwXG4vLyB3aXRoIHNvbWUgdGlueSBtb2RpZmljYXRpb25zXG5mdW5jdGlvbiBpc0Vycm9yKHdoYXQpIHtcbiAgICB2YXIgdG9TdHJpbmcgPSBvYmplY3RQcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aGF0KTtcbiAgICByZXR1cm4gaXNPYmplY3Qod2hhdCkgJiZcbiAgICAgICAgdG9TdHJpbmcgPT09ICdbb2JqZWN0IEVycm9yXScgfHxcbiAgICAgICAgdG9TdHJpbmcgPT09ICdbb2JqZWN0IEV4Y2VwdGlvbl0nIHx8IC8vIEZpcmVmb3ggTlNfRVJST1JfRkFJTFVSRSBFeGNlcHRpb25zXG4gICAgICAgIHdoYXQgaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuZnVuY3Rpb24gZWFjaChvYmosIGNhbGxiYWNrKSB7XG4gICAgdmFyIGksIGo7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKGhhc0tleShvYmosIGkpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChudWxsLCBpLCBvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaiA9IG9iai5sZW5ndGg7XG4gICAgICAgIGlmIChqKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChudWxsLCBpLCBvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvYmplY3RNZXJnZShvYmoxLCBvYmoyKSB7XG4gICAgaWYgKCFvYmoyKSB7XG4gICAgICAgIHJldHVybiBvYmoxO1xuICAgIH1cbiAgICBlYWNoKG9iajIsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICBvYmoxW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqMTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBtYXgpIHtcbiAgICByZXR1cm4gIW1heCB8fCBzdHIubGVuZ3RoIDw9IG1heCA/IHN0ciA6IHN0ci5zdWJzdHIoMCwgbWF4KSArICdcXHUyMDI2Jztcbn1cblxuLyoqXG4gKiBoYXNLZXksIGEgYmV0dGVyIGZvcm0gb2YgaGFzT3duUHJvcGVydHlcbiAqIEV4YW1wbGU6IGhhc0tleShNYWluSG9zdE9iamVjdCwgcHJvcGVydHkpID09PSB0cnVlL2ZhbHNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhvc3Qgb2JqZWN0IHRvIGNoZWNrIHByb3BlcnR5XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGNoZWNrXG4gKi9cbmZ1bmN0aW9uIGhhc0tleShvYmplY3QsIGtleSkge1xuICAgIHJldHVybiBvYmplY3RQcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG59XG5cbmZ1bmN0aW9uIGpvaW5SZWdFeHAocGF0dGVybnMpIHtcbiAgICAvLyBDb21iaW5lIGFuIGFycmF5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYW5kIHN0cmluZ3MgaW50byBvbmUgbGFyZ2UgcmVnZXhwXG4gICAgLy8gQmUgbWFkLlxuICAgIHZhciBzb3VyY2VzID0gW10sXG4gICAgICAgIGkgPSAwLCBsZW4gPSBwYXR0ZXJucy5sZW5ndGgsXG4gICAgICAgIHBhdHRlcm47XG5cbiAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuc1tpXTtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgc3RyaW5nLCB3ZSBuZWVkIHRvIGVzY2FwZSBpdFxuICAgICAgICAgICAgLy8gVGFrZW4gZnJvbTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2gocGF0dGVybi5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csICdcXFxcJDEnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAocGF0dGVybiAmJiBwYXR0ZXJuLnNvdXJjZSkge1xuICAgICAgICAgICAgLy8gSWYgaXQncyBhIHJlZ2V4cCBhbHJlYWR5LCB3ZSB3YW50IHRvIGV4dHJhY3QgdGhlIHNvdXJjZVxuICAgICAgICAgICAgc291cmNlcy5wdXNoKHBhdHRlcm4uc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbnRlbnRpb25hbGx5IHNraXAgb3RoZXIgY2FzZXNcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc291cmNlcy5qb2luKCd8JyksICdpJyk7XG59XG5cbmZ1bmN0aW9uIHVybGVuY29kZShvKSB7XG4gICAgdmFyIHBhaXJzID0gW107XG4gICAgZWFjaChvLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vLyBib3Jyb3dlZCBmcm9tIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I2FwcGVuZGl4LUJcbi8vIGludGVudGlvbmFsbHkgdXNpbmcgcmVnZXggYW5kIG5vdCA8YS8+IGhyZWYgcGFyc2luZyB0cmljayBiZWNhdXNlIFJlYWN0IE5hdGl2ZSBhbmQgb3RoZXJcbi8vIGVudmlyb25tZW50cyB3aGVyZSBET00gbWlnaHQgbm90IGJlIGF2YWlsYWJsZVxuZnVuY3Rpb24gcGFyc2VVcmwodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC9eKChbXjpcXC8/I10rKTopPyhcXC9cXC8oW15cXC8/I10qKSk/KFtePyNdKikoXFw/KFteI10qKSk/KCMoLiopKT8kLyk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIHt9O1xuXG4gICAgLy8gY29lcmNlIHRvIHVuZGVmaW5lZCB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5nIHNvIHdlIGRvbid0IGdldCAndW5kZWZpbmVkJ1xuICAgIHZhciBxdWVyeSA9IG1hdGNoWzZdIHx8ICcnO1xuICAgIHZhciBmcmFnbWVudCA9IG1hdGNoWzhdIHx8ICcnO1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb3RvY29sOiBtYXRjaFsyXSxcbiAgICAgICAgaG9zdDogbWF0Y2hbNF0sXG4gICAgICAgIHBhdGg6IG1hdGNoWzVdLFxuICAgICAgICByZWxhdGl2ZTogbWF0Y2hbNV0gKyBxdWVyeSArIGZyYWdtZW50IC8vIGV2ZXJ5dGhpbmcgbWludXMgb3JpZ2luXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHV1aWQ0KCkge1xuICAgIHZhciBjcnlwdG8gPSBfd2luZG93LmNyeXB0byB8fCBfd2luZG93Lm1zQ3J5cHRvO1xuXG4gICAgaWYgKCFpc1VuZGVmaW5lZChjcnlwdG8pICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgICAgLy8gVXNlIHdpbmRvdy5jcnlwdG8gQVBJIGlmIGF2YWlsYWJsZVxuICAgICAgICB2YXIgYXJyID0gbmV3IFVpbnQxNkFycmF5KDgpO1xuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycik7XG5cbiAgICAgICAgLy8gc2V0IDQgaW4gYnl0ZSA3XG4gICAgICAgIGFyclszXSA9IGFyclszXSAmIDB4RkZGIHwgMHg0MDAwO1xuICAgICAgICAvLyBzZXQgMiBtb3N0IHNpZ25pZmljYW50IGJpdHMgb2YgYnl0ZSA5IHRvICcxMCdcbiAgICAgICAgYXJyWzRdID0gYXJyWzRdICYgMHgzRkZGIHwgMHg4MDAwO1xuXG4gICAgICAgIHZhciBwYWQgPSBmdW5jdGlvbihudW0pIHtcbiAgICAgICAgICAgIHZhciB2ID0gbnVtLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIHdoaWxlICh2Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwYWQoYXJyWzBdKSArIHBhZChhcnJbMV0pICsgcGFkKGFyclsyXSkgKyBwYWQoYXJyWzNdKSArIHBhZChhcnJbNF0pICtcbiAgICAgICAgcGFkKGFycls1XSkgKyBwYWQoYXJyWzZdKSArIHBhZChhcnJbN10pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWQtaW4tamF2YXNjcmlwdC8yMTE3NTIzIzIxMTc1MjNcbiAgICAgICAgcmV0dXJuICd4eHh4eHh4eHh4eHg0eHh4eXh4eHh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkqMTZ8MCxcbiAgICAgICAgICAgICAgICB2ID0gYyA9PT0gJ3gnID8gciA6IHImMHgzfDB4ODtcbiAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGEgY2hpbGQgRE9NIGVsZW1lbnQsIHJldHVybnMgYSBxdWVyeS1zZWxlY3RvciBzdGF0ZW1lbnQgZGVzY3JpYmluZyB0aGF0XG4gKiBhbmQgaXRzIGFuY2VzdG9yc1xuICogZS5nLiBbSFRNTEVsZW1lbnRdID0+IGJvZHkgPiBkaXYgPiBpbnB1dCNmb28uYnRuW25hbWU9YmF6XVxuICogQHBhcmFtIGVsZW1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGh0bWxUcmVlQXNTdHJpbmcoZWxlbSkge1xuICAgIC8qIGVzbGludCBuby1leHRyYS1wYXJlbnM6MCovXG4gICAgdmFyIE1BWF9UUkFWRVJTRV9IRUlHSFQgPSA1LFxuICAgICAgICBNQVhfT1VUUFVUX0xFTiA9IDgwLFxuICAgICAgICBvdXQgPSBbXSxcbiAgICAgICAgaGVpZ2h0ID0gMCxcbiAgICAgICAgbGVuID0gMCxcbiAgICAgICAgc2VwYXJhdG9yID0gJyA+ICcsXG4gICAgICAgIHNlcExlbmd0aCA9IHNlcGFyYXRvci5sZW5ndGgsXG4gICAgICAgIG5leHRTdHI7XG5cbiAgICB3aGlsZSAoZWxlbSAmJiBoZWlnaHQrKyA8IE1BWF9UUkFWRVJTRV9IRUlHSFQpIHtcblxuICAgICAgICBuZXh0U3RyID0gaHRtbEVsZW1lbnRBc1N0cmluZyhlbGVtKTtcbiAgICAgICAgLy8gYmFpbCBvdXQgaWZcbiAgICAgICAgLy8gLSBuZXh0U3RyIGlzIHRoZSAnaHRtbCcgZWxlbWVudFxuICAgICAgICAvLyAtIHRoZSBsZW5ndGggb2YgdGhlIHN0cmluZyB0aGF0IHdvdWxkIGJlIGNyZWF0ZWQgZXhjZWVkcyBNQVhfT1VUUFVUX0xFTlxuICAgICAgICAvLyAgIChpZ25vcmUgdGhpcyBsaW1pdCBpZiB3ZSBhcmUgb24gdGhlIGZpcnN0IGl0ZXJhdGlvbilcbiAgICAgICAgaWYgKG5leHRTdHIgPT09ICdodG1sJyB8fCBoZWlnaHQgPiAxICYmIGxlbiArIChvdXQubGVuZ3RoICogc2VwTGVuZ3RoKSArIG5leHRTdHIubGVuZ3RoID49IE1BWF9PVVRQVVRfTEVOKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG91dC5wdXNoKG5leHRTdHIpO1xuXG4gICAgICAgIGxlbiArPSBuZXh0U3RyLmxlbmd0aDtcbiAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LnJldmVyc2UoKS5qb2luKHNlcGFyYXRvcik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHNpbXBsZSwgcXVlcnktc2VsZWN0b3IgcmVwcmVzZW50YXRpb24gb2YgYSBET00gZWxlbWVudFxuICogZS5nLiBbSFRNTEVsZW1lbnRdID0+IGlucHV0I2Zvby5idG5bbmFtZT1iYXpdXG4gKiBAcGFyYW0gSFRNTEVsZW1lbnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGh0bWxFbGVtZW50QXNTdHJpbmcoZWxlbSkge1xuICAgIHZhciBvdXQgPSBbXSxcbiAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICBjbGFzc2VzLFxuICAgICAgICBrZXksXG4gICAgICAgIGF0dHIsXG4gICAgICAgIGk7XG5cbiAgICBpZiAoIWVsZW0gfHwgIWVsZW0udGFnTmFtZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgb3V0LnB1c2goZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChlbGVtLmlkKSB7XG4gICAgICAgIG91dC5wdXNoKCcjJyArIGVsZW0uaWQpO1xuICAgIH1cblxuICAgIGNsYXNzTmFtZSA9IGVsZW0uY2xhc3NOYW1lO1xuICAgIGlmIChjbGFzc05hbWUgJiYgaXNTdHJpbmcoY2xhc3NOYW1lKSkge1xuICAgICAgICBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdXQucHVzaCgnLicgKyBjbGFzc2VzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgYXR0cldoaXRlbGlzdCA9IFsndHlwZScsICduYW1lJywgJ3RpdGxlJywgJ2FsdCddO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhdHRyV2hpdGVsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGF0dHJXaGl0ZWxpc3RbaV07XG4gICAgICAgIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShrZXkpO1xuICAgICAgICBpZiAoYXR0cikge1xuICAgICAgICAgICAgb3V0LnB1c2goJ1snICsga2V5ICsgJz1cIicgKyBhdHRyICsgJ1wiXScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQuam9pbignJyk7XG59XG5cbi8qKlxuICogUG9seWZpbGwgYSBtZXRob2RcbiAqIEBwYXJhbSBvYmogb2JqZWN0IGUuZy4gYGRvY3VtZW50YFxuICogQHBhcmFtIG5hbWUgbWV0aG9kIG5hbWUgcHJlc2VudCBvbiBvYmplY3QgZS5nLiBgYWRkRXZlbnRMaXN0ZW5lcmBcbiAqIEBwYXJhbSByZXBsYWNlbWVudCByZXBsYWNlbWVudCBmdW5jdGlvblxuICogQHBhcmFtIHRyYWNrIHtvcHRpb25hbH0gcmVjb3JkIGluc3RydW1lbnRhdGlvbiB0byBhbiBhcnJheVxuICovXG5mdW5jdGlvbiBmaWxsKG9iaiwgbmFtZSwgcmVwbGFjZW1lbnQsIHRyYWNrKSB7XG4gICAgdmFyIG9yaWcgPSBvYmpbbmFtZV07XG4gICAgb2JqW25hbWVdID0gcmVwbGFjZW1lbnQob3JpZyk7XG4gICAgaWYgKHRyYWNrKSB7XG4gICAgICAgIHRyYWNrLnB1c2goW29iaiwgbmFtZSwgb3JpZ10pO1xuICAgIH1cbn1cblxuaWYgKHR5cGVvZiBfX0RFVl9fICE9PSAndW5kZWZpbmVkJyAmJiBfX0RFVl9fKSB7XG4gICAgUmF2ZW4udXRpbHMgPSB7XG4gICAgICAgIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgICAgICAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgICAgICAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICAgICAgICBpc09iamVjdDogaXNPYmplY3QsXG4gICAgICAgIGlzRW1wdHlPYmplY3Q6IGlzRW1wdHlPYmplY3QsXG4gICAgICAgIGlzRXJyb3I6IGlzRXJyb3IsXG4gICAgICAgIGVhY2g6IGVhY2gsXG4gICAgICAgIG9iamVjdE1lcmdlOiBvYmplY3RNZXJnZSxcbiAgICAgICAgdHJ1bmNhdGU6IHRydW5jYXRlLFxuICAgICAgICBoYXNLZXk6IGhhc0tleSxcbiAgICAgICAgam9pblJlZ0V4cDogam9pblJlZ0V4cCxcbiAgICAgICAgdXJsZW5jb2RlOiB1cmxlbmNvZGUsXG4gICAgICAgIHV1aWQ0OiB1dWlkNCxcbiAgICAgICAgaHRtbFRyZWVBc1N0cmluZzogaHRtbFRyZWVBc1N0cmluZyxcbiAgICAgICAgaHRtbEVsZW1lbnRBc1N0cmluZzogaHRtbEVsZW1lbnRBc1N0cmluZyxcbiAgICAgICAgcGFyc2VVcmw6IHBhcnNlVXJsLFxuICAgICAgICBmaWxsOiBmaWxsXG4gICAgfTtcbn07XG5cbi8vIERlcHJlY2F0aW9uc1xuUmF2ZW4ucHJvdG90eXBlLnNldFVzZXIgPSBSYXZlbi5wcm90b3R5cGUuc2V0VXNlckNvbnRleHQ7XG5SYXZlbi5wcm90b3R5cGUuc2V0UmVsZWFzZUNvbnRleHQgPSBSYXZlbi5wcm90b3R5cGUuc2V0UmVsZWFzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYXZlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yYXZlbi1qcy9zcmMvcmF2ZW4uanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gVHJhY2VLaXQgLSBDcm9zcyBicm93ZXIgc3RhY2sgdHJhY2VzIC0gZ2l0aHViLmNvbS9vY2MvVHJhY2VLaXRcbiBNSVQgbGljZW5zZVxuKi9cblxudmFyIFRyYWNlS2l0ID0ge1xuICAgIGNvbGxlY3RXaW5kb3dFcnJvcnM6IHRydWUsXG4gICAgZGVidWc6IGZhbHNlXG59O1xuXG4vLyBUaGlzIGlzIHRvIGJlIGRlZmVuc2l2ZSBpbiBlbnZpcm9ubWVudHMgd2hlcmUgd2luZG93IGRvZXMgbm90IGV4aXN0IChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9yYXZlbi1qcy9wdWxsLzc4NSlcbnZhciBfd2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3dcbiAgICAgICAgICAgIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxcbiAgICAgICAgICAgIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZlxuICAgICAgICAgICAgOiB7fTtcblxuLy8gZ2xvYmFsIHJlZmVyZW5jZSB0byBzbGljZVxudmFyIF9zbGljZSA9IFtdLnNsaWNlO1xudmFyIFVOS05PV05fRlVOQ1RJT04gPSAnPyc7XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yI0Vycm9yX3R5cGVzXG52YXIgRVJST1JfVFlQRVNfUkUgPSAvXig/OlVuY2F1Z2h0ICg/OmV4Y2VwdGlvbjogKT8pPygoPzpFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IpOiA/KC4qKSQvO1xuXG5mdW5jdGlvbiBnZXRMb2NhdGlvbkhyZWYoKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiAnJztcblxuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xufVxuXG4vKipcbiAqIFRyYWNlS2l0LnJlcG9ydDogY3Jvc3MtYnJvd3NlciBwcm9jZXNzaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zXG4gKlxuICogU3ludGF4OlxuICogICBUcmFjZUtpdC5yZXBvcnQuc3Vic2NyaWJlKGZ1bmN0aW9uKHN0YWNrSW5mbykgeyAuLi4gfSlcbiAqICAgVHJhY2VLaXQucmVwb3J0LnVuc3Vic2NyaWJlKGZ1bmN0aW9uKHN0YWNrSW5mbykgeyAuLi4gfSlcbiAqICAgVHJhY2VLaXQucmVwb3J0KGV4Y2VwdGlvbilcbiAqICAgdHJ5IHsgLi4uY29kZS4uLiB9IGNhdGNoKGV4KSB7IFRyYWNlS2l0LnJlcG9ydChleCk7IH1cbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzLCBwbHVzIGNvbHVtbiBudW1iZXJcbiAqICAgICAgICAgICAgICBvbiB0b3AgZnJhbWU7IGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBPcGVyYTogICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBDaHJvbWU6ICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6ICBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyIGZvciB0aGUgdG9wIGZyYW1lIG9ubHk7IHNvbWUgZnJhbWVzXG4gKiAgICAgICAgICAgICAgbWF5IGJlIG1pc3NpbmcsIGFuZCBjb2x1bW4gbnVtYmVyIGlzIG5vdCBndWFyYW50ZWVkXG4gKiAgIC0gSUU6ICAgICAgbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcCBmcmFtZSBvbmx5OyBzb21lIGZyYW1lc1xuICogICAgICAgICAgICAgIG1heSBiZSBtaXNzaW5nLCBhbmQgY29sdW1uIG51bWJlciBpcyBub3QgZ3VhcmFudGVlZFxuICpcbiAqIEluIHRoZW9yeSwgVHJhY2VLaXQgc2hvdWxkIHdvcmsgb24gYWxsIG9mIHRoZSBmb2xsb3dpbmcgdmVyc2lvbnM6XG4gKiAgIC0gSUU1LjUrIChvbmx5IDguMCB0ZXN0ZWQpXG4gKiAgIC0gRmlyZWZveCAwLjkrIChvbmx5IDMuNSsgdGVzdGVkKVxuICogICAtIE9wZXJhIDcrIChvbmx5IDEwLjUwIHRlc3RlZDsgdmVyc2lvbnMgOSBhbmQgZWFybGllciBtYXkgcmVxdWlyZVxuICogICAgIEV4Y2VwdGlvbnMgSGF2ZSBTdGFja3RyYWNlIHRvIGJlIGVuYWJsZWQgaW4gb3BlcmE6Y29uZmlnKVxuICogICAtIFNhZmFyaSAzKyAob25seSA0KyB0ZXN0ZWQpXG4gKiAgIC0gQ2hyb21lIDErIChvbmx5IDUrIHRlc3RlZClcbiAqICAgLSBLb25xdWVyb3IgMy41KyAodW50ZXN0ZWQpXG4gKlxuICogUmVxdWlyZXMgVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UuXG4gKlxuICogVHJpZXMgdG8gY2F0Y2ggYWxsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFuZCByZXBvcnQgdGhlbSB0byB0aGVcbiAqIHN1YnNjcmliZWQgaGFuZGxlcnMuIFBsZWFzZSBub3RlIHRoYXQgVHJhY2VLaXQucmVwb3J0IHdpbGwgcmV0aHJvdyB0aGVcbiAqIGV4Y2VwdGlvbi4gVGhpcyBpcyBSRVFVSVJFRCBpbiBvcmRlciB0byBnZXQgYSB1c2VmdWwgc3RhY2sgdHJhY2UgaW4gSUUuXG4gKiBJZiB0aGUgZXhjZXB0aW9uIGRvZXMgbm90IHJlYWNoIHRoZSB0b3Agb2YgdGhlIGJyb3dzZXIsIHlvdSB3aWxsIG9ubHlcbiAqIGdldCBhIHN0YWNrIHRyYWNlIGZyb20gdGhlIHBvaW50IHdoZXJlIFRyYWNlS2l0LnJlcG9ydCB3YXMgY2FsbGVkLlxuICpcbiAqIEhhbmRsZXJzIHJlY2VpdmUgYSBzdGFja0luZm8gb2JqZWN0IGFzIGRlc2NyaWJlZCBpbiB0aGVcbiAqIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlIGRvY3MuXG4gKi9cblRyYWNlS2l0LnJlcG9ydCA9IChmdW5jdGlvbiByZXBvcnRNb2R1bGVXcmFwcGVyKCkge1xuICAgIHZhciBoYW5kbGVycyA9IFtdLFxuICAgICAgICBsYXN0QXJncyA9IG51bGwsXG4gICAgICAgIGxhc3RFeGNlcHRpb24gPSBudWxsLFxuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY3Jhc2ggaGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGhhbmRsZXIpIHtcbiAgICAgICAgaW5zdGFsbEdsb2JhbEhhbmRsZXIoKTtcbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjcmFzaCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZShoYW5kbGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBoYW5kbGVycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzW2ldID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjcmFzaCBoYW5kbGVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZUFsbCgpIHtcbiAgICAgICAgdW5pbnN0YWxsR2xvYmFsSGFuZGxlcigpO1xuICAgICAgICBoYW5kbGVycyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIHN0YWNrIGluZm9ybWF0aW9uIHRvIGFsbCBoYW5kbGVycy5cbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCAqPn0gc3RhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3RpZnlIYW5kbGVycyhzdGFjaywgaXNXaW5kb3dFcnJvcikge1xuICAgICAgICB2YXIgZXhjZXB0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGlzV2luZG93RXJyb3IgJiYgIVRyYWNlS2l0LmNvbGxlY3RXaW5kb3dFcnJvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSBpbiBoYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnNbaV0uYXBwbHkobnVsbCwgW3N0YWNrXS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGlubmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGlubmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfb2xkT25lcnJvckhhbmRsZXIsIF9vbkVycm9ySGFuZGxlckluc3RhbGxlZDtcblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgYWxsIGdsb2JhbCB1bmhhbmRsZWQgZXhjZXB0aW9ucyBhcmUgcmVjb3JkZWQuXG4gICAgICogU3VwcG9ydGVkIGJ5IEdlY2tvIGFuZCBJRS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBFcnJvciBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNjcmlwdCB0aGF0IGdlbmVyYXRlZCB0aGUgZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSBsaW5lTm8gVGhlIGxpbmUgbnVtYmVyIGF0IHdoaWNoIHRoZSBlcnJvclxuICAgICAqIG9jY3VycmVkLlxuICAgICAqIEBwYXJhbSB7PyhudW1iZXJ8c3RyaW5nKX0gY29sTm8gVGhlIGNvbHVtbiBudW1iZXIgYXQgd2hpY2ggdGhlIGVycm9yXG4gICAgICogb2NjdXJyZWQuXG4gICAgICogQHBhcmFtIHs/RXJyb3J9IGV4IFRoZSBhY3R1YWwgRXJyb3Igb2JqZWN0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyYWNlS2l0V2luZG93T25FcnJvcihtZXNzYWdlLCB1cmwsIGxpbmVObywgY29sTm8sIGV4KSB7XG4gICAgICAgIHZhciBzdGFjayA9IG51bGw7XG5cbiAgICAgICAgaWYgKGxhc3RFeGNlcHRpb25TdGFjaykge1xuICAgICAgICAgICAgVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UuYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQobGFzdEV4Y2VwdGlvblN0YWNrLCB1cmwsIGxpbmVObywgbWVzc2FnZSk7XG4gICAgICAgICAgICBwcm9jZXNzTGFzdEV4Y2VwdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGV4KSB7XG4gICAgICAgICAgICAvLyBOZXcgY2hyb21lIGFuZCBibGluayBzZW5kIGFsb25nIGEgcmVhbCBlcnJvciBvYmplY3RcbiAgICAgICAgICAgIC8vIExldCdzIGp1c3QgcmVwb3J0IHRoYXQgbGlrZSBhIG5vcm1hbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9taWtld2VzdC5vcmcvMjAxMy8wOC9kZWJ1Z2dpbmctcnVudGltZS1lcnJvcnMtd2l0aC13aW5kb3ctb25lcnJvclxuICAgICAgICAgICAgc3RhY2sgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZShleCk7XG4gICAgICAgICAgICBub3RpZnlIYW5kbGVycyhzdGFjaywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgJ3VybCc6IHVybCxcbiAgICAgICAgICAgICAgICAnbGluZSc6IGxpbmVObyxcbiAgICAgICAgICAgICAgICAnY29sdW1uJzogY29sTm9cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIG1zZyA9IG1lc3NhZ2U7IC8vIG11c3QgYmUgbmV3IHZhciBvciB3aWxsIG1vZGlmeSBvcmlnaW5hbCBgYXJndW1lbnRzYFxuICAgICAgICAgICAgdmFyIGdyb3VwcztcbiAgICAgICAgICAgIGlmICh7fS50b1N0cmluZy5jYWxsKG1lc3NhZ2UpID09PSAnW29iamVjdCBTdHJpbmddJykge1xuICAgICAgICAgICAgICAgIHZhciBncm91cHMgPSBtZXNzYWdlLm1hdGNoKEVSUk9SX1RZUEVTX1JFKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBncm91cHNbMV07XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGdyb3Vwc1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLmZ1bmMgPSBVTktOT1dOX0ZVTkNUSU9OO1xuXG4gICAgICAgICAgICBzdGFjayA9IHtcbiAgICAgICAgICAgICAgICAnbmFtZSc6IG5hbWUsXG4gICAgICAgICAgICAgICAgJ21lc3NhZ2UnOiBtc2csXG4gICAgICAgICAgICAgICAgJ3VybCc6IGdldExvY2F0aW9uSHJlZigpLFxuICAgICAgICAgICAgICAgICdzdGFjayc6IFtsb2NhdGlvbl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub3RpZnlIYW5kbGVycyhzdGFjaywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX29sZE9uZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gX29sZE9uZXJyb3JIYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbEdsb2JhbEhhbmRsZXIgKClcbiAgICB7XG4gICAgICAgIGlmIChfb25FcnJvckhhbmRsZXJJbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfb2xkT25lcnJvckhhbmRsZXIgPSBfd2luZG93Lm9uZXJyb3I7XG4gICAgICAgIF93aW5kb3cub25lcnJvciA9IHRyYWNlS2l0V2luZG93T25FcnJvcjtcbiAgICAgICAgX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmluc3RhbGxHbG9iYWxIYW5kbGVyICgpXG4gICAge1xuICAgICAgICBpZiAoIV9vbkVycm9ySGFuZGxlckluc3RhbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF93aW5kb3cub25lcnJvciA9IF9vbGRPbmVycm9ySGFuZGxlcjtcbiAgICAgICAgX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIF9vbGRPbmVycm9ySGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGFzdEV4Y2VwdGlvbigpIHtcbiAgICAgICAgdmFyIF9sYXN0RXhjZXB0aW9uU3RhY2sgPSBsYXN0RXhjZXB0aW9uU3RhY2ssXG4gICAgICAgICAgICBfbGFzdEFyZ3MgPSBsYXN0QXJncztcbiAgICAgICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBudWxsO1xuICAgICAgICBsYXN0RXhjZXB0aW9uID0gbnVsbDtcbiAgICAgICAgbm90aWZ5SGFuZGxlcnMuYXBwbHkobnVsbCwgW19sYXN0RXhjZXB0aW9uU3RhY2ssIGZhbHNlXS5jb25jYXQoX2xhc3RBcmdzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhbiB1bmhhbmRsZWQgRXJyb3IgdG8gVHJhY2VLaXQuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcGFyYW0gez9ib29sZWFufSByZXRocm93IElmIGZhbHNlLCBkbyBub3QgcmUtdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgKiBPbmx5IHVzZWQgZm9yIHdpbmRvdy5vbmVycm9yIHRvIG5vdCBjYXVzZSBhbiBpbmZpbml0ZSBsb29wIG9mXG4gICAgICogcmV0aHJvd2luZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXBvcnQoZXgsIHJldGhyb3cpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBfc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBpZiAobGFzdEV4Y2VwdGlvblN0YWNrKSB7XG4gICAgICAgICAgICBpZiAobGFzdEV4Y2VwdGlvbiA9PT0gZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgY2F1Z2h0IGJ5IGFuIGlubmVyIGNhdGNoIGJsb2NrLCBpZ25vcmVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByb2Nlc3NMYXN0RXhjZXB0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhY2sgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZShleCk7XG4gICAgICAgIGxhc3RFeGNlcHRpb25TdGFjayA9IHN0YWNrO1xuICAgICAgICBsYXN0RXhjZXB0aW9uID0gZXg7XG4gICAgICAgIGxhc3RBcmdzID0gYXJncztcblxuICAgICAgICAvLyBJZiB0aGUgc3RhY2sgdHJhY2UgaXMgaW5jb21wbGV0ZSwgd2FpdCBmb3IgMiBzZWNvbmRzIGZvclxuICAgICAgICAvLyBzbG93IHNsb3cgSUUgdG8gc2VlIGlmIG9uZXJyb3Igb2NjdXJzIG9yIG5vdCBiZWZvcmUgcmVwb3J0aW5nXG4gICAgICAgIC8vIHRoaXMgZXhjZXB0aW9uOyBvdGhlcndpc2UsIHdlIHdpbGwgZW5kIHVwIHdpdGggYW4gaW5jb21wbGV0ZVxuICAgICAgICAvLyBzdGFjayB0cmFjZVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChsYXN0RXhjZXB0aW9uID09PSBleCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NMYXN0RXhjZXB0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIChzdGFjay5pbmNvbXBsZXRlID8gMjAwMCA6IDApKTtcblxuICAgICAgICBpZiAocmV0aHJvdyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IGV4OyAvLyByZS10aHJvdyB0byBwcm9wYWdhdGUgdG8gdGhlIHRvcCBsZXZlbCAoYW5kIGNhdXNlIHdpbmRvdy5vbmVycm9yKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwb3J0LnN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXBvcnQudW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICByZXBvcnQudW5pbnN0YWxsID0gdW5zdWJzY3JpYmVBbGw7XG4gICAgcmV0dXJuIHJlcG9ydDtcbn0oKSk7XG5cbi8qKlxuICogVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2U6IGNyb3NzLWJyb3dzZXIgc3RhY2sgdHJhY2VzIGluIEphdmFTY3JpcHRcbiAqXG4gKiBTeW50YXg6XG4gKiAgIHMgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZShleGNlcHRpb24pIC8vIGNvbnNpZGVyIHVzaW5nIFRyYWNlS2l0LnJlcG9ydCBpbnN0ZWFkIChzZWUgYmVsb3cpXG4gKiBSZXR1cm5zOlxuICogICBzLm5hbWUgICAgICAgICAgICAgIC0gZXhjZXB0aW9uIG5hbWVcbiAqICAgcy5tZXNzYWdlICAgICAgICAgICAtIGV4Y2VwdGlvbiBtZXNzYWdlXG4gKiAgIHMuc3RhY2tbaV0udXJsICAgICAgLSBKYXZhU2NyaXB0IG9yIEhUTUwgZmlsZSBVUkxcbiAqICAgcy5zdGFja1tpXS5mdW5jICAgICAtIGZ1bmN0aW9uIG5hbWUsIG9yIGVtcHR5IGZvciBhbm9ueW1vdXMgZnVuY3Rpb25zIChpZiBndWVzc2luZyBkaWQgbm90IHdvcmspXG4gKiAgIHMuc3RhY2tbaV0uYXJncyAgICAgLSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbiwgaWYga25vd25cbiAqICAgcy5zdGFja1tpXS5saW5lICAgICAtIGxpbmUgbnVtYmVyLCBpZiBrbm93blxuICogICBzLnN0YWNrW2ldLmNvbHVtbiAgIC0gY29sdW1uIG51bWJlciwgaWYga25vd25cbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiAgZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgbnVtYmVycyBhbmQgdW5yZWxpYWJsZSBjb2x1bW5cbiAqICAgICAgICAgICAgICAgbnVtYmVyIG9uIHRvcCBmcmFtZVxuICogICAtIE9wZXJhIDEwOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBPcGVyYSA5LTogZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgbnVtYmVyc1xuICogICAtIENocm9tZTogICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6ICAgbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcG1vc3Qgc3RhY2t0cmFjZSBlbGVtZW50XG4gKiAgICAgICAgICAgICAgIG9ubHlcbiAqICAgLSBJRTogICAgICAgbm8gbGluZSBudW1iZXJzIHdoYXRzb2V2ZXJcbiAqXG4gKiBUcmllcyB0byBndWVzcyBuYW1lcyBvZiBhbm9ueW1vdXMgZnVuY3Rpb25zIGJ5IGxvb2tpbmcgZm9yIGFzc2lnbm1lbnRzXG4gKiBpbiB0aGUgc291cmNlIGNvZGUuIEluIElFIGFuZCBTYWZhcmksIHdlIGhhdmUgdG8gZ3Vlc3Mgc291cmNlIGZpbGUgbmFtZXNcbiAqIGJ5IHNlYXJjaGluZyBmb3IgZnVuY3Rpb24gYm9kaWVzIGluc2lkZSBhbGwgcGFnZSBzY3JpcHRzLiBUaGlzIHdpbGwgbm90XG4gKiB3b3JrIGZvciBzY3JpcHRzIHRoYXQgYXJlIGxvYWRlZCBjcm9zcy1kb21haW4uXG4gKiBIZXJlIGJlIGRyYWdvbnM6IHNvbWUgZnVuY3Rpb24gbmFtZXMgbWF5IGJlIGd1ZXNzZWQgaW5jb3JyZWN0bHksIGFuZFxuICogZHVwbGljYXRlIGZ1bmN0aW9ucyBtYXkgYmUgbWlzbWF0Y2hlZC5cbiAqXG4gKiBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZSBzaG91bGQgb25seSBiZSB1c2VkIGZvciB0cmFjaW5nIHB1cnBvc2VzLlxuICogTG9nZ2luZyBvZiB1bmhhbmRsZWQgZXhjZXB0aW9ucyBzaG91bGQgYmUgZG9uZSB3aXRoIFRyYWNlS2l0LnJlcG9ydCxcbiAqIHdoaWNoIGJ1aWxkcyBvbiB0b3Agb2YgVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UgYW5kIHByb3ZpZGVzIGJldHRlclxuICogSUUgc3VwcG9ydCBieSB1dGlsaXppbmcgdGhlIHdpbmRvdy5vbmVycm9yIGV2ZW50IHRvIHJldHJpZXZlIGluZm9ybWF0aW9uXG4gKiBhYm91dCB0aGUgdG9wIG9mIHRoZSBzdGFjay5cbiAqXG4gKiBOb3RlOiBJbiBJRSBhbmQgU2FmYXJpLCBubyBzdGFjayB0cmFjZSBpcyByZWNvcmRlZCBvbiB0aGUgRXJyb3Igb2JqZWN0LFxuICogc28gY29tcHV0ZVN0YWNrVHJhY2UgaW5zdGVhZCB3YWxrcyBpdHMgKm93biogY2hhaW4gb2YgY2FsbGVycy5cbiAqIFRoaXMgbWVhbnMgdGhhdDpcbiAqICAqIGluIFNhZmFyaSwgc29tZSBtZXRob2RzIG1heSBiZSBtaXNzaW5nIGZyb20gdGhlIHN0YWNrIHRyYWNlO1xuICogICogaW4gSUUsIHRoZSB0b3Btb3N0IGZ1bmN0aW9uIGluIHRoZSBzdGFjayB0cmFjZSB3aWxsIGFsd2F5cyBiZSB0aGVcbiAqICAgIGNhbGxlciBvZiBjb21wdXRlU3RhY2tUcmFjZS5cbiAqXG4gKiBUaGlzIGlzIG9rYXkgZm9yIHRyYWNpbmcgKGJlY2F1c2UgeW91IGFyZSBsaWtlbHkgdG8gYmUgY2FsbGluZ1xuICogY29tcHV0ZVN0YWNrVHJhY2UgZnJvbSB0aGUgZnVuY3Rpb24geW91IHdhbnQgdG8gYmUgdGhlIHRvcG1vc3QgZWxlbWVudFxuICogb2YgdGhlIHN0YWNrIHRyYWNlIGFueXdheSksIGJ1dCBub3Qgb2theSBmb3IgbG9nZ2luZyB1bmhhbmRsZWRcbiAqIGV4Y2VwdGlvbnMgKGJlY2F1c2UgeW91ciBjYXRjaCBibG9jayB3aWxsIGxpa2VseSBiZSBmYXIgYXdheSBmcm9tIHRoZVxuICogaW5uZXIgZnVuY3Rpb24gdGhhdCBhY3R1YWxseSBjYXVzZWQgdGhlIGV4Y2VwdGlvbikuXG4gKlxuICovXG5UcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZSA9IChmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZVdyYXBwZXIoKSB7XG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBzcGVjaWFsIGNoYXJhY3RlcnMsIGV4Y2VwdCBmb3Igd2hpdGVzcGFjZSwgaW4gYSBzdHJpbmcgdG8gYmVcbiAgICAgKiB1c2VkIGluc2lkZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyBhIHN0cmluZyBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSBzdHJpbmcuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmcgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAodGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bXFwtXFxbXFxde30oKSorPy4sXFxcXFxcXiR8I10vZywgJ1xcXFwkJicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGEgc3RyaW5nIHRvIGJlIHVzZWQgaW5zaWRlIGEgcmVndWxhclxuICAgICAqIGV4cHJlc3Npb24gYXMgYSBzdHJpbmcgbGl0ZXJhbC4gQWxzbyBlbnN1cmVzIHRoYXQgSFRNTCBlbnRpdGllcyB3aWxsXG4gICAgICogYmUgbWF0Y2hlZCB0aGUgc2FtZSBhcyB0aGVpciBsaXRlcmFsIGZyaWVuZHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHkgVGhlIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlc2NhcGVDb2RlQXNSZWdFeHBGb3JNYXRjaGluZ0luc2lkZUhUTUwoYm9keSkge1xuICAgICAgICByZXR1cm4gZXNjYXBlUmVnRXhwKGJvZHkpLnJlcGxhY2UoJzwnLCAnKD86PHwmbHQ7KScpLnJlcGxhY2UoJz4nLCAnKD86PnwmZ3Q7KScpLnJlcGxhY2UoJyYnLCAnKD86JnwmYW1wOyknKS5yZXBsYWNlKCdcIicsICcoPzpcInwmcXVvdDspJykucmVwbGFjZSgvXFxzKy9nLCAnXFxcXHMrJyk7XG4gICAgfVxuXG4gICAgLy8gQ29udGVudHMgb2YgRXhjZXB0aW9uIGluIHZhcmlvdXMgYnJvd3NlcnMuXG4gICAgLy9cbiAgICAvLyBTQUZBUkk6XG4gICAgLy8gZXgubWVzc2FnZSA9IENhbid0IGZpbmQgdmFyaWFibGU6IHFxXG4gICAgLy8gZXgubGluZSA9IDU5XG4gICAgLy8gZXguc291cmNlSWQgPSA1ODAyMzgxOTJcbiAgICAvLyBleC5zb3VyY2VVUkwgPSBodHRwOi8vLi4uXG4gICAgLy8gZXguZXhwcmVzc2lvbkJlZ2luT2Zmc2V0ID0gOTZcbiAgICAvLyBleC5leHByZXNzaW9uQ2FyZXRPZmZzZXQgPSA5OFxuICAgIC8vIGV4LmV4cHJlc3Npb25FbmRPZmZzZXQgPSA5OFxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vXG4gICAgLy8gRklSRUZPWDpcbiAgICAvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcbiAgICAvLyBleC5maWxlTmFtZSA9IGh0dHA6Ly8uLi5cbiAgICAvLyBleC5saW5lTnVtYmVyID0gNTlcbiAgICAvLyBleC5jb2x1bW5OdW1iZXIgPSA2OVxuICAgIC8vIGV4LnN0YWNrID0gLi4uc3RhY2sgdHJhY2UuLi4gKHNlZSB0aGUgZXhhbXBsZSBiZWxvdylcbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvL1xuICAgIC8vIENIUk9NRTpcbiAgICAvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvLyBleC50eXBlID0gbm90X2RlZmluZWRcbiAgICAvLyBleC5hcmd1bWVudHMgPSBbJ2FhJ11cbiAgICAvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uXG4gICAgLy9cbiAgICAvLyBJTlRFUk5FVCBFWFBMT1JFUjpcbiAgICAvLyBleC5tZXNzYWdlID0gLi4uXG4gICAgLy8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG4gICAgLy9cbiAgICAvLyBPUEVSQTpcbiAgICAvLyBleC5tZXNzYWdlID0gLi4ubWVzc2FnZS4uLiAoc2VlIHRoZSBleGFtcGxlIGJlbG93KVxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vIGV4Lm9wZXJhI3NvdXJjZWxvYyA9IDExICAocHJldHR5IG11Y2ggdXNlbGVzcywgZHVwbGljYXRlcyB0aGUgaW5mbyBpbiBleC5tZXNzYWdlKVxuICAgIC8vIGV4LnN0YWNrdHJhY2UgPSBuL2E7IHNlZSAnb3BlcmE6Y29uZmlnI1VzZXJQcmVmc3xFeGNlcHRpb25zIEhhdmUgU3RhY2t0cmFjZSdcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrIHByb3BlcnR5LlxuICAgICAqIENocm9tZSBhbmQgR2Vja28gdXNlIHRoaXMgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AoZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleC5zdGFjayA9PT0gJ3VuZGVmaW5lZCcgfHwgIWV4LnN0YWNrKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNocm9tZSA9IC9eXFxzKmF0ICguKj8pID9cXCgoKD86ZmlsZXxodHRwcz98YmxvYnxjaHJvbWUtZXh0ZW5zaW9ufG5hdGl2ZXxldmFsfDxhbm9ueW1vdXM+KS4qPykoPzo6KFxcZCspKT8oPzo6KFxcZCspKT9cXCk/XFxzKiQvaSxcbiAgICAgICAgICAgIGdlY2tvID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/KD86XnxAKSgoPzpmaWxlfGh0dHBzP3xibG9ifGNocm9tZXxcXFtuYXRpdmUpLio/KSg/OjooXFxkKykpPyg/OjooXFxkKykpP1xccyokL2ksXG4gICAgICAgICAgICB3aW5qcyA9IC9eXFxzKmF0ICg/OigoPzpcXFtvYmplY3Qgb2JqZWN0XFxdKT8uKykgKT9cXCg/KCg/OmZpbGV8bXMtYXBweHxodHRwcz98YmxvYik6Lio/KTooXFxkKykoPzo6KFxcZCspKT9cXCk/XFxzKiQvaSxcbiAgICAgICAgICAgIGxpbmVzID0gZXguc3RhY2suc3BsaXQoJ1xcbicpLFxuICAgICAgICAgICAgc3RhY2sgPSBbXSxcbiAgICAgICAgICAgIHBhcnRzLFxuICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IC9eKC4qKSBpcyB1bmRlZmluZWQkLy5leGVjKGV4Lm1lc3NhZ2UpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gbGluZXMubGVuZ3RoOyBpIDwgajsgKytpKSB7XG4gICAgICAgICAgICBpZiAoKHBhcnRzID0gY2hyb21lLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgICAgICAgICAgIHZhciBpc05hdGl2ZSA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ25hdGl2ZScpICE9PSAtMTtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogIWlzTmF0aXZlID8gcGFydHNbMl0gOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICdhcmdzJzogaXNOYXRpdmUgPyBbcGFydHNbMl1dIDogW10sXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogcGFydHNbM10gPyArcGFydHNbM10gOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHBhcnRzID0gd2luanMuZXhlYyhsaW5lc1tpXSkgKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICdhcmdzJzogW10sXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogK3BhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gZ2Vja28uZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICdhcmdzJzogcGFydHNbMl0gPyBwYXJ0c1syXS5zcGxpdCgnLCcpIDogW10sXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogcGFydHNbNV0gPyArcGFydHNbNV0gOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZnVuYyA9IFVOS05PV05fRlVOQ1RJT047XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrLnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YWNrWzBdLmNvbHVtbiAmJiB0eXBlb2YgZXguY29sdW1uTnVtYmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gRmlyZUZveCB1c2VzIHRoaXMgYXdlc29tZSBjb2x1bW5OdW1iZXIgcHJvcGVydHkgZm9yIGl0cyB0b3AgZnJhbWVcbiAgICAgICAgICAgIC8vIEFsc28gbm90ZSwgRmlyZWZveCdzIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZCBhbmQgZXZlcnl0aGluZyBlbHNlIGV4cGVjdHMgMS1iYXNlZCxcbiAgICAgICAgICAgIC8vIHNvIGFkZGluZyAxXG4gICAgICAgICAgICBzdGFja1swXS5jb2x1bW4gPSBleC5jb2x1bW5OdW1iZXIgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICduYW1lJzogZXgubmFtZSxcbiAgICAgICAgICAgICdtZXNzYWdlJzogZXgubWVzc2FnZSxcbiAgICAgICAgICAgICd1cmwnOiBnZXRMb2NhdGlvbkhyZWYoKSxcbiAgICAgICAgICAgICdzdGFjayc6IHN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZmlyc3QgZnJhbWUgdG8gaW5jb21wbGV0ZSBzdGFjayB0cmFjZXMuXG4gICAgICogU2FmYXJpIGFuZCBJRSByZXF1aXJlIHRoaXMgdG8gZ2V0IGNvbXBsZXRlIGRhdGEgb24gdGhlIGZpcnN0IGZyYW1lLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsICo+fSBzdGFja0luZm8gU3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gZnJvbVxuICAgICAqIG9uZSBvZiB0aGUgY29tcHV0ZSogbWV0aG9kcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgb2YgdGhlIHNjcmlwdCB0aGF0IGNhdXNlZCBhbiBlcnJvci5cbiAgICAgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKX0gbGluZU5vIFRoZSBsaW5lIG51bWJlciBvZiB0aGUgc2NyaXB0IHRoYXRcbiAgICAgKiBjYXVzZWQgYW4gZXJyb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBlcnJvciBnZW5lcmF0ZWQgYnkgdGhlIGJyb3dzZXIsIHdoaWNoXG4gICAgICogaG9wZWZ1bGx5IGNvbnRhaW5zIHRoZSBuYW1lIG9mIHRoZSBvYmplY3QgdGhhdCBjYXVzZWQgdGhlIGVycm9yLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBzdGFjayBpbmZvcm1hdGlvbiB3YXNcbiAgICAgKiBhdWdtZW50ZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQoc3RhY2tJbmZvLCB1cmwsIGxpbmVObywgbWVzc2FnZSkge1xuICAgICAgICB2YXIgaW5pdGlhbCA9IHtcbiAgICAgICAgICAgICd1cmwnOiB1cmwsXG4gICAgICAgICAgICAnbGluZSc6IGxpbmVOb1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpbml0aWFsLnVybCAmJiBpbml0aWFsLmxpbmUpIHtcbiAgICAgICAgICAgIHN0YWNrSW5mby5pbmNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5pdGlhbC5mdW5jKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbC5mdW5jID0gVU5LTk9XTl9GVU5DVElPTjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YWNrSW5mby5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrSW5mby5zdGFja1swXS51cmwgPT09IGluaXRpYWwudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFja0luZm8uc3RhY2tbMF0ubGluZSA9PT0gaW5pdGlhbC5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGFscmVhZHkgaW4gc3RhY2sgdHJhY2VcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc3RhY2tJbmZvLnN0YWNrWzBdLmxpbmUgJiYgc3RhY2tJbmZvLnN0YWNrWzBdLmZ1bmMgPT09IGluaXRpYWwuZnVuYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tJbmZvLnN0YWNrWzBdLmxpbmUgPSBpbml0aWFsLmxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrSW5mby5zdGFjay51bnNoaWZ0KGluaXRpYWwpO1xuICAgICAgICAgICAgc3RhY2tJbmZvLnBhcnRpYWwgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFja0luZm8uaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gYnkgd2Fsa2luZyB0aGUgYXJndW1lbnRzLmNhbGxlclxuICAgICAqIGNoYWluIGF0IHRoZSB0aW1lIHRoZSBleGNlcHRpb24gb2NjdXJyZWQuIFRoaXMgd2lsbCBjYXVzZSBlYXJsaWVyXG4gICAgICogZnJhbWVzIHRvIGJlIG1pc3NlZCBidXQgaXMgdGhlIG9ubHkgd2F5IHRvIGdldCBhbnkgc3RhY2sgdHJhY2UgaW5cbiAgICAgKiBTYWZhcmkgYW5kIElFLiBUaGUgdG9wIGZyYW1lIGlzIHJlc3RvcmVkIGJ5XG4gICAgICoge0BsaW5rIGF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50fS5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBleFxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKj59IFN0YWNrIHRyYWNlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4oZXgsIGRlcHRoKSB7XG4gICAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSAvZnVuY3Rpb25cXHMrKFtfJGEtekEtWlxceEEwLVxcdUZGRkZdW18kYS16QS1aMC05XFx4QTAtXFx1RkZGRl0qKT9cXHMqXFwoL2ksXG4gICAgICAgICAgICBzdGFjayA9IFtdLFxuICAgICAgICAgICAgZnVuY3MgPSB7fSxcbiAgICAgICAgICAgIHJlY3Vyc2lvbiA9IGZhbHNlLFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgc291cmNlO1xuXG4gICAgICAgIGZvciAodmFyIGN1cnIgPSBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluLmNhbGxlcjsgY3VyciAmJiAhcmVjdXJzaW9uOyBjdXJyID0gY3Vyci5jYWxsZXIpIHtcbiAgICAgICAgICAgIGlmIChjdXJyID09PSBjb21wdXRlU3RhY2tUcmFjZSB8fCBjdXJyID09PSBUcmFjZUtpdC5yZXBvcnQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2tpcHBpbmcgaW50ZXJuYWwgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAndXJsJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnZnVuYyc6IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgJ2xpbmUnOiBudWxsLFxuICAgICAgICAgICAgICAgICdjb2x1bW4nOiBudWxsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY3Vyci5uYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5mdW5jID0gY3Vyci5uYW1lO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgocGFydHMgPSBmdW5jdGlvbk5hbWUuZXhlYyhjdXJyLnRvU3RyaW5nKCkpKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZnVuYyA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZnVuYyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpdGVtLmZ1bmMgPSBwYXJ0cy5pbnB1dC5zdWJzdHJpbmcoMCwgcGFydHMuaW5wdXQuaW5kZXhPZigneycpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmdW5jc1snJyArIGN1cnJdKSB7XG4gICAgICAgICAgICAgICAgcmVjdXJzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGZ1bmNzWycnICsgY3Vycl0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFjay5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlcHRoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVwdGggaXMgJyArIGRlcHRoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdGFjayBpcyAnICsgc3RhY2subGVuZ3RoKTtcbiAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCBkZXB0aCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBleC5tZXNzYWdlLFxuICAgICAgICAgICAgJ3VybCc6IGdldExvY2F0aW9uSHJlZigpLFxuICAgICAgICAgICAgJ3N0YWNrJzogc3RhY2tcbiAgICAgICAgfTtcbiAgICAgICAgYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQocmVzdWx0LCBleC5zb3VyY2VVUkwgfHwgZXguZmlsZU5hbWUsIGV4LmxpbmUgfHwgZXgubGluZU51bWJlciwgZXgubWVzc2FnZSB8fCBleC5kZXNjcmlwdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgYSBzdGFjayB0cmFjZSBmb3IgYW4gZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGV4XG4gICAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcik9fSBkZXB0aFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlKGV4LCBkZXB0aCkge1xuICAgICAgICB2YXIgc3RhY2sgPSBudWxsO1xuICAgICAgICBkZXB0aCA9IChkZXB0aCA9PSBudWxsID8gMCA6ICtkZXB0aCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4KTtcbiAgICAgICAgICAgIGlmIChzdGFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKFRyYWNlS2l0LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4oZXgsIGRlcHRoICsgMSk7XG4gICAgICAgICAgICBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChUcmFjZUtpdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBleC5tZXNzYWdlLFxuICAgICAgICAgICAgJ3VybCc6IGdldExvY2F0aW9uSHJlZigpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQgPSBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudDtcbiAgICBjb21wdXRlU3RhY2tUcmFjZS5jb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3A7XG5cbiAgICByZXR1cm4gY29tcHV0ZVN0YWNrVHJhY2U7XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNlS2l0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JhdmVuLWpzL3ZlbmRvci9UcmFjZUtpdC90cmFjZWtpdC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gUmF2ZW5Db25maWdFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5uYW1lID0gJ1JhdmVuQ29uZmlnRXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5SYXZlbkNvbmZpZ0Vycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuUmF2ZW5Db25maWdFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSYXZlbkNvbmZpZ0Vycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhdmVuQ29uZmlnRXJyb3I7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmF2ZW4tanMvc3JjL2NvbmZpZ0Vycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5leHBvcnRzLmdldFNlcmlhbGl6ZSA9IHNlcmlhbGl6ZXJcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcywgY3ljbGVSZXBsYWNlcikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSwgc3BhY2VzKVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHZhciBzdGFjayA9IFtdLCBrZXlzID0gW11cblxuICBpZiAoY3ljbGVSZXBsYWNlciA9PSBudWxsKSBjeWNsZVJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFja1swXSA9PT0gdmFsdWUpIHJldHVybiBcIltDaXJjdWxhciB+XVwiXG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyIH4uXCIgKyBrZXlzLnNsaWNlKDAsIHN0YWNrLmluZGV4T2YodmFsdWUpKS5qb2luKFwiLlwiKSArIFwiXVwiXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgdGhpc1BvcyA9IHN0YWNrLmluZGV4T2YodGhpcylcbiAgICAgIH50aGlzUG9zID8gc3RhY2suc3BsaWNlKHRoaXNQb3MgKyAxKSA6IHN0YWNrLnB1c2godGhpcylcbiAgICAgIH50aGlzUG9zID8ga2V5cy5zcGxpY2UodGhpc1BvcywgSW5maW5pdHksIGtleSkgOiBrZXlzLnB1c2goa2V5KVxuICAgICAgaWYgKH5zdGFjay5pbmRleE9mKHZhbHVlKSkgdmFsdWUgPSBjeWNsZVJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBzdGFjay5wdXNoKHZhbHVlKVxuXG4gICAgcmV0dXJuIHJlcGxhY2VyID09IG51bGwgPyB2YWx1ZSA6IHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2pzb24tc3RyaW5naWZ5LXNhZmUvc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgd3JhcE1ldGhvZCA9IGZ1bmN0aW9uKGNvbnNvbGUsIGxldmVsLCBjYWxsYmFjaykge1xuICAgIHZhciBvcmlnaW5hbENvbnNvbGVMZXZlbCA9IGNvbnNvbGVbbGV2ZWxdO1xuICAgIHZhciBvcmlnaW5hbENvbnNvbGUgPSBjb25zb2xlO1xuXG4gICAgaWYgKCEobGV2ZWwgaW4gY29uc29sZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzZW50cnlMZXZlbCA9IGxldmVsID09PSAnd2FybidcbiAgICAgICAgPyAnd2FybmluZydcbiAgICAgICAgOiBsZXZlbDtcblxuICAgIGNvbnNvbGVbbGV2ZWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgICAgICB2YXIgbXNnID0gJycgKyBhcmdzLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7bGV2ZWw6IHNlbnRyeUxldmVsLCBsb2dnZXI6ICdjb25zb2xlJywgZXh0cmE6IHsnYXJndW1lbnRzJzogYXJnc319O1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhtc2csIGRhdGEpO1xuXG4gICAgICAgIC8vIHRoaXMgZmFpbHMgZm9yIHNvbWUgYnJvd3NlcnMuIDooXG4gICAgICAgIGlmIChvcmlnaW5hbENvbnNvbGVMZXZlbCkge1xuICAgICAgICAgICAgLy8gSUU5IGRvZXNuJ3QgYWxsb3cgY2FsbGluZyBhcHBseSBvbiBjb25zb2xlIGZ1bmN0aW9ucyBkaXJlY3RseVxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NDcyOTM4L2RvZXMtaWU5LXN1cHBvcnQtY29uc29sZS1sb2ctYW5kLWlzLWl0LWEtcmVhbC1mdW5jdGlvbiNhbnN3ZXItNTQ3MzE5M1xuICAgICAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxDb25zb2xlTGV2ZWwsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxDb25zb2xlLFxuICAgICAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgd3JhcE1ldGhvZDogd3JhcE1ldGhvZFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yYXZlbi1qcy9zcmMvY29uc29sZS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gQ29uc3RhbnRzIHRhYmxlXG5cdCAgICB2YXIgVCA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgVFtpXSA9IChNYXRoLmFicyhNYXRoLnNpbihpICsgMSkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIE1ENSBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIE1ENSA9IENfYWxnby5NRDUgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIDB4Njc0NTIzMDEsIDB4ZWZjZGFiODksXG5cdCAgICAgICAgICAgICAgICAweDk4YmFkY2ZlLCAweDEwMzI1NDc2XG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBvZmZzZXRfaSA9IG9mZnNldCArIGk7XG5cdCAgICAgICAgICAgICAgICB2YXIgTV9vZmZzZXRfaSA9IE1bb2Zmc2V0X2ldO1xuXG5cdCAgICAgICAgICAgICAgICBNW29mZnNldF9pXSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDgpICB8IChNX29mZnNldF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgMjQpIHwgKE1fb2Zmc2V0X2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzAgID0gTVtvZmZzZXQgKyAwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEgID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzIgID0gTVtvZmZzZXQgKyAyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzMgID0gTVtvZmZzZXQgKyAzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzQgID0gTVtvZmZzZXQgKyA0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzUgID0gTVtvZmZzZXQgKyA1XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzYgID0gTVtvZmZzZXQgKyA2XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzcgID0gTVtvZmZzZXQgKyA3XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzggID0gTVtvZmZzZXQgKyA4XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzkgID0gTVtvZmZzZXQgKyA5XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEwID0gTVtvZmZzZXQgKyAxMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMSA9IE1bb2Zmc2V0ICsgMTFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTIgPSBNW29mZnNldCArIDEyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEzID0gTVtvZmZzZXQgKyAxM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNCA9IE1bb2Zmc2V0ICsgMTRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTUgPSBNW29mZnNldCArIDE1XTtcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhbGJlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA3LCAgVFswXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xLCAgMTIsIFRbMV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE3LCBUWzJdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzMsICAyMiwgVFszXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNywgIFRbNF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfNSwgIDEyLCBUWzVdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNywgVFs2XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF83LCAgMjIsIFRbN10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDcsICBUWzhdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzksICAxMiwgVFs5XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTcsIFRbMTBdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzExLCAyMiwgVFsxMV0pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDcsICBUWzEyXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xMywgMTIsIFRbMTNdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNywgVFsxNF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTUsIDIyLCBUWzE1XSk7XG5cblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA1LCAgVFsxNl0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfNiwgIDksICBUWzE3XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTQsIFRbMThdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzAsICAyMCwgVFsxOV0pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDUsICBUWzIwXSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xMCwgOSwgIFRbMjFdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNCwgVFsyMl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfNCwgIDIwLCBUWzIzXSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNSwgIFRbMjRdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE0LCA5LCAgVFsyNV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE0LCBUWzI2XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF84LCAgMjAsIFRbMjddKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA1LCAgVFsyOF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMiwgIDksICBUWzI5XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTQsIFRbMzBdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEyLCAyMCwgVFszMV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNCwgIFRbMzJdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzgsICAxMSwgVFszM10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE2LCBUWzM0XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xNCwgMjMsIFRbMzVdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA0LCAgVFszNl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfNCwgIDExLCBUWzM3XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTYsIFRbMzhdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEwLCAyMywgVFszOV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDQsICBUWzQwXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8wLCAgMTEsIFRbNDFdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNiwgVFs0Ml0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfNiwgIDIzLCBUWzQzXSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNCwgIFRbNDRdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEyLCAxMSwgVFs0NV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE2LCBUWzQ2XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8yLCAgMjMsIFRbNDddKTtcblxuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDYsICBUWzQ4XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF83LCAgMTAsIFRbNDldKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNSwgVFs1MF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfNSwgIDIxLCBUWzUxXSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNiwgIFRbNTJdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzMsICAxMCwgVFs1M10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE1LCBUWzU0XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xLCAgMjEsIFRbNTVdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA2LCAgVFs1Nl0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTUsIDEwLCBUWzU3XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTUsIFRbNThdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEzLCAyMSwgVFs1OV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDYsICBUWzYwXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xMSwgMTAsIFRbNjFdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNSwgVFs2Ml0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfOSwgIDIxLCBUWzYzXSk7XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxIID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEwgPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDgpICB8IChuQml0c1RvdGFsSCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDI0KSB8IChuQml0c1RvdGFsSCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgOCkgIHwgKG5CaXRzVG90YWxMID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgMjQpIHwgKG5CaXRzVG90YWxMID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gKGRhdGFXb3Jkcy5sZW5ndGggKyAxKSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2g7XG5cdCAgICAgICAgICAgIHZhciBIID0gaGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBIX2kgPSBIW2ldO1xuXG5cdCAgICAgICAgICAgICAgICBIW2ldID0gKCgoSF9pIDw8IDgpICB8IChIX2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoSF9pIDw8IDI0KSB8IChIX2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBGRihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgYykgfCAofmIgJiBkKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBHRyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgZCkgfCAoYyAmIH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBISChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBJSShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5NRDUgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihNRDUpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY01ENShtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNNRDUgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoTUQ1KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuTUQ1O1xuXG59KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NyeXB0by1qcy9tZDUuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cblx0LyoqXG5cdCAqIENyeXB0b0pTIGNvcmUgY29tcG9uZW50cy5cblx0ICovXG5cdHZhciBDcnlwdG9KUyA9IENyeXB0b0pTIHx8IChmdW5jdGlvbiAoTWF0aCwgdW5kZWZpbmVkKSB7XG5cdCAgICAvKlxuXHQgICAgICogTG9jYWwgcG9seWZpbCBvZiBPYmplY3QuY3JlYXRlXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHt9O1xuXG5cdCAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICAgICAgdmFyIHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG5cblx0ICAgICAgICAgICAgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBudWxsO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgIH07XG5cdCAgICB9KCkpXG5cblx0ICAgIC8qKlxuXHQgICAgICogQ3J5cHRvSlMgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExpYnJhcnkgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2Ugb2JqZWN0IGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXG5cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzIFByb3BlcnRpZXMgdG8gY29weSBpbnRvIHRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3Bhd25cblx0ICAgICAgICAgICAgICAgIHZhciBzdWJ0eXBlID0gY3JlYXRlKHRoaXMpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBdWdtZW50XG5cdCAgICAgICAgICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5taXhJbihvdmVycmlkZXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBpbml0aWFsaXplclxuXHQgICAgICAgICAgICAgICAgaWYgKCFzdWJ0eXBlLmhhc093blByb3BlcnR5KCdpbml0JykgfHwgdGhpcy5pbml0ID09PSBzdWJ0eXBlLmluaXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplcidzIHByb3RvdHlwZSBpcyB0aGUgc3VidHlwZSBvYmplY3Rcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdC5wcm90b3R5cGUgPSBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZWZlcmVuY2Ugc3VwZXJ0eXBlXG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlciA9IHRoaXM7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBFeHRlbmRzIHRoaXMgb2JqZWN0IGFuZCBydW5zIHRoZSBpbml0IG1ldGhvZC5cblx0ICAgICAgICAgICAgICogQXJndW1lbnRzIHRvIGNyZWF0ZSgpIHdpbGwgYmUgcGFzc2VkIHRvIGluaXQoKS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGluc3RhbmNlID0gTXlUeXBlLmNyZWF0ZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmV4dGVuZCgpO1xuXHQgICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5pdC5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBhZGQgc29tZSBsb2dpYyB3aGVuIHlvdXIgb2JqZWN0cyBhcmUgY3JlYXRlZC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICAgICAgLy8gLi4uXG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENvcGllcyBwcm9wZXJ0aWVzIGludG8gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRvIG1peCBpbi5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIE15VHlwZS5taXhJbih7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZSdcblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgbWl4SW46IGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSUUgd29uJ3QgY29weSB0b1N0cmluZyB1c2luZyB0aGUgbG9vcCBhYm92ZVxuXHQgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gcHJvcGVydGllcy50b1N0cmluZztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gaW5zdGFuY2UuY2xvbmUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10sIDYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyB3b3JkIGFycmF5IHRvIGEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyIChPcHRpb25hbCkgVGhlIGVuY29kaW5nIHN0cmF0ZWd5IHRvIHVzZS4gRGVmYXVsdDogQ3J5cHRvSlMuZW5jLkhleFxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheSArICcnO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKCk7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoZW5jb2Rlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gKGVuY29kZXIgfHwgSGV4KS5zdHJpbmdpZnkodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmNhdGVuYXRlcyBhIHdvcmQgYXJyYXkgdG8gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5MS5jb25jYXQod29yZEFycmF5Mik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29uY2F0OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgdGhpc1dvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRXb3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoaXNTaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0U2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgdGhpcy5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbmNhdFxuXHQgICAgICAgICAgICBpZiAodGhpc1NpZ0J5dGVzICUgNCkge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgYnl0ZSBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdEJ5dGUgPSAodGhhdFdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSB8PSB0aGF0Qnl0ZSA8PCAoMjQgLSAoKHRoaXNTaWdCeXRlcyArIGkpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIHdvcmQgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gPSB0aGF0V29yZHNbaSA+Pj4gMl07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyArPSB0aGF0U2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZW1vdmVzIGluc2lnbmlmaWNhbnQgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xhbXA6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXBcblx0ICAgICAgICAgICAgd29yZHNbc2lnQnl0ZXMgPj4+IDJdICY9IDB4ZmZmZmZmZmYgPDwgKDMyIC0gKHNpZ0J5dGVzICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgd29yZHMubGVuZ3RoID0gTWF0aC5jZWlsKHNpZ0J5dGVzIC8gNCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB3b3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSB3b3JkIGFycmF5IGZpbGxlZCB3aXRoIHJhbmRvbSBieXRlcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuQnl0ZXMgVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgdG8gZ2VuZXJhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSByYW5kb20gd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKDE2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByYW5kb206IGZ1bmN0aW9uIChuQnl0ZXMpIHtcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cblx0ICAgICAgICAgICAgdmFyIHIgPSAoZnVuY3Rpb24gKG1fdykge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1fdyA9IG1fdztcblx0ICAgICAgICAgICAgICAgIHZhciBtX3ogPSAweDNhZGU2OGIxO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hc2sgPSAweGZmZmZmZmZmO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgIG1feiA9ICgweDkwNjkgKiAobV96ICYgMHhGRkZGKSArIChtX3ogPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICBtX3cgPSAoMHg0NjUwICogKG1fdyAmIDB4RkZGRikgKyAobV93ID4+IDB4MTApKSAmIG1hc2s7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICgobV96IDw8IDB4MTApICsgbV93KSAmIG1hc2s7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0IC89IDB4MTAwMDAwMDAwO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAwLjU7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAqIChNYXRoLnJhbmRvbSgpID4gLjUgPyAxIDogLTEpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcmNhY2hlOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBfciA9IHIoKHJjYWNoZSB8fCBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDAwMDAwKTtcblxuXHQgICAgICAgICAgICAgICAgcmNhY2hlID0gX3IoKSAqIDB4M2FkZTY3Yjc7XG5cdCAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKChfcigpICogMHgxMDAwMDAwMDApIHwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEVuY29kZXIgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEhleCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhleCA9IENfZW5jLkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoZXhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuSGV4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgaGV4Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlID4+PiA0KS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSAmIDB4MGYpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gaGV4Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4U3RyIFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5IZXgucGFyc2UoaGV4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGhleFN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGV4U3RyTGVuZ3RoID0gaGV4U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhleFN0ckxlbmd0aDsgaSArPSAyKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAzXSB8PSBwYXJzZUludChoZXhTdHIuc3Vic3RyKGksIDIpLCAxNikgPDwgKDI0IC0gKGkgJSA4KSAqIDQpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgaGV4U3RyTGVuZ3RoIC8gMik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMYXRpbjEgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBMYXRpbjEgPSBDX2VuYy5MYXRpbjEgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbGF0aW4xU3RyaW5nID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMUNoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgbGF0aW4xQ2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdGUpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBsYXRpbjFDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBMYXRpbjEgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXRpbjFTdHIgVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5wYXJzZShsYXRpbjFTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAobGF0aW4xU3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFTdHJMZW5ndGggPSBsYXRpbjFTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF0aW4xU3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDJdIHw9IChsYXRpbjFTdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpIDw8ICgyNCAtIChpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGxhdGluMVN0ckxlbmd0aCk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtOCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGY4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLlV0Zjguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShMYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSkpKTtcblx0ICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgVVRGLTggZGF0YScpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgVVRGLTggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dGY4U3RyIFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodXRmOFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGY4U3RyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBMYXRpbjEucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHV0ZjhTdHIpKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBidWZmZXJlZCBibG9jayBhbGdvcml0aG0gdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogVGhlIHByb3BlcnR5IGJsb2NrU2l6ZSBtdXN0IGJlIGltcGxlbWVudGVkIGluIGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX21pbkJ1ZmZlclNpemUgVGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBzaG91bGQgYmUga2VwdCB1bnByb2Nlc3NlZCBpbiB0aGUgYnVmZmVyLiBEZWZhdWx0OiAwXG5cdCAgICAgKi9cblx0ICAgIHZhciBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQ19saWIuQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBibG9jayBhbGdvcml0aG0ncyBkYXRhIGJ1ZmZlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgV29yZEFycmF5LmluaXQoKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyA9IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgbmV3IGRhdGEgdG8gdGhpcyBibG9jayBhbGdvcml0aG0ncyBidWZmZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYXBwZW5kLiBTdHJpbmdzIGFyZSBjb252ZXJ0ZWQgdG8gYSBXb3JkQXJyYXkgdXNpbmcgVVRGLTguXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCgnZGF0YScpO1xuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgZGF0YSA9IFV0ZjgucGFyc2UoZGF0YSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YS5jb25jYXQoZGF0YSk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgKz0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUHJvY2Vzc2VzIGF2YWlsYWJsZSBkYXRhIGJsb2Nrcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIFRoaXMgbWV0aG9kIGludm9rZXMgX2RvUHJvY2Vzc0Jsb2NrKG9mZnNldCksIHdoaWNoIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBkb0ZsdXNoIFdoZXRoZXIgYWxsIGJsb2NrcyBhbmQgcGFydGlhbCBibG9ja3Mgc2hvdWxkIGJlIHByb2Nlc3NlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHByb2Nlc3NlZCBkYXRhLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX3Byb2Nlc3M6IGZ1bmN0aW9uIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVNpZ0J5dGVzID0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IHRoaXMuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJsb2NrcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJsb2Nrc1JlYWR5ID0gZGF0YVNpZ0J5dGVzIC8gYmxvY2tTaXplQnl0ZXM7XG5cdCAgICAgICAgICAgIGlmIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCB1cCB0byBpbmNsdWRlIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLmNlaWwobkJsb2Nrc1JlYWR5KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIGRvd24gdG8gaW5jbHVkZSBvbmx5IGZ1bGwgYmxvY2tzLFxuXHQgICAgICAgICAgICAgICAgLy8gbGVzcyB0aGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IG11c3QgcmVtYWluIGluIHRoZSBidWZmZXJcblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGgubWF4KChuQmxvY2tzUmVhZHkgfCAwKSAtIHRoaXMuX21pbkJ1ZmZlclNpemUsIDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgd29yZHMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5Xb3Jkc1JlYWR5ID0gbkJsb2Nrc1JlYWR5ICogYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJ5dGVzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQnl0ZXNSZWFkeSA9IE1hdGgubWluKG5Xb3Jkc1JlYWR5ICogNCwgZGF0YVNpZ0J5dGVzKTtcblxuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIGJsb2Nrc1xuXHQgICAgICAgICAgICBpZiAobldvcmRzUmVhZHkpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IG5Xb3Jkc1JlYWR5OyBvZmZzZXQgKz0gYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1hbGdvcml0aG0gbG9naWNcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb1Byb2Nlc3NCbG9jayhkYXRhV29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzZWRXb3JkcyA9IGRhdGFXb3Jkcy5zcGxpY2UoMCwgbldvcmRzUmVhZHkpO1xuXHQgICAgICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuQnl0ZXNSZWFkeTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdChwcm9jZXNzZWRXb3JkcywgbkJ5dGVzUmVhZHkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5fZGF0YSA9IHRoaXMuX2RhdGEuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9taW5CdWZmZXJTaXplOiAwXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBoYXNoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbnVtYmVyIG9mIDMyLWJpdCB3b3JkcyB0aGlzIGhhc2hlciBvcGVyYXRlcyBvbi4gRGVmYXVsdDogMTYgKDUxMiBiaXRzKVxuXHQgICAgICovXG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyID0gQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKCksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoZXIgPSBDcnlwdG9KUy5hbGdvLlNIQTI1Ni5jcmVhdGUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGhhc2hlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gUmVzZXQgZGF0YSBidWZmZXJcblx0ICAgICAgICAgICAgQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHRoaXMuX2RvUmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVXBkYXRlcyB0aGlzIGhhc2hlciB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtIYXNoZXJ9IFRoaXMgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBoYXNoXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEZpbmFsaXplcyB0aGUgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIChPcHRpb25hbCkgQSBmaW5hbCBtZXNzYWdlIHVwZGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIG1lc3NhZ2UgdXBkYXRlXG5cdCAgICAgICAgICAgIGlmIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2RvRmluYWxpemUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiA1MTIvMzIsXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gYSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIGNyZWF0ZSBhIGhlbHBlciBmb3IuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGhhc2hlci5pbml0KGNmZykuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gdXNlIGluIHRoaXMgSE1BQyBoZWxwZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgSG1hY1NIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIbWFjSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwga2V5KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENfYWxnby5ITUFDLmluaXQoaGFzaGVyLCBrZXkpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFsZ29yaXRobSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ28gPSB7fTtcblxuXHQgICAgcmV0dXJuIEM7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NyeXB0by1qcy9jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIl0sInNvdXJjZVJvb3QiOiIifQ==