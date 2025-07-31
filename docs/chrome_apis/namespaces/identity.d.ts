// Chrome API namespace: identity
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace identity {
        export interface AccountInfo {
            /** A unique identifier for the account. This ID will not change for the lifetime of the account. */
            id: string;
        }

        /** @since Chrome 84 */
        export enum AccountStatus {
            /** Specifies that Sync is enabled for the primary account. */
            SYNC = "SYNC",
            /** Specifies the existence of a primary account, if any. */
            ANY = "ANY",
        }

        /** @since Chrome 84 */
        export interface ProfileDetails {
            /** A status of the primary account signed into a profile whose `ProfileUserInfo` should be returned. Defaults to `SYNC` account status. */
            accountStatus?: `${AccountStatus}`;
        }

        export interface TokenDetails {
            /** Fetching a token may require the user to sign-in to Chrome, or approve the application's requested scopes. If the interactive flag is `true`, `getAuthToken` will prompt the user as necessary. When the flag is `false` or omitted, `getAuthToken` will return failure any time a prompt would be required. */
            interactive?: boolean;
            /** The account ID whose token should be returned. If not specified, the function will use an account from the Chrome profile: the Sync account if there is one, or otherwise the first Google web account. */
            account?: AccountInfo;
            /**
             * The `enableGranularPermissions` flag allows extensions to opt-in early to the granular permissions consent screen, in which requested permissions are granted or denied individually.
             * @since Chrome 87
             */
            enableGranularPermissions?: boolean;
            /**
             * A list of OAuth2 scopes to request.
             *
             * When the `scopes` field is present, it overrides the list of scopes specified in manifest.json.
             */
            scopes?: string[];
        }

        export interface ProfileUserInfo {
            /** An email address for the user account signed into the current profile. Empty if the user is not signed in or the `identity.email` manifest permission is not specified. */
            email: string;
            /** A unique identifier for the account. This ID will not change for the lifetime of the account. Empty if the user is not signed in or (in M41+) the `identity.email` manifest permission is not specified. */
            id: string;
        }

        export interface InvalidTokenDetails {
            /** The specific token that should be removed from the cache. */
            token: string;
        }

        export interface WebAuthFlowDetails {
            /** The URL that initiates the auth flow. */
            url: string;

            /**
             * Whether to launch auth flow in interactive mode.
             *
             * Since some auth flows may immediately redirect to a result URL, `launchWebAuthFlow` hides its web view until the first navigation either redirects to the final URL, or finishes loading a page meant to be displayed.
             *
             * If the `interactive` flag is `true`, the window will be displayed when a page load completes. If the flag is `false` or omitted, `launchWebAuthFlow` will return with an error if the initial navigation does not complete the flow.
             *
             * For flows that use JavaScript for redirection, `abortOnLoadForNonInteractive` can be set to `false` in combination with setting `timeoutMsForNonInteractive` to give the page a chance to perform any redirects.
             */
            interactive?: boolean;
            /**
             * Whether to terminate `launchWebAuthFlow` for non-interactive requests after the page loads. This parameter does not affect interactive flows.
             *
             * When set to `true` (default) the flow will terminate immediately after the page loads. When set to `false`, the flow will only terminate after the `timeoutMsForNonInteractive` passes. This is useful for identity providers that use JavaScript to perform redirections after the page loads.
             * @since Chrome 113
             */
            abortOnLoadForNonInteractive?: boolean;
            /**
             * The maximum amount of time, in milliseconds, `launchWebAuthFlow` is allowed to run in non-interactive mode in total. Only has an effect if `interactive` is `false`.
             * @since Chrome 113
             */
            timeoutMsForNonInteractive?: number;
        }

        /** @since Chrome 105 */
        export interface GetAuthTokenResult {
            /** A list of OAuth2 scopes granted to the extension. */
            grantedScopes?: string[];
            /** The specific token associated with the request. */
            token?: string;
        }

        /**
         * Resets the state of the Identity API:
         *
         *  * Removes all OAuth2 access tokens from the token cache
         *  * Removes user's account preferences
         *  * De-authorizes the user from all auth flows
         *
         * Can return its result via Promise since Chrome 106.
         * @since Chrome 87
         */
        export function clearAllCachedAuthTokens(): Promise<void>;
        export function clearAllCachedAuthTokens(callback: () => void): void;

        /**
         * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
         *
         * getAccounts is only supported on dev channel.
         */
        export function getAccounts(): Promise<AccountInfo[]>;
        export function getAccounts(callback: (accounts: AccountInfo[]) => void): void;

        /**
         * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
         *
         * The Identity API caches access tokens in memory, so it's ok to call getAuthToken non-interactively any time a token is required. The token cache automatically handles expiration.
         *
         * For a good user experience it is important interactive token requests are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests, or Chrome sign in screens if they are not signed in, with with no context. In particular, do not use getAuthToken interactively when your app is first launched.
         * @param details Token options.
         *
         * Can return its result via Promise since Chrome 105.
         */
        export function getAuthToken(details?: TokenDetails): Promise<GetAuthTokenResult>;
        export function getAuthToken(details: TokenDetails, callback: (result: GetAuthTokenResult) => void): void;
        export function getAuthToken(callback: (result: GetAuthTokenResult) => void): void;

        /**
         * Retrieves email address and obfuscated gaia id of the user signed into a profile.
         *
         * Requires the `identity.email` manifest permission. Otherwise, returns an empty result.
         *
         * This API is different from identity.getAccounts in two ways. The information returned is available offline, and it only applies to the primary account for the profile.
         * @param details Profile options.
         *
         * Can return its result via Promise since Chrome 105.
         */
        export function getProfileUserInfo(details?: ProfileDetails): Promise<ProfileUserInfo>;
        export function getProfileUserInfo(
            details: ProfileDetails,
            callback: (userInfo: ProfileUserInfo) => void,
        ): void;
        export function getProfileUserInfo(callback: (userInfo: ProfileUserInfo) => void): void;

        /**
         * Removes an OAuth2 access token from the Identity API's token cache.
         *
         * If an access token is discovered to be invalid, it should be passed to removeCachedAuthToken to remove it from the cache. The app may then retrieve a fresh token with `getAuthToken`.
         * @param details Token information.
         *
         * Can return its result via Promise since Chrome 105.
         */
        export function removeCachedAuthToken(details: InvalidTokenDetails): Promise<void>;
        export function removeCachedAuthToken(details: InvalidTokenDetails, callback: () => void): void;

        /**
         * Starts an auth flow at the specified URL.
         *
         * This method enables auth flows with non-Google identity providers by launching a web view and navigating it to the first URL in the provider's auth flow. When the provider redirects to a URL matching the pattern `https://<app-id>.chromiumapp.org/*`, the window will close, and the final redirect URL will be passed to the `callback` function.
         *
         * For a good user experience it is important interactive auth flows are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests with no context. In particular, do not launch an interactive auth flow when your app is first launched.
         * @param details WebAuth flow options.
         *
         * Can return its result via Promise since Chrome 106
         */
        export function launchWebAuthFlow(details: WebAuthFlowDetails): Promise<string | undefined>;
        export function launchWebAuthFlow(details: WebAuthFlowDetails, callback: (responseUrl?: string) => void): void;

        /**
         * Generates a redirect URL to be used in `launchWebAuthFlow`.
         *
         * The generated URLs match the pattern `https://<app-id>.chromiumapp.org/*`.
         * @param path The path appended to the end of the generated URL.
         */
        export function getRedirectURL(path?: string): string;

        /** Fired when signin state changes for an account on the user's profile. */
        export const onSignInChanged: chrome.events.Event<(account: AccountInfo, signedIn: boolean) => void>;
    }
} // end of chrome namespace
