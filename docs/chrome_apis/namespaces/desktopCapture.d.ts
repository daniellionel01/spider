// Chrome API namespace: desktopCapture
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace desktopCapture {
        /** Contains properties that describe the stream. */
        export interface StreamOptions {
            /** True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call. */
            canRequestAudioTrack: boolean;
        }
        /**
         * Shows desktop media picker UI with the specified set of sources.
         * @param sources Set of sources that should be shown to the user.
         * Parameter streamId: An opaque string that can be passed to getUserMedia() API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty streamId. The created streamId can be used only once and expires after a few seconds when it is not used.
         */
        export function chooseDesktopMedia(
            sources: string[],
            callback: (streamId: string, options: StreamOptions) => void,
        ): number;
        /**
         * Shows desktop media picker UI with the specified set of sources.
         * @param sources Set of sources that should be shown to the user.
         * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches tab.url.
         * Parameter streamId: An opaque string that can be passed to getUserMedia() API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty streamId. The created streamId can be used only once and expires after a few seconds when it is not used.
         */
        export function chooseDesktopMedia(
            sources: string[],
            targetTab: chrome.tabs.Tab,
            callback: (streamId: string, options: StreamOptions) => void,
        ): number;
        /**
         * Hides desktop media picker dialog shown by chooseDesktopMedia().
         * @param desktopMediaRequestId Id returned by chooseDesktopMedia()
         */
        export function cancelChooseDesktopMedia(desktopMediaRequestId: number): void;
    }
} // end of chrome namespace
