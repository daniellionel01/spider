import gleam/list
import gleam/option.{Some}
import gleam/string
import spider_core/actions
import spider_js/chrome/tabs

pub fn main() {
  tabs.on_activated(fn(_) {
    let action = actions.Click("#something")

    use tabs <- tabs.query(tabs.default_query_info())
    let assert Ok(google) =
      list.find(tabs, fn(t) {
        t.url |> option.unwrap("") |> string.contains("google.com")
      })
    let assert Some(google_id) = google.id

    tabs.send_message(google_id, action, Some(fn(res) { echo res }))
  })
}
