"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import CSLoggerClass from "../lib/CSLogger";

let CSLogger = CSLoggerClass({
  loggerUrl: "http://localhost/",
  minLoggerLevel: 100,
  projectName: "",
  projectVersion: "",
});

describe("CSLogger", () => {

  it("CSLogger", () => {
    expect(typeof(CSLoggerClass)).toEqual("function");
    expect(typeof(CSLogger)).toEqual("function");
  });

  it("CSLogger.showMessange", () => {
    let paramsValues: any = [undefined, false, true, 0, 100, 200, 300, 400, 500, 600, 700, "", "test"];
    let dataSet = [];
    for (let x1 of paramsValues) {
      for (let x2 of paramsValues) {
        if (
            [x2].indexOf(x1) === -1 &&
            [x1].indexOf(x2) === -1
        ) {
          let params = [x1, x2];
          let cond = (
              typeof x1 === "number" &&
              x1 > 0 &&
              typeof x2 === "string" &&
              x2.length > 0
          );
          dataSet.push({
            result: cond,
            params,
          });
        }
      }
    }
    for (let set of dataSet) {
      let result = CSLogger.showMessange.apply(CSLogger, set.params);

      expect(typeof result).toEqual("boolean");

      if (set.result) {
        expect(result).toEqual(true);
      } else {
        expect(result).toEqual(false);
      }
    }
  });

  it("CSLogger.log", () => {
    let paramsValues: any = [undefined, false, true, 0, 100, "", "test", {}, () => {
    }, window];
    let dataSet = [];
    for (let x1 of paramsValues) {
      for (let x2 of paramsValues) {
        for (let x3 of paramsValues) {
          if (
              [x2, x3].indexOf(x1) === -1 &&
              [x1, x3].indexOf(x2) === -1 &&
              [x1, x2].indexOf(x3) === -1
          ) {
            let params = [x1, x2];
            let cond = (
                typeof x1 === "number" &&
                x1 > 0 &&
                typeof x2 === "string" &&
                x2.length > 0
            );
            dataSet.push({
              result: cond,
              params,
            });
          }
        }
      }
    }
    for (let set of dataSet) {
      let result = CSLogger.log.apply(CSLogger, set.params);

      expect(typeof result).toEqual("boolean");

      if (set.result) {
        expect(result).toEqual(true);
      } else {
        expect(result).toEqual(false);
      }
    }
  });
});
