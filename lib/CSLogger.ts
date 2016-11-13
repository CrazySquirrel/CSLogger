"use strict";
/**
 * Import interfaces
 */
import IWindow from "../interfaces/IWindow";
/**
 * Declare window interface
 */
declare var window: IWindow;
declare var require: any;
declare var process: any;
declare var module: any;

const MD5 = require("crypto-js/md5");

/**
 * Import Animation frame
 */
import AnimationFrame from "AnimationFrame";
import Utils from "Utils";

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

class CSLogger {
    public static eventListenerAdded: boolean = false;

    public static arrLog: Array<any> = [];
    public static arrSended: Array<any> = [];

    public static projectName: string = "#PACKAGE_NAME#";
    public static projectVersion: string = "#PACKAGE_VERSION#";

    public static settings = {
        loggerUrl: "",
        minLoggerLevel: 500,
        projectName: "",
        projectVersion: "",
    };

    public static init(settings) {
        if (typeof settings === "object") {
            for (let prop in settings) {
                if (settings.hasOwnProperty(prop)) {
                    CSLogger.settings[prop] = settings[prop];
                }
            }
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
                      properties?: any): void {
        status = status || 101;
        message = message || STATUSES[status] || "";
        properties = properties || {};

        if (status >= CSLogger.settings.minLoggerLevel) {
            let logObj = {
                date: new Date(),
                location: location.href,
                projectName: CSLogger.settings.projectName,
                projectVersion: CSLogger.settings.projectVersion,
                stack: Utils.stack(),
                user: Utils.User.getInfo(),
                message,
                properties,
                status,
            };

            CSLogger.arrLog.push(logObj);
        }
    }

    public static showMessange(status: number = 0, message: string = ""): void {
        let messangeLavel = "debug";
        if (status >= 200 && status < 300) {
            messangeLavel = "log";
        } else if (status >= 300 && status < 400) {
            messangeLavel = "info";
        } else if (status >= 400 && status < 500) {
            messangeLavel = "warn";
        } else if (status >= 500) {
            messangeLavel = "error";
        }
        if (
            typeof console === "object" &&
            typeof console[messangeLavel] === "function"
        ) {
            console[messangeLavel](message);
        }
    }

    /**
     * Log send watcher
     */
    public static watch() {
        if (CSLogger.arrLog.length > 0 && CSLogger.arrLog.length < 100) {
            for (let l of CSLogger.arrLog) {
                let data = encodeURIComponent(JSON.stringify(l));
                let uid = MD5(JSON.stringify({
                    message: l.message,
                    projectName: l.projectName,
                    projectVersion: l.projectVersion,
                    status: l.status,
                })).toString();
                if (CSLogger.arrSended.indexOf(uid) === -1) {
                    CSLogger.arrSended.push(uid);
                    if (
                        process.env.NODE_ENV === "production" &&
                        CSLogger.settings.loggerUrl
                    ) {
                        let i = new Image();
                        i.src = CSLogger.settings.loggerUrl + "?uid=" + uid + "&data=" + data;
                    } else {
                        CSLogger.showMessange(l.status, l);
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
    let errorHandler = root.onerror;

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
            }
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
export default CSLogger.init;
module.exports = CSLogger.init;
