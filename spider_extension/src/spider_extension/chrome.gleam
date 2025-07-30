pub type TabInfo {
  TabInfo(tab_id: Int, window_id: Int)
}

pub type TabsOnActivated(a) =
  fn(TabInfo) -> a

pub type RuntimeMessage(a) {
  RuntimeMessage(request: a)
}

pub type RuntimeOnMessage(a, b) =
  fn(RuntimeMessage(a)) -> b

@external(javascript, "./chrome_ffi.js", "tabs_on_activated")
pub fn tabs_on_activated(cb: TabsOnActivated(a)) -> a

@external(javascript, "./chrome_ffi.js", "tabs_send_message")
pub fn tabs_send_message(tab_id: Int, message: a) -> b

@external(javascript, "./chrome_ffi.js", "runtime_on_message")
pub fn runtime_on_message(cb: RuntimeOnMessage(a, b)) -> b
