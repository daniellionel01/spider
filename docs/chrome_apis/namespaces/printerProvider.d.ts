// Chrome API namespace: printerProvider
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace printerProvider {
        export interface PrinterInfo {
            /** Unique printer ID. */
            id: string;
            /** Printer's human readable name. */
            name: string;
            /** Optional. Printer's human readable description. */
            description?: string | undefined;
        }

        export interface PrinterCapabilities {
            /** Device capabilities in CDD format. */
            capabilities: any;
        }

        export interface PrintJob {
            /** ID of the printer which should handle the job. */
            printerId: string;
            /** The print job title. */
            title: string;
            /** Print ticket in  CJT format. */
            ticket: { [key: string]: unknown };
            /** The document content type. Supported formats are "application/pdf" and "image/pwg-raster". */
            contentType: string;
            /** Blob containing the document data to print. Format must match |contentType|. */
            document: Blob;
        }

        export interface PrinterRequestedEvent
            extends chrome.events.Event<(resultCallback: (printerInfo: PrinterInfo[]) => void) => void>
        {}

        export interface PrinterInfoRequestedEvent
            extends chrome.events.Event<(device: any, resultCallback: (printerInfo?: PrinterInfo) => void) => void>
        {}

        export interface CapabilityRequestedEvent extends
            chrome.events.Event<
                (printerId: string, resultCallback: (capabilities: PrinterCapabilities) => void) => void
            >
        {}

        export interface PrintRequestedEvent
            extends chrome.events.Event<(printJob: PrintJob, resultCallback: (result: string) => void) => void>
        {}

        /** Event fired when print manager requests printers provided by extensions. */
        export var onGetPrintersRequested: PrinterRequestedEvent;
        /**
         * Event fired when print manager requests information about a USB device that may be a printer.
         * Note: An application should not rely on this event being fired more than once per device. If a connected device is supported it should be returned in the onGetPrintersRequested event.
         * @since Chrome 45
         */
        export var onGetUsbPrinterInfoRequested: PrinterInfoRequestedEvent;
        /** Event fired when print manager requests printer capabilities. */
        export var onGetCapabilityRequested: CapabilityRequestedEvent;
        /** Event fired when print manager requests printing. */
        export var onPrintRequested: PrintRequestedEvent;
    }
} // end of chrome namespace
