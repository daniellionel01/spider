import gleam/io
import spider_extension/background.{Click}
import spider_extension/chrome

pub fn init() {
  io.println("Hello from spider_extension!")

  chrome.runtime_on_message(handle_message)
}

pub fn handle_message(
  msg: chrome.RuntimeMessage(background.Action),
  sender: chrome.MessageSender,
) {
  echo sender
  case msg.request {
    Click(el:) -> echo { "supposed to click: " <> el }
  }
}
