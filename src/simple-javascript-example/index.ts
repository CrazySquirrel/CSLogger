"use strict";
declare var require: any;
require("./index.html");

let CSLogger = require("../../lib/CSLogger.js")({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
    projectName: "",
    projectVersion: "",
});
CSLogger.log(100, "Test messange");