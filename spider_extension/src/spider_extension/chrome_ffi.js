import * as option from "../../gleam_stdlib/option.mjs";

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
    cb({ request, sender: make_sender(sender) });
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
  return {};
}
