import gleam/list
import gleam/option.{Some}
import gleam/string
import spider_js/chrome/tabs

pub type Action {
  Click(el: String)
}

pub fn main() {
  tabs.on_activated(fn(info) {
    let query =
      tabs.QueryInfo(
        ..tabs.default_query_info(),
        window_id: Some(info.window_id),
      )
    tabs.query(query, fn(tab_list) {
      let assert Ok(duckduckgo) =
        list.find(tab_list, fn(t) {
          t.url
          |> option.unwrap("")
          |> string.contains("duckduckgo")
        })
      echo duckduckgo
    })

    let action = Click("#something")
    tabs.send_message(info.tab_id, action)
  })
}
