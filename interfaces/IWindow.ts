"use strict";
/**
 * The storage interface
 */
interface IWindow {
    eventListenerAdded: boolean;

    onerror: Function;

    Debug: any;
    CSDebug: any;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
