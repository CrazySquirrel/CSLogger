# Logger
[![npm version](https://badge.fury.io/js/Logger.svg)](https://github.com/CrazySquirrel/Logger)
[![license](https://img.shields.io/github/license/CrazySquirrel/Logger.svg)](https://github.com/CrazySquirrel/Logger)
[![Github All Releases](https://img.shields.io/github/downloads/CrazySquirrel/Logger/total.svg)](https://github.com/CrazySquirrel/Logger)
[![npm version](https://img.shields.io/badge/donate-%E2%99%A5-red.svg)](http://crazysquirrel.ru/support/)

Logger for JavaScript messages.

## Build
The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.
* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage

```TypeScript
import LoggerClass from "Logger.ts";

let Logger = LoggerClass({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
});
Logger.log(100, "Test messange");
```

or

```JavaScript
let Logger = require("Logger.js")({
    loggerUrl: "http://localhost/",
    minLoggerLevel: 100,
});
Logger.log(100, "Test messange");
```