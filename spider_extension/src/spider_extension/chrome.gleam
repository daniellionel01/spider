import gleam/option.{type Option}

pub type TabInfo {
  TabInfo(tab_id: Int, window_id: Int)
}

pub type TabsOnActivated(a) =
  fn(TabInfo) -> a

pub type RuntimeMessage(a) {
  RuntimeMessage(request: a)
}

pub type Tab {
  Tab
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

@external(javascript, "./chrome_ffi.js", "tabs_on_activated")
pub fn tabs_on_activated(cb: TabsOnActivated(a)) -> b

@external(javascript, "./chrome_ffi.js", "tabs_send_message")
pub fn tabs_send_message(tab_id: Int, message: a) -> b

@external(javascript, "./chrome_ffi.js", "runtime_on_message")
pub fn runtime_on_message(cb: RuntimeOnMessage(a, b)) -> b
