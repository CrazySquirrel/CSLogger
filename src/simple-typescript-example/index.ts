"use strict";
declare var require: any;
require("./index.html");

import CSLoggerClass from "../../lib/CSLogger.ts";

let CSLogger = CSLoggerClass({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
    projectName: "#PACKAGE_NAME#",
    projectVersion: "#PACKAGE_VERSION#",
});
CSLogger.log(100, "Test messange");
