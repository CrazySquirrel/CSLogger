"use strict";
/**
 * The storage interface
 */
interface IWindow {
    eventListenerAdded: boolean;

    onerror: Function;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
