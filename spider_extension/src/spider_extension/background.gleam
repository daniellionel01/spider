import gleam/list
import gleam/option.{None, Some}
import spider_extension/chrome

pub type Action {
  Click(el: String)
}

pub fn init() {
  chrome.tabs_on_activated(fn(info) {
    let query =
      chrome.QueryInfo(
        status: None,
        last_focused_window: None,
        window_id: Some(info.window_id),
        window_type: None,
        active: Some(True),
        index: None,
        title: None,
        url: None,
        current_window: None,
        highlighted: None,
        discarded: None,
        frozen: None,
        auto_discardable: None,
        pinned: None,
        audible: None,
        muted: None,
        group_id: None,
      )
    chrome.tabs_query(query, fn(tabs) {
      let assert Ok(tab) = list.first(tabs)
      echo tab.status
    })

    let action = Click("#something")
    chrome.tabs_send_message(info.tab_id, action)
  })
}
