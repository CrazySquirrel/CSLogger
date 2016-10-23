# Logger
Logger for JavaScript messanges

## Build
The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.
* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage

```TypeScript
import Logger from "Logger.ts";

Logger.log(status,message,properties);
```

or

```JavaScript
let Logger = required("Logger.js");

Logger.log(status,message,properties);
```