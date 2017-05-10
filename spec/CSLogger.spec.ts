"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import CSLoggerClass from "../lib/CSLogger";

const CSLogger = CSLoggerClass({
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
    const paramsValues: any = [undefined, false, true, 0, 100, 200, 300, 400, 500, 600, 700, "", "test"];
    const dataSet = [];

    for (let i1 = 0; i1 < paramsValues.length; i1++) {
      const x1 = paramsValues[i1];

      for (let i2 = 0; i2 < paramsValues.length; i2++) {
        const x2 = paramsValues[i2];

        if (
            [x2].indexOf(x1) === -1 &&
            [x1].indexOf(x2) === -1
        ) {
          const params = [x1, x2];
          const cond = (
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
    for (let j = 0; j < dataSet.length; j++) {
      const set = dataSet[j];
      const result = CSLogger.showMessange.apply(CSLogger, set.params);

      expect(typeof result).toEqual("boolean");

      if (set.result) {
        expect(result).toEqual(true);
      } else {
        expect(result).toEqual(false);
      }
    }
  });

  it("CSLogger.log", () => {
    const paramsValues: any = [undefined, false, true, 0, 100, "", "test", {}, () => {
    }, window];
    const dataSet = [];

    for (let i1 = 0; i1 < paramsValues.length; i1++) {
      const x1 = paramsValues[i1];

      for (let i2 = 0; i2 < paramsValues.length; i2++) {
        const x2 = paramsValues[i2];

        for (let i3 = 0; i3 < paramsValues.length; i3++) {
          const x3 = paramsValues[i3];

          if (
              [x2, x3].indexOf(x1) === -1 &&
              [x1, x3].indexOf(x2) === -1 &&
              [x1, x2].indexOf(x3) === -1
          ) {
            const params = [x1, x2];
            const cond = (
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
    for (let j = 0; j < dataSet.length; j++) {
      const set = dataSet[j];
      const result = CSLogger.log.apply(CSLogger, set.params);

      expect(typeof result).toEqual("boolean");

      if (set.result) {
        expect(result).toEqual(true);
      } else {
        expect(result).toEqual(false);
      }
    }
  });
});
