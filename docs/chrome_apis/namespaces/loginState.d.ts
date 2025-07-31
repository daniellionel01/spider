// Chrome API namespace: loginState
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace loginState {
        export interface SessionStateChangedEvent extends chrome.events.Event<(sessionState: SessionState) => void> {}

        /** Possible profile types. */
        export type ProfileType = "SIGNIN_PROFILE" | "USER_PROFILE";

        /** Possible session states. */
        export type SessionState = "UNKNOWN" | "IN_OOBE_SCREEN" | "IN_LOGIN_SCREEN" | "IN_SESSION" | "IN_LOCK_SCREEN";

        /** Gets the type of the profile the extension is in. */
        export function getProfileType(callback: (profileType: ProfileType) => void): void;

        /** Gets the current session state. */
        export function getSessionState(callback: (sessionState: SessionState) => void): void;

        /** Dispatched when the session state changes. sessionState is the new session state.*/
        export const onSessionStateChanged: SessionStateChangedEvent;
    }
} // end of chrome namespace
