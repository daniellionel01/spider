pub type TabInfo {
  TabInfo(tab_id: Int, window_id: Int)
}

pub type TabsOnActivated =
  fn(TabInfo) -> Nil

@external(javascript, "./chrome_ffi.js", "tabs_on_activated")
pub fn tabs_on_activated(cb: TabsOnActivated) -> Nil
