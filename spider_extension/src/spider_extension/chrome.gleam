import gleam/option.{type Option}
import spider_extension/chrome/tabs.{type Tab}

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

pub type RuntimeOnMessage(a, b) =
  fn(RuntimeMessage(a), MessageSender) -> b

@external(javascript, "./chrome_ffi.js", "runtime_on_message")
pub fn runtime_on_message(cb: RuntimeOnMessage(a, b)) -> b