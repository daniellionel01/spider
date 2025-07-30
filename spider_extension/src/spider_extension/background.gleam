import gleam/list
import spider_extension/chrome

pub type Action {
  Click(el: String)
}

pub fn init() {
  chrome.tabs_on_activated(fn(info) {
    chrome.tabs_query(chrome.QueryInfo, fn(tabs) {
      let assert Ok(tab) = list.first(tabs)
      echo tab.status
    })

    let action = Click("#something")
    chrome.tabs_send_message(info.tab_id, action)
  })
}
