// Chrome API namespace: declarativeNetRequest
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace declarativeNetRequest {
        /** Ruleset ID for the dynamic rules added by the extension. */
        export const DYNAMIC_RULESET_ID: "_dynamic";

        /**
         * Time interval within which `MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL getMatchedRules` calls can be made, specified in minutes.
         * Additional calls will fail immediately and set {@link runtime.lastError}.
         * Note: `getMatchedRules` calls associated with a user gesture are exempt from the quota.
         */
        export const GETMATCHEDRULES_QUOTA_INTERVAL: 10;

        /**
         * The minimum number of static rules guaranteed to an extension across its enabled static rulesets.
         * Any rules above this limit will count towards the global rule limit.
         * @since Chrome 89
         */
        export const GUARANTEED_MINIMUM_STATIC_RULES: 30000;

        /** The number of times `getMatchedRules` can be called within a period of `GETMATCHEDRULES_QUOTA_INTERVAL`. */
        export const MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL: 20;

        /** The maximum number of dynamic rules that an extension can add. */
        export const MAX_NUMBER_OF_DYNAMIC_RULES: 30000;

        /**
         * The maximum number of static `Rulesets` an extension can enable at any one time.
         * @since Chrome 94
         */
        export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: 50;

        /** The maximum number of combined dynamic and session scoped rules an extension can add. */
        export const MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES: 5000;

        /**
         * The maximum number of regular expression rules that an extension can add.
         * This limit is evaluated separately for the set of dynamic rules and those specified in the rule resources file.
         */
        export const MAX_NUMBER_OF_REGEX_RULES: 1000;

        /**
         * The maximum number of session scoped rules that an extension can add.
         * @since Chrome 120
         */
        export const MAX_NUMBER_OF_SESSION_RULES: 5000;

        /** The maximum number of static `Rulesets` an extension can specify as part of the `"rule_resources"` manifest key. */
        export const MAX_NUMBER_OF_STATIC_RULESETS: 100;

        /**
         * The maximum number of "unsafe" dynamic rules that an extension can add.
         * @since Chrome 120
         */
        export const MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES: 5000;

        /**
         * The maximum number of "unsafe" session scoped rules that an extension can add.
         * @since Chrome 120
         */
        export const MAX_NUMBER_OF_UNSAFE_SESSION_RULES: 5000;

        /**
         * Ruleset ID for the session-scoped rules added by the extension.
         * @since Chrome 90
         */
        export const SESSION_RULESET_ID: "_session";

        /**
         * This describes the HTTP request method of a network request.
         * @since Chrome 91
         */
        export enum RequestMethod {
            CONNECT = "connect",
            DELETE = "delete",
            GET = "get",
            HEAD = "head",
            OPTIONS = "options",
            PATCH = "patch",
            POST = "post",
            PUT = "put",
            OTHER = "other",
        }

        /** This describes the resource type of the network request. */
        export enum ResourceType {
            MAIN_FRAME = "main_frame",
            SUB_FRAME = "sub_frame",
            STYLESHEET = "stylesheet",
            SCRIPT = "script",
            IMAGE = "image",
            FONT = "font",
            OBJECT = "object",
            XMLHTTPREQUEST = "xmlhttprequest",
            PING = "ping",
            CSP_REPORT = "csp_report",
            MEDIA = "media",
            WEBSOCKET = "websocket",
            WEBTRANSPORT = "webtransport",
            WEBBUNDLE = "webbundle",
            OTHER = "other",
        }

        /** Describes the kind of action to take if a given RuleCondition matches. */
        export enum RuleActionType {
            /** Block the network request. */
            BLOCK = "block",
            /** Redirect the network request. */
            REDIRECT = "redirect",
            /** Allow the network request. The request won't be intercepted if there is an allow rule which matches it. */
            ALLOW = "allow",
            /** Upgrade the network request url's scheme to https if the request is http or ftp. */
            UPGRADE_SCHEME = "upgradeScheme",
            /** Modify request/response headers from the network request. */
            MODIFY_HEADERS = "modifyHeaders",
            /** Allow all requests within a frame hierarchy, including the frame request itself. */
            ALLOW_ALL_REQUESTS = "allowAllRequests",
        }

        /**
         * Describes the reason why a given regular expression isn't supported.
         * @since Chrome 87
         */
        export enum UnsupportedRegexReason {
            /** The regular expression is syntactically incorrect, or uses features not available in the RE2 syntax. */
            SYNTAX_ERROR = "syntaxError",
            /** The regular expression exceeds the memory limit. */
            MEMORY_LIMIT_EXCEEDED = "memoryLimitExceeded",
        }

        /**
         * This describes whether the request is first or third party to the frame in which it originated.
         * A request is said to be first party if it has the same domain (eTLD+1) as the frame in which the request originated.
         */
        export enum DomainType {
            /** The network request is first party to the frame in which it originated. */
            FIRST_PARTY = "firstParty",
            /* The network request is third party to the frame in which it originated. */
            THIRD_PARTY = "thirdParty",
        }

        /**
         * This describes the possible operations for a "modifyHeaders" rule.
         * @since Chrome 86
         */
        export enum HeaderOperation {
            /** Adds a new entry for the specified header. This operation is not supported for request headers. */
            APPEND = "append",
            /** Sets a new value for the specified header, removing any existing headers with the same name. */
            SET = "set",
            /** Removes all entries for the specified header. */
            REMOVE = "remove",
        }

        export interface RequestDetails {
            /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens.
             * If the document of a (sub-)frame is loaded (type is main_frame or sub_frame), frameId indicates the ID of this frame, not the ID of the outer frame.
             * Frame IDs are unique within a tab.
             */
            frameId: number;

            /** The origin where the request was initiated.
             * This does not change through redirects.
             * If this is an opaque origin, the string 'null' will be used.
             */
            initiator?: string | undefined;

            /** Standard HTTP method. */
            method: string;

            /** ID of frame that wraps the frame which sent the request.
             * Set to -1 if no parent frame exists.
             */
            partentFrameId: number;

            /** The ID of the request.
             * Request IDs are unique within a browser session.
             */
            requestId: string;

            /** The ID of the tab in which the request takes place.
             * Set to -1 if the request isn't related to a tab.
             */
            tabId: number;

            /** The resource type of the request. */
            type: `${ResourceType}`;

            /** The URL of the request. */
            url: string;
        }

        export interface Rule {
            /** The action to take if this rule is matched. */
            action: RuleAction;

            /** The condition under which this rule is triggered. */
            condition: RuleCondition;

            /** An id which uniquely identifies a rule.
             * Mandatory and should be >= 1.
             */
            id: number;

            /** Rule priority.
             * Defaults to 1.
             * When specified, should be >= 1.
             */
            priority?: number | undefined;
        }

        export interface RuleAction {
            /** Describes how the redirect should be performed.
             * Only valid for redirect rules.
             */
            redirect?: Redirect | undefined;

            /** The request headers to modify for the request.
             * Only valid if RuleActionType is "modifyHeaders".
             */
            requestHeaders?: ModifyHeaderInfo[] | undefined;

            /** The response headers to modify for the request.
             * Only valid if RuleActionType is "modifyHeaders".
             */
            responseHeaders?: ModifyHeaderInfo[] | undefined;

            /** The type of action to perform. */
            type: `${RuleActionType}`;
        }

        export interface RuleCondition {
            /**
             * Specifies whether the network request is first-party or third-party to the domain from which it originated.
             * If omitted, all requests are accepted.
             */
            domainType?: `${DomainType}` | undefined;

            /**
         * @deprecated since Chrome 101. Use initiatorDomains instead.

         * The rule will only match network requests originating from the list of domains.
         * If the list is omitted, the rule is applied to requests from all domains.
         * An empty list is not allowed.
         *
         * Notes:
         * Sub-domains like "a.example.com" are also allowed.
         * The entries must consist of only ascii characters.
         * Use punycode encoding for internationalized domains.
         * This matches against the request initiator and not the request url.
         */
            domains?: string[] | undefined;

            /**
             * @deprecated since Chrome 101. Use excludedInitiatorDomains instead
             *
             * The rule will not match network requests originating from the list of excludedDomains.
             * If the list is empty or omitted, no domains are excluded.
             * This takes precedence over domains.
             *
             * Notes:
             * Sub-domains like "a.example.com" are also allowed.
             * The entries must consist of only ascii characters.
             * Use punycode encoding for internationalized domains.
             * This matches against the request initiator and not the request url.
             */
            excludedDomains?: string[] | undefined;

            /**
             * The rule will only match network requests originating from the list of initiatorDomains.
             * If the list is omitted, the rule is applied to requests from all domains.
             * An empty list is not allowed.
             *
             * Notes:
             * Sub-domains like "a.example.com" are also allowed.
             * The entries must consist of only ascii characters.
             * Use punycode encoding for internationalized domains.
             * This matches against the request initiator and not the request url.
             */
            initiatorDomains?: string[] | undefined;

            /**
             * The rule will not match network requests originating from the list of excludedInitiatorDomains.
             * If the list is empty or omitted, no domains are excluded.
             * This takes precedence over initiatorDomains.
             *
             * Notes:
             * Sub-domains like "a.example.com" are also allowed.
             * The entries must consist of only ascii characters.
             * Use punycode encoding for internationalized domains.
             * This matches against the request initiator and not the request url.
             */
            excludedInitiatorDomains?: string[] | undefined;

            /**
             * The rule will only match network requests when the domain matches one from the list of requestDomains.
             * If the list is omitted, the rule is applied to requests from all domains.
             * An empty list is not allowed.
             *
             * Notes:
             * Sub-domains like "a.example.com" are also allowed.
             * The entries must consist of only ascii characters.
             * Use punycode encoding for internationalized domains.
             */
            requestDomains?: string[] | undefined;

            /**
             * The rule will not match network requests when the domains matches one from the list of excludedRequestDomains.
             * If the list is empty or omitted, no domains are excluded.
             * This takes precedence over requestDomains.
             *
             * Notes:
             * Sub-domains like "a.example.com" are also allowed.
             * The entries must consist of only ascii characters.
             * Use punycode encoding for internationalized domains.
             */
            excludedRequestDomains?: string[] | undefined;

            /**
             * List of request methods which the rule won't match.
             * Only one of requestMethods and excludedRequestMethods should be specified.
             * If neither of them is specified, all request methods are matched.
             */
            excludedRequestMethods?: `${RequestMethod}`[] | undefined;

            /**
             * List of resource types which the rule won't match.
             * Only one of {@link chrome.declarativeNetRequest.RuleCondition.resourceTypes}
             * and {@link chrome.declarativeNetRequest.RuleCondition.excludedResourceTypes} should be specified.
             * If neither of them is specified, all resource types except "main_frame" are blocked.
             */
            excludedResourceTypes?: `${ResourceType}`[] | undefined;

            /**
             * List of {@link chrome.tabs.Tab.id} which the rule should not match.
             * An ID of {@link chrome.tabs.TAB_ID_NONE} excludes requests which don't originate from a tab.
             * Only supported for session-scoped rules.
             */
            excludedTabIds?: number[] | undefined;

            /**
             * Whether the urlFilter or regexFilter (whichever is specified) is case sensitive.
             * @default false Before Chrome 118 the default was true.
             */
            isUrlFilterCaseSensitive?: boolean | undefined;

            /**
             * Regular expression to match against the network request url.
             * This follows the RE2 syntax.
             *
             * Note: Only one of urlFilter or regexFilter can be specified.
             *
             * Note: The regexFilter must be composed of only ASCII characters.
             * This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
             */
            regexFilter?: string | undefined;

            /**
             * List of HTTP request methods which the rule can match. An empty list is not allowed.
             * Note: Specifying a {@link chrome.declarativeNetRequest.RuleCondition.requestMethods} rule condition will also exclude non-HTTP(s) requests,
             * whereas specifying {@link chrome.declarativeNetRequest.RuleCondition.excludedRequestMethods} will not.
             */
            requestMethods?: `${RequestMethod}`[] | undefined;

            /**
             * List of {@link chrome.tabs.Tab.id} which the rule should not match.
             * An ID of {@link chrome.tabs.TAB_ID_NONE} excludes requests which don't originate from a tab.
             * An empty list is not allowed. Only supported for session-scoped rules.
             */
            tabIds?: number[] | undefined;

            /**
             * The pattern which is matched against the network request url.
             * Supported constructs:
             *
             * '*' : Wildcard: Matches any number of characters.
             *
             * '|' : Left/right anchor: If used at either end of the pattern, specifies the beginning/end of the url respectively.
             *
             * '||' : Domain name anchor: If used at the beginning of the pattern, specifies the start of a (sub-)domain of the URL.
             *
             * '^' : Separator character: This matches anything except a letter, a digit or one of the following: _ - . %.
             * This can also match the end of the URL.
             *
             * Therefore urlFilter is composed of the following parts: (optional Left/Domain name anchor) + pattern + (optional Right anchor).
             *
             * If omitted, all urls are matched. An empty string is not allowed.
             *
             * A pattern beginning with || is not allowed. Use instead.
             *
             * Note: Only one of urlFilter or regexFilter can be specified.
             *
             * Note: The urlFilter must be composed of only ASCII characters.
             * This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
             * For example, when the request url is http://abc.рф?q=ф, the urlFilter will be matched against the url http://abc.xn--p1ai/?q=%D1%84.
             */
            urlFilter?: string | undefined;

            /**
             * List of resource types which the rule can match.
             * An empty list is not allowed.
             *
             * Note: this must be specified for allowAllRequests rules and may only include the sub_frame and main_frame resource types.
             */
            resourceTypes?: `${ResourceType}`[] | undefined;

            /**
             * Rule does not match if the request matches any response header condition in this list (if specified). If both `excludedResponseHeaders` and `responseHeaders` are specified, then the `excludedResponseHeaders` property takes precedence.
             * @since Chrome 128
             */
            excludedResponseHeaders?: HeaderInfo[];

            /**
             * Rule matches if the request matches any response header condition in this list (if specified).
             * @since Chrome 128
             */
            responseHeaders?: HeaderInfo[];
        }

        export interface MatchedRule {
            /** A matching rule's ID. */
            ruleId: number;

            /** ID of the Ruleset this rule belongs to.
             * For a rule originating from the set of dynamic rules, this will be equal to DYNAMIC_RULESET_ID.
             */
            rulesetId: string;
        }

        export interface MatchedRuleInfo {
            rule: MatchedRule;

            /** The tabId of the tab from which the request originated if the tab is still active. Else -1. */
            tabId: number;

            /** The time the rule was matched.
             * Timestamps will correspond to the Javascript convention for times, i.e. number of milliseconds since the epoch.
             */
            timeStamp: number;
        }

        export interface MatchedRulesFilter {
            /** If specified, only matches rules after the given timestamp. */
            minTimeStamp?: number | undefined;

            /** If specified, only matches rules for the given tab.
             * Matches rules not associated with any active tab if set to -1.
             */
            tabId?: number | undefined;
        }

        /** @since Chrome 128 */
        export interface HeaderInfo {
            /** If specified, this condition is not matched if the header exists but its value contains at least one element in this list. This uses the same match pattern syntax as `values`. */
            excludedValues?: string[];
            /** The name of the header. This condition matches on the name only if both `values` and `excludedValues` are not specified. */
            header: string;
            /**
             * If specified, this condition matches if the header's value matches at least one pattern in this list. This supports case-insensitive header value matching plus the following constructs:
             *
             * **'\*'** : Matches any number of characters.
             *
             * **'?'** : Matches zero or one character(s).
             *
             * **'\*'** and **'?'** can be escaped with a backslash, e.g. **'\\\*'** and **'\\?'**
             */
            values?: string[];
        }

        export interface ModifyHeaderInfo {
            /** The name of the header to be modified. */
            header: string;

            /** The operation to be performed on a header. */
            operation: `${HeaderOperation}`;

            /** The new value for the header.
             * Must be specified for append and set operations.
             */
            value?: string | undefined;
        }

        export interface QueryKeyValue {
            key: string;
            value: string;
        }

        export interface QueryTransform {
            /** The list of query key-value pairs to be added or replaced. */
            addOrReplaceParams?: QueryKeyValue[] | undefined;

            /** The list of query keys to be removed. */
            removeParams?: string[] | undefined;
        }

        export interface URLTransform {
            /** The new fragment for the request.
             * Should be either empty, in which case the existing fragment is cleared; or should begin with '#'.
             */
            fragment?: string | undefined;

            /** The new host for the request. */
            host?: string | undefined;

            /** The new password for the request. */
            password?: string | undefined;

            /** The new path for the request.
             * If empty, the existing path is cleared.
             */
            path?: string | undefined;

            /** The new port for the request.
             * If empty, the existing port is cleared.
             */
            port?: string | undefined;

            /** The new query for the request.
             * Should be either empty, in which case the existing query is cleared; or should begin with '?'.
             */
            query?: string | undefined;

            /** Add, remove or replace query key-value pairs. */
            queryTransform?: QueryTransform | undefined;

            /** The new scheme for the request.
             * Allowed values are "http", "https", "ftp" and "chrome-extension".
             */
            scheme?: string | undefined;

            /** The new username for the request. */
            username?: string | undefined;
        }

        export interface RegexOptions {
            /** Whether the regex specified is case sensitive.
             * Default is true.
             */
            isCaseSensitive?: boolean | undefined;

            /** The regular expression to check. */
            regex: string;

            /** Whether the regex specified requires capturing.
             * Capturing is only required for redirect rules which specify a regexSubstitution action.
             * The default is false.
             */
            requireCapturing?: boolean | undefined;
        }

        export interface IsRegexSupportedResult {
            isSupported: boolean;

            /** Specifies the reason why the regular expression is not supported.
             * Only provided if isSupported is false.
             */
            reason?: `${UnsupportedRegexReason}` | undefined;
        }

        export interface TabActionCountUpdate {
            /** The amount to increment the tab's action count by.
             * Negative values will decrement the count
             */
            increment: number;

            /** The tab for which to update the action count. */
            tabId: number;
        }

        export interface ExtensionActionOptions {
            /** Whether to automatically display the action count for a page as the extension's badge text.
             * This preference is persisted across sessions.
             */
            displayActionCountAsBadgeText?: boolean | undefined;

            /** Details of how the tab's action count should be adjusted. */
            tabUpdate?: TabActionCountUpdate | undefined;
        }

        export interface Redirect {
            /** Path relative to the extension directory.
             * Should start with '/'.
             */
            extensionPath?: string | undefined;

            /** Substitution pattern for rules which specify a regexFilter.
             * The first match of regexFilter within the url will be replaced with this pattern.
             * Within regexSubstitution, backslash-escaped digits (\1 to \9) can be used to insert the corresponding capture groups.
             * \0 refers to the entire matching text.
             */
            regexSubstitution?: string | undefined;

            /** Url transformations to perform. */
            transform?: URLTransform | undefined;

            /** The redirect url.
             * Redirects to JavaScript urls are not allowed.
             */
            url?: string | undefined;
        }

        export interface UpdateRuleOptions {
            /** Rules to add. */
            addRules?: Rule[] | undefined;

            /**
             * IDs of the rules to remove.
             * Any invalid IDs will be ignored.
             */
            removeRuleIds?: number[] | undefined;
        }

        export interface UpdateStaticRulesOptions {
            /** Set of ids corresponding to rules in the Ruleset to disable. */
            disableRuleIds?: number[];

            /** Set of ids corresponding to rules in the Ruleset to enable. */
            enableRuleIds?: number[];

            /** The id corresponding to a static Ruleset. */
            rulesetId: string;
        }

        export interface UpdateRulesetOptions {
            /** The set of ids corresponding to a static Ruleset that should be disabled. */
            disableRulesetIds?: string[] | undefined;

            /** The set of ids corresponding to a static Ruleset that should be enabled. */
            enableRulesetIds?: string[] | undefined;
        }

        export interface MatchedRuleInfoDebug {
            /** Details about the request for which the rule was matched. */
            request: RequestDetails;

            rule: MatchedRule;
        }

        export interface Ruleset {
            /** Whether the ruleset is enabled by default. */
            enabled: boolean;

            /** A non-empty string uniquely identifying the ruleset.
             * IDs beginning with '_' are reserved for internal use.
             */
            id: string;

            /** The path of the JSON ruleset relative to the extension directory. */
            path: string;
        }

        export interface RulesMatchedDetails {
            /** Rules matching the given filter. */
            rulesMatchedInfo: MatchedRuleInfo[];
        }

        /** @since Chrome 103 */
        export interface TestMatchOutcomeResult {
            /** The rules (if any) that match the hypothetical request. */
            matchedRules: MatchedRule[];
        }

        /** @since Chrome 103 */
        export interface TestMatchRequestDetails {
            /** The initiator URL (if any) for the hypothetical request. */
            initiator?: string;
            /** Standard HTTP method of the hypothetical request. Defaults to "get" for HTTP requests and is ignored for non-HTTP requests. */
            method?: `${RequestMethod}`;
            /**
             * The headers provided by a hypothetical response if the request does not get blocked or redirected before it is sent. Represented as an object which maps a header name to a list of string values. If not specified, the hypothetical response would return empty response headers, which can match rules which match on the non-existence of headers. E.g. `{"content-type": ["text/html; charset=utf-8", "multipart/form-data"]}`
             * @since Chrome 129
             */
            responseHeaders?: { [name: string]: unknown };
            /** The ID of the tab in which the hypothetical request takes place. Does not need to correspond to a real tab ID. Default is -1, meaning that the request isn't related to a tab. */
            tabId?: number;
            /** The resource type of the hypothetical request. */
            type: `${ResourceType}`;
            /** The URL of the hypothetical request. */
            url: string;
        }

        /** Returns the number of static rules an extension can enable before the global static rule limit is reached. */
        export function getAvailableStaticRuleCount(callback: (count: number) => void): void;

        /**
         * Returns the number of static rules an extension can enable before the global static rule limit is reached.
         * @return The `getAvailableStaticRuleCount` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getAvailableStaticRuleCount(): Promise<number>;

        /** Returns the current set of dynamic rules for the extension.
         *
         * @param callback Called with the set of dynamic rules.
         * An error might be raised in case of transient internal errors.
         */
        export function getDynamicRules(callback: (rules: Rule[]) => void): void;

        /**
         * Returns the current set of dynamic rules for the extension.
         * @return The `getDynamicRules` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getDynamicRules(): Promise<Rule[]>;

        /** Returns the ids for the current set of enabled static rulesets.
         *
         * @param callback Called with a list of ids, where each id corresponds to an enabled static Ruleset. */
        export function getEnabledRulesets(callback: (rulesetIds: string[]) => void): void;

        /**
         * Returns the ids for the current set of enabled static rulesets.
         * @return The `getEnabledRulesets` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getEnabledRulesets(): Promise<string[]>;

        /** Returns all rules matched for the extension.
         * Callers can optionally filter the list of matched rules by specifying a filter.
         * This method is only available to extensions with the declarativeNetRequestFeedback permission or having the activeTab permission granted for the tabId specified in filter.
         * Note: Rules not associated with an active document that were matched more than five minutes ago will not be returned.
         *
         * @param filter An object to filter the list of matched rules.
         * @param callback Called once the list of matched rules has been fetched.
         * In case of an error, runtime.lastError will be set and no rules will be returned.
         * This can happen for multiple reasons, such as insufficient permissions, or exceeding the quota.
         */
        export function getMatchedRules(
            filter: MatchedRulesFilter | undefined,
            callback: (details: RulesMatchedDetails) => void,
        ): void;

        /**
         * Returns all rules matched for the extension.
         * Callers can optionally filter the list of matched rules by specifying a filter.
         * This method is only available to extensions with the declarativeNetRequestFeedback permission or having the activeTab permission granted for the tabId specified in filter.
         * Note: Rules not associated with an active document that were matched more than five minutes ago will not be returned.
         *
         * @param filter An object to filter the list of matched rules.
         * @return The `getMatchedRules` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getMatchedRules(filter: MatchedRulesFilter | undefined): Promise<RulesMatchedDetails>;

        export function getMatchedRules(callback: (details: RulesMatchedDetails) => void): void;

        export function getMatchedRules(): Promise<RulesMatchedDetails>;

        /** Returns the current set of session scoped rules for the extension.
         *
         * @param callback Called with the set of session scoped rules.
         */
        export function getSessionRules(callback: (rules: Rule[]) => void): void;

        /**
         * Returns the current set of session scoped rules for the extension.
         *
         * @return The `getSessionRules` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getSessionRules(): Promise<Rule[]>;

        /** Checks if the given regular expression will be supported as a regexFilter rule condition.
         *
         * @param regexOptions The regular expression to check.
         * @param callback Called with details consisting of whether the regular expression is supported and the
         * reason if not.
         */
        export function isRegexSupported(
            regexOptions: RegexOptions,
            callback: (result: IsRegexSupportedResult) => void,
        ): void;

        /** Checks if the given regular expression will be supported as a regexFilter rule condition.
         *
         * @param regexOptions The regular expression to check.
         * @return The `isRegexSupported` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function isRegexSupported(regexOptions: RegexOptions): Promise<IsRegexSupportedResult>;

        /** Configures if the action count for tabs should be displayed as the extension action's badge text and provides a way for that action count to be incremented. */
        export function setExtensionActionOptions(options: ExtensionActionOptions, callback: () => void): void;

        /**
         * Configures if the action count for tabs should be displayed as the extension action's badge text and provides a way for that action count to be incremented.
         * @return The `setExtensionActionOptions` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setExtensionActionOptions(options: ExtensionActionOptions): Promise<void>;

        /**
         * Checks if any of the extension's declarativeNetRequest rules would match a hypothetical request. Note: Only available for unpacked extensions as this is only intended to be used during extension development.
         * @param request
         * @since Chrome 103
         */
        export function testMatchOutcome(request: TestMatchRequestDetails): Promise<TestMatchOutcomeResult>;
        export function testMatchOutcome(
            request: TestMatchRequestDetails,
            callback: (result: TestMatchOutcomeResult) => void,
        ): void;

        /** Modifies the current set of dynamic rules for the extension.
         * The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added.
         *
         * Notes:
         * This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
         * These rules are persisted across browser sessions and across extension updates.
         * Static rules specified as part of the extension package can not be removed using this function.
         * MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES is the maximum number of combined dynamic and session rules an extension can add.
         *
         * @param callback Called once the update is complete or has failed.
         * In case of an error, runtime.lastError will be set and no change will be made to the rule set.
         * This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, internal errors, and others.
         */
        export function updateDynamicRules(options: UpdateRuleOptions, callback: () => void): void;

        /** Modifies the current set of dynamic rules for the extension.
         * The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added.
         *
         * Notes:
         * This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
         * These rules are persisted across browser sessions and across extension updates.
         * Static rules specified as part of the extension package can not be removed using this function.
         * MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES is the maximum number of combined dynamic and session rules an extension can add.
         *
         * @return The `updateDynamicRules` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         * In case of an error, runtime.lastError will be set and no change will be made to the rule set.
         * This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, internal errors, and others.
         */
        export function updateDynamicRules(options: UpdateRuleOptions): Promise<void>;

        /** Updates the set of enabled static rulesets for the extension.
         * The rulesets with IDs listed in options.disableRulesetIds are first removed, and then the rulesets listed in options.enableRulesetIds are added.
         *
         * Note that the set of enabled static rulesets is persisted across sessions but not across extension updates, i.e. the rule_resources manifest key will determine the set of enabled static rulesets on each extension update.
         *
         * @param callback Called once the update is complete.
         * In case of an error, runtime.lastError will be set and no change will be made to set of enabled rulesets.
         * This can happen for multiple reasons, such as invalid ruleset IDs, rule count limit exceeded, or internal errors.
         */
        export function updateEnabledRulesets(options: UpdateRulesetOptions, callback: () => void): void;

        /** Updates the set of enabled static rulesets for the extension.
         * The rulesets with IDs listed in options.disableRulesetIds are first removed, and then the rulesets listed in options.enableRulesetIds are added.
         *
         * Note that the set of enabled static rulesets is persisted across sessions but not across extension updates, i.e. the rule_resources manifest key will determine the set of enabled static rulesets on each extension update.
         *
         * @return The `updateEnabledRulesets` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         * In case of an error, runtime.lastError will be set and no change will be made to set of enabled rulesets.
         * This can happen for multiple reasons, such as invalid ruleset IDs, rule count limit exceeded, or internal errors.
         */
        export function updateEnabledRulesets(options: UpdateRulesetOptions): Promise<void>;

        /** Modifies the current set of session scoped rules for the extension.
         * The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added.
         *
         * Notes:
         * This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
         * These rules are not persisted across sessions and are backed in memory.
         * MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES is the maximum number of combined dynamic and session rules an extension can add.
         *
         * @param callback Called once the update is complete or has failed.
         * In case of an error, runtime.lastError will be set and no change will be made to the rule set.
         * This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, and others.
         */
        export function updateSessionRules(options: UpdateRuleOptions, callback: () => void): void;

        /** Modifies the current set of session scoped rules for the extension.
         * The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added.
         *
         * Notes:
         * This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
         * These rules are not persisted across sessions and are backed in memory.
         * MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES is the maximum number of combined dynamic and session rules an extension can add.
         *
         * @return The `updateSessionRules` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         * In case of an error, runtime.lastError will be set and no change will be made to the rule set.
         * This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, and others.
         */
        export function updateSessionRules(options: UpdateRuleOptions): Promise<void>;

        /** Disables and enables individual static rules in a Ruleset.
         * Changes to rules belonging to a disabled Ruleset will take effect the next time that it becomes enabled.
         *
         * @return The `updateStaticRules` method either calls a provided callback if its finished or returns as a `Promise` (MV3 only).
         * @since Chrome 111
         */
        export function updateStaticRules(options: UpdateStaticRulesOptions): Promise<void>;
        export function updateStaticRules(options: UpdateStaticRulesOptions, callback?: () => void): void;

        /** The rule that has been matched along with information about the associated request. */
        export interface RuleMatchedDebugEvent extends chrome.events.Event<(info: MatchedRuleInfoDebug) => void> {}

        /** Fired when a rule is matched with a request.
         * Only available for unpacked extensions with the declarativeNetRequestFeedback permission as this is intended to be used for debugging purposes only. */
        export var onRuleMatchedDebug: RuleMatchedDebugEvent;
    }
} // end of chrome namespace
