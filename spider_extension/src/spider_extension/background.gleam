import gleam/list
import gleam/option.{None, Some}
import spider_extension/chrome/tabs

pub type Action {
  Click(el: String)
}

pub fn init() {
  tabs.on_activated(fn(info) {
    let query =
      tabs.QueryInfo(
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
    tabs.query(query, fn(tab_list) {
      let assert Ok(tab) = list.first(tab_list)
      echo tab.status
    })

    let action = Click("#something")
    tabs.send_message(info.tab_id, action)
  })
}
