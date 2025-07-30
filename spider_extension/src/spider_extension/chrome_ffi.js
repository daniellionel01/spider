import * as option from "../../gleam_stdlib/gleam/option.mjs";
import { List } from "../../gleam_stdlib/gleam.mjs";
import { TabUnloaded, TabLoading, TabComplete } from "./chrome.mjs";

export function tabs_on_activated(cb) {
  chrome.tabs.onActivated.addListener((info) => {
    cb({ tab_id: info.tabId, window_id: info.windowId });
  });
}

export function tabs_send_message(tab_id, payload) {
  chrome.tabs.sendMessage(tab_id, payload);
}

export function runtime_on_message(cb) {
  chrome.runtime.onMessage.addListener((request, sender, _sendResponse) => {
    cb({ request }, make_sender(sender));
  });
}

export function tabs_query(query_info, cb) {
  chrome.tabs.query(query_info, (tabs) => {
    const the_tabs = tabs.map(make_tab);
    cb(List.fromArray(the_tabs));
  });
}

function make_option(value) {
  if (value === undefined || value === null) {
    return new option.None();
  }
  return new option.Some(value);
}
function make_sender(sender) {
  return {
    document_id: make_option(sender.documentId),
    document_lifecycle: make_option(sender.documentLifecycle),
    frame_id: make_option(sender.frameId),
    id: make_option(sender.id),
    native_application: make_option(sender.nativeApplication),
    origin: make_option(sender.origin),
    tab: make_option(make_tab(sender.tab)),
    tls_channel_id: make_option(sender.tlsChannelId),
    url: make_option(sender.url),
  };
}

function make_tab(tab) {
  return {
    active: tab.active,
    audible: tab.audible,
    auto_discardable: tab.autoDiscardable,
    discarded: tab.discarded,
    fav_icon_url: make_option(tab.favIconUrl),
    frozen: tab.frozen,
    group_id: tab.groupId,
    height: make_option(tab.height),
    highlighted: tab.highlighted,
    id: make_option(tab.id),
    incognito: tab.incognito,
    index: tab.index,
    last_accessed: tab.lastAccessed,
    opener_tab_id: make_option(tab.openerTabId),
    pending_url: make_option(tab.pendingUrl),
    pinned: tab.pinned,
    session_id: make_option(tab.sessionId),
    status: make_option(make_tab_status(tab.status)),
    title: make_option(tab.title),
    url: make_option(tab.url),
    width: make_option(tab.width),
    window_id: tab.windowId,
    muted_info: make_option(make_muted_info(tab.mutedInfo)),
  };
}

function make_tab_status(status) {
  if (status === "unloaded") {
    return new TabUnloaded();
  } else if (status === "loading") {
    return new TabLoading();
  } else if (status === "complete") {
    return new TabComplete();
  }
}

function make_muted_info(muted_info) {
  return {
    extension_id: make_option(muted_info.extensionId),
    muted: muted_info.muted,
  };
}
