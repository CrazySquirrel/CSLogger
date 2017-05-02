export declare class CSLogger {
    static eventListenerAdded: boolean;
    static arrLog: Array<any>;
    static arrSended: Array<any>;
    static projectName: string;
    static projectVersion: string;
    static settings: {
        loggerUrl: string;
        minLoggerLevel: number;
        projectName: string;
        projectVersion: string;
        sentryUrl: string;
    };
    static init(settings: any): typeof CSLogger;
    /**
     * Log method
     * @param status
     * @param message
     * @param properties
     */
    static log(status?: number, message?: string, properties?: any): boolean;
    static statusLavel(status: number): string;
    static showMessange(status: number, message: string): boolean;
    /**
     * Log send watcher
     */
    static watch(): void;
}
/**
 * Return logger
 */
declare let _Init: typeof CSLogger.init;
export default _Init;
