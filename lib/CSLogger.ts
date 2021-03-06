"use strict";
/**
 * Import interfaces
 */
import IWindow from "../interfaces/IWindow";
/**
 * Declare window interface
 */
declare let window: IWindow;
declare let require: any;
declare let process: any;
declare let module: any;

const MD5 = require("crypto-js/md5");

/**
 * Import Animation frame
 */
import AnimationFrame from "AnimationFrame/lib/AnimationFrame";
import UtilsMain from "Utils/lib/UtilsMain";
import UtilsUser from "Utils/lib/UtilsUser";

const Raven = require("raven-js");

declare var global: any;

let root;

if (typeof window === "undefined") {
  if (typeof global !== "undefined") {
    root = global;
  } else {
    root = {};
  }
} else {
  root = window;
}

const STATUSES: any = {
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

  0: "Something",
};

export class CSLogger {
  public static eventListenerAdded: boolean = false;

  public static arrLog: any[] = [];
  public static arrSended: any[] = [];

  public static projectName: string = "#PACKAGE_NAME#";
  public static projectVersion: string = "#PACKAGE_VERSION#";

  public static settings = {
    loggerUrl: "",
    minLoggerLevel: 500,
    projectName: "",
    projectVersion: "",
    sentryUrl: "",
  };

  public static init(settings) {
    if (typeof settings === "object") {
      for (const prop in settings) {
        if (settings.hasOwnProperty(prop)) {
          CSLogger.settings[prop] = settings[prop];
        }
      }
    }

    if (
        process.env.NODE_ENV === "production" &&
        CSLogger.settings.sentryUrl
    ) {
      Raven.config(
          CSLogger.settings.sentryUrl,
          {
            environment: process.env.NODE_ENV,
            logger: "CSLogger",
            release: CSLogger.settings.projectVersion,
          },
      ).install();
    }

    return CSLogger;
  }

  /**
   * Log method
   * @param status
   * @param message
   * @param properties
   */
  public static log(status?: number,
                    message?: string,
                    properties?: any): boolean {
    if (
        typeof status === "number" &&
        status > 0 &&
        typeof message === "string" &&
        message.length > 0
    ) {
      status = status || 101;
      message = message || STATUSES[status] || "";
      properties = properties || {};

      if (status >= CSLogger.settings.minLoggerLevel) {
        const logObj = {
          date: new Date(),
          location: location.href,
          projectName: CSLogger.settings.projectName,
          projectVersion: CSLogger.settings.projectVersion,
          stack: UtilsMain.stack(),
          user: UtilsUser.getInfo(),
          message,
          properties,
          status,
        };

        CSLogger.arrLog.push(logObj);
      }
      return true;
    } else {
      return false;
    }
  }

  public static statusLavelSentry(status: number): string {
    if (
        typeof status === "number" &&
        status > 0
    ) {
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
      return "";
    }
  }

  public static statusLavelConsole(status: number): string {
    if (
        typeof status === "number" &&
        status > 0
    ) {
      if (status >= 200 && status < 300) {
        return "log";
      } else if (status >= 300 && status < 400) {
        return "info";
      } else if (status >= 400 && status < 500) {
        return "warn";
      } else if (status >= 500) {
        return "error";
      }
      return "debug";
    } else {
      return "";
    }
  }

  public static showMessange(status: number, message: string): boolean {
    if (
        typeof status === "number" &&
        status > 0 &&
        typeof message === "string" &&
        message.length > 0
    ) {
      const messangeLavel = CSLogger.statusLavelConsole(status);

      if (
          typeof window === "object" &&
          typeof window.Debug === "object" &&
          typeof window.Debug.console === "object" &&
          typeof window.Debug.console[messangeLavel] === "function"
      ) {
        window.Debug.console[messangeLavel](message);
      } else if (
          typeof window === "object" &&
          typeof window.CSDebug === "object" &&
          typeof window.CSDebug.console === "object" &&
          typeof window.CSDebug.console[messangeLavel] === "function"
      ) {
        window.CSDebug.console[messangeLavel](message);
      } else if (
          typeof console === "object" &&
          typeof console[messangeLavel] === "function"
      ) {
        console[messangeLavel](message);
      }

      return true;
    } else {
      return false;
    }
  }

  /**
   * Log send watcher
   */
  public static watch() {
    if (CSLogger.arrLog.length > 0 && CSLogger.arrLog.length < 100) {
      for (let j = 0; j < CSLogger.arrLog.length; j++) {
        const l = CSLogger.arrLog[j];
        const data = encodeURIComponent(JSON.stringify(l));
        const uid = MD5(JSON.stringify({
          message: l.message,
          projectName: l.projectName,
          projectVersion: l.projectVersion,
          status: l.status,
        })).toString();
        if (CSLogger.arrSended.indexOf(uid) === -1) {
          CSLogger.arrSended.push(uid);

          if (
              process.env.NODE_ENV === "production" &&
              CSLogger.settings.sentryUrl
          ) {
            Raven.captureMessage(
                l.message,
                {
                  extra: l,
                  level: CSLogger.statusLavelSentry(l.status),
                  logger: "CSLogger",
                  tags: {
                    status: l.status,
                  },
                },
            );
          } else if (
              process.env.NODE_ENV === "production" &&
              CSLogger.settings.loggerUrl
          ) {
            const i = new Image();
            i.src = CSLogger.settings.loggerUrl + "?uid=" + uid + "&data=" + data;
          } else {
            CSLogger.showMessange(l.status, l.message);
          }
        }
      }
      CSLogger.arrLog = [];
    }
  }
}
/**
 * Add logger to global error event
 */
if (!root.eventListenerAdded) {
  const errorHandler = root.onerror;

  root.onerror = (errorMsg, url, lineNumber, column, errorObj) => {
    if (typeof errorHandler === "function") {
      errorHandler(errorMsg, url, lineNumber, column, errorObj);
    }
    CSLogger.log(
        600,
        errorMsg,
        {
          column,
          errorObj,
          lineNumber,
          url,
        },
    );
  };

  root.eventListenerAdded = true;
}
/**
 * Subscribe logger to watcher
 */
AnimationFrame.subscribe({}, CSLogger.watch, []);
/**
 * Return logger
 */
const _Init = CSLogger.init;
export default _Init;
module.exports = _Init;
