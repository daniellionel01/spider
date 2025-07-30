export function tabs_on_activated(cb) {
  chrome.tabs.onActivated.addListener((info) => {
    cb({ tab_id: info.tabId, window_id: info.windowId });
  });
}

export function tabs_send_message(tab_id, payload) {
  chrome.tabs.sendMessage(tab_id, payload);
}

export function runtime_on_message(cb) {
  chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
    cb({ request });
  });
}
