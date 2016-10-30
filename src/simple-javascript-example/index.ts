"use strict";
declare var require: any;
require("./index.html");

import LoggerClass from "../../lib/Logger.ts";

let Logger = LoggerClass({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
});
Logger.log(100, "Test messange");
