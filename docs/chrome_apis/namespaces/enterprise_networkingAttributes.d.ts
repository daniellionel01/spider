// Chrome API namespace: enterprise.networkingAttributes
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace enterprise.networkingAttributes {
        export interface NetworkDetails {
            /** The device's MAC address. */
            macAddress: string;
            /** Optional. The device's local IPv4 address (undefined if not configured). */
            ipv4?: string | undefined;
            /** Optional. The device's local IPv6 address (undefined if not configured). */
            ipv6?: string | undefined;
        }

        /**
         * Retrieves the network details of the device's default network. If the user is not affiliated or the device is not connected to a network, runtime.lastError will be set with a failure reason.
         * @param callback Called with the device's default network's NetworkDetails.
         */
        export function getNetworkDetails(callback: (networkDetails: NetworkDetails) => void): void;
    }
} // end of chrome namespace
