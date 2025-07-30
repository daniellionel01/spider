import gleam/option.{type Option}

pub type TabInfo {
  TabInfo(tab_id: Int, window_id: Int)
}

pub type TabsOnActivated(a) =
  fn(TabInfo) -> a

pub type RuntimeMessage(a) {
  RuntimeMessage(request: a)
}

pub type MutedInfo {
  MutedInfo(extension_id: Option(String), muted: Bool)
}

pub type TabStatus {
  TabUnloaded
  TabLoading
  TabComplete
}

pub type Tab {
  Tab(
    active: Bool,
    audible: Bool,
    auto_discardable: Bool,
    discarded: Bool,
    fav_icon_url: Option(String),
    frozen: Bool,
    group_id: Int,
    height: Option(Float),
    highlighted: Bool,
    id: Option(Int),
    incognito: Bool,
    index: Int,
    last_accessed: Float,
    muted_info: Option(MutedInfo),
    opener_tab_id: Option(Int),
    pending_url: Option(String),
    pinned: Bool,
    session_id: Option(String),
    status: Option(TabStatus),
    title: Option(String),
    url: Option(String),
    width: Option(Float),
    window_id: Int,
  )
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

pub type QueryInfo {
  QueryInfo
}

pub type TabsQuery(a) =
  fn(List(Tab)) -> a

pub type RuntimeOnMessage(a, b) =
  fn(RuntimeMessage(a), MessageSender) -> b

@external(javascript, "./chrome_ffi.js", "tabs_on_activated")
pub fn tabs_on_activated(cb: TabsOnActivated(a)) -> b

@external(javascript, "./chrome_ffi.js", "tabs_send_message")
pub fn tabs_send_message(tab_id: Int, message: a) -> b

@external(javascript, "./chrome_ffi.js", "runtime_on_message")
pub fn runtime_on_message(cb: RuntimeOnMessage(a, b)) -> b

@external(javascript, "./chrome_ffi.js", "tabs_query")
pub fn tabs_query(query_info: QueryInfo, cb: TabsQuery(a)) -> b
