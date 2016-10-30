"use strict";
declare var require: any;
require("./index.html");

let Logger = require("../../lib/Logger.js")({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
});
Logger.log(100, "Test messange");
