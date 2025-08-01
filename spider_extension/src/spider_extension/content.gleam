import gleam/io
import spider_core/actions
import spider_js/chrome/runtime
import spider_js/window

pub fn main() {
  // runtime.on_message(runtime.HandlerSync(handle_message))
  runtime.on_message(runtime.HandlerAsync(handle_message))

  window.add_event_listener("load", onload)
}

fn onload(_e: window.Event(a)) {
  io.println("Hello from spider_extension!")
}

fn handle_message(
  msg: runtime.RuntimeMessage(actions.Action),
  _sender: runtime.MessageSender,
  send_response: runtime.SendResponse(String, a),
) {
  case msg.request {
    actions.Click(el:) -> echo { "supposed to click: " <> el }
  }
  send_response("my response")
}
