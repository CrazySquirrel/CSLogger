
# CSLogger

[![npm version](https://badge.fury.io/js/CSLogger.svg)](https://github.com/CrazySquirrel/CSLogger)
[![Code Climate](https://codeclimate.com/github/CrazySquirrel/CSLogger/badges/gpa.svg)](https://codeclimate.com/github/CrazySquirrel/CSLogger)
[![Test Coverage](https://codeclimate.com/github/CrazySquirrel/CSLogger/badges/coverage.svg)](https://codeclimate.com/github/CrazySquirrel/CSLogger/coverage)
[![Issue Count](https://codeclimate.com/github/CrazySquirrel/CSLogger/badges/issue_count.svg)](https://codeclimate.com/github/CrazySquirrel/CSLogger)
[![Donate](https://img.shields.io/badge/donate-%E2%99%A5-red.svg)](http://crazysquirrel.ru/support/)

Logger for JavaScript messages.

## Build

The repository contains pre-compiled files, but if you want to add your
files and compile, then run the following commands in the repository folder.

* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage

```TypeScript
import CSLoggerClass from "CSLogger.ts";

let CSLogger = CSLoggerClass({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
    projectName: "",
    projectVersion: "",
});
CSLogger.log(100, "Test messange");
```

or

```JavaScript
let CSLogger = require("CSLogger.js")({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
    projectName: "",
    projectVersion: "",
});
CSLogger.log(100, "Test messange");
```