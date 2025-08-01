import * as option from "../../../gleam_stdlib/gleam/option.mjs";
import { make_tab } from "./tabs_ffi.js";
import { HandlerAsync, HandlerSync } from "./runtime.mjs";

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

export function make_option(value) {
  if (value === undefined || value === null) {
    return new option.None();
  }
  return new option.Some(value);
}

export function runtime_on_message(handler) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (handler instanceof HandlerSync) {
      handler.cb({ request }, make_sender(sender));
    } else if (handler instanceof HandlerAsync) {
      handler.cb({ request }, make_sender(sender), sendResponse);
      return true;
    }
  });
}
