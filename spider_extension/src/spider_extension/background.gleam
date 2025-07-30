import spider_extension/chrome

pub type Action {
  Click(el: String)
}

pub fn init() {
  chrome.tabs_on_activated(fn(info) {
    let action = Click("#something")
    chrome.tabs_send_message(info.tab_id, action)
  })
}
