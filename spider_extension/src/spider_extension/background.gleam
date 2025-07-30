import spider_extension/chrome

pub fn init() {
  chrome.tabs_on_activated(fn(info) {
    echo info.tab_id
    Nil
  })
  // chrome.tabs.sendMessage(info.tabId, { action: "doSomething" });
}
