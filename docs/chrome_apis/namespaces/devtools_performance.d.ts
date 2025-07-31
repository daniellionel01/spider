// Chrome API namespace: devtools.performance
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace devtools.performance {
        export interface ProfilingStartedEvent extends chrome.events.Event<() => void> {}

        export interface ProfilingStoppedEvent extends chrome.events.Event<() => void> {}

        /** Fired when the Performance panel begins recording performance data. */
        export var onProfilingStarted: ProfilingStartedEvent;
        /** Fired when the Performance panel stops recording performance data. */
        export var onProfilingStopped: ProfilingStoppedEvent;
    }
} // end of chrome namespace
