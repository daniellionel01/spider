import gleam/option.{type Option}
import spider_js/chrome/tabs.{type Tab}

pub type RuntimeMessage(a) {
  RuntimeMessage(request: a)
}

pub type MessageSender {
  MessageSender(
    document_id: Option(String),
    document_lifecycle: Option(String),
    frame_id: Option(Int),
    id: Option(String),
    native_application: Option(String),
    origin: Option(String),
    tab: Option(Tab),
    tls_channel_id: Option(String),
    url: Option(String),
  )
}

pub type SendResponse(a, b) =
  fn(a) -> b

pub type RuntimeOnMessage(a, b, c, d) {
  HandlerSync(cb: fn(RuntimeMessage(a), MessageSender) -> c)
  HandlerAsync(
    cb: fn(RuntimeMessage(a), MessageSender, SendResponse(b, c)) -> d,
  )
}

@external(javascript, "./runtime_ffi.js", "runtime_on_message")
pub fn on_message(handler: RuntimeOnMessage(a, b, c, d)) -> e
