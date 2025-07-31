import gleam/io
import spider_extension/background.{Click}
import spider_js/chrome

pub fn main() {
  io.println("Hello from spider_extension!")

  chrome.runtime_on_message(handle_message)
}

fn handle_message(
  msg: chrome.RuntimeMessage(background.Action),
  sender: chrome.MessageSender,
) {
  echo sender.tab
  case msg.request {
    Click(el:) -> echo { "supposed to click: " <> el }
  }
}
