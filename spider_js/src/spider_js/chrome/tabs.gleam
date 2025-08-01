import gleam/option.{type Option, None}

pub type TabInfo {
  TabInfo(tab_id: Int, window_id: Int)
}

pub type TabsOnActivated(a) =
  fn(TabInfo) -> a

pub type MutedInfoReason {
  User
  Capture
  Extension
}

pub type MutedInfo {
  MutedInfo(
    extension_id: Option(String),
    muted: Bool,
    reason: Option(MutedInfoReason),
  )
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

pub type WindowType {
  Normal
  Popup
  Panel
  App
  DevTools
}

pub type ZoomSettingsMode {
  Automatic
  Manual
  Disabled
}

pub type ZoomSettingsScope {
  PerOrigin
  PerTab
}

pub type ZoomSettings {
  ZoomSettings(
    mode: Option(ZoomSettingsMode),
    scope: Option(ZoomSettingsScope),
    default_zoom_factor: Option(Float),
  )
}

pub type CreateProperties {
  CreateProperties(
    index: Option(Int),
    opener_tab_id: Option(Int),
    url: Option(String),
    pinned: Option(Bool),
    window_id: Option(Int),
    active: Option(Bool),
  )
}

pub type UpdateProperties {
  UpdateProperties(
    pinned: Option(Bool),
    opener_tab_id: Option(Int),
    url: Option(String),
    highlighted: Option(Bool),
    active: Option(Bool),
    muted: Option(Bool),
    auto_discardable: Option(Bool),
  )
}

pub fn default_update_properties() {
  UpdateProperties(
    pinned: None,
    opener_tab_id: None,
    url: None,
    highlighted: None,
    active: None,
    muted: None,
    auto_discardable: None,
  )
}

pub type ReloadProperties {
  ReloadProperties(bypass_cache: Option(Bool))
}

pub type MoveProperties {
  MoveProperties(index: Int, window_id: Option(Int))
}

pub type QueryInfo {
  QueryInfo(
    status: Option(TabStatus),
    last_focused_window: Option(Bool),
    window_id: Option(Int),
    window_type: Option(WindowType),
    active: Option(Bool),
    index: Option(Int),
    title: Option(String),
    url: Option(String),
    current_window: Option(Bool),
    highlighted: Option(Bool),
    discarded: Option(Bool),
    frozen: Option(Bool),
    auto_discardable: Option(Bool),
    pinned: Option(Bool),
    audible: Option(Bool),
    muted: Option(Bool),
    group_id: Option(Int),
  )
}

pub fn default_query_info() {
  QueryInfo(
    status: None,
    last_focused_window: None,
    window_id: None,
    window_type: None,
    active: None,
    index: None,
    title: None,
    url: None,
    current_window: None,
    highlighted: None,
    discarded: None,
    frozen: None,
    auto_discardable: None,
    pinned: None,
    audible: None,
    muted: None,
    group_id: None,
  )
}

pub type TabsQuery(a) =
  fn(List(Tab)) -> a

pub type TabsCallback(a) =
  fn(Tab) -> a

pub type TabsListCallback(a) =
  fn(List(Tab)) -> a

pub type VoidCallback =
  fn() -> Nil

pub type OnUpdatedInfo {
  OnUpdatedInfo(
    audible: Option(Bool),
    auto_discardable: Option(Bool),
    discarded: Option(Bool),
    fav_icon_url: Option(String),
    frozen: Option(Bool),
    group_id: Option(Int),
    muted_info: Option(MutedInfo),
    pinned: Option(Bool),
    status: Option(TabStatus),
    title: Option(String),
    url: Option(String),
  )
}

pub type OnRemovedInfo {
  OnRemovedInfo(is_window_closing: Bool, window_id: Int)
}

pub type OnActivatedInfo {
  OnActivatedInfo(tab_id: Int, window_id: Int)
}

pub type OnMovedInfo {
  OnMovedInfo(from_index: Int, to_index: Int, window_id: Int)
}

pub type OnDetachedInfo {
  OnDetachedInfo(old_position: Int, old_window_id: Int)
}

pub type OnAttachedInfo {
  OnAttachedInfo(new_position: Int, new_window_id: Int)
}

pub type TabsOnUpdated(a) =
  fn(Int, OnUpdatedInfo, Tab) -> a

pub type TabsOnRemoved(a) =
  fn(Int, OnRemovedInfo) -> a

pub type TabsOnCreated(a) =
  fn(Tab) -> a

pub type TabsOnMoved(a) =
  fn(Int, OnMovedInfo) -> a

pub type TabsOnDetached(a) =
  fn(Int, OnDetachedInfo) -> a

pub type TabsOnAttached(a) =
  fn(Int, OnAttachedInfo) -> a

pub type SendMessageCallback(a, b) =
  fn(a) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_activated")
pub fn on_activated(cb: TabsOnActivated(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_send_message")
pub fn send_message(
  tab_id: Int,
  message: a,
  cb: Option(SendMessageCallback(b, c)),
) -> d

@external(javascript, "../chrome/tabs_ffi.js", "tabs_query")
pub fn query(query_info: QueryInfo, cb: TabsQuery(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_get")
pub fn get(tab_id: Int, cb: TabsCallback(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_get_current")
pub fn get_current(cb: TabsCallback(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_create")
pub fn create(properties: CreateProperties, cb: TabsCallback(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_update")
pub fn update(
  tab_id: Option(Int),
  properties: UpdateProperties,
  cb: TabsCallback(a),
) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_reload")
pub fn reload(
  tab_id: Option(Int),
  properties: Option(ReloadProperties),
  cb: VoidCallback,
) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_remove")
pub fn remove(tab_id: Int, cb: VoidCallback) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_move")
pub fn move(
  tab_id: Int,
  move_properties: MoveProperties,
  cb: TabsCallback(a),
) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_duplicate")
pub fn duplicate(tab_id: Int, cb: TabsCallback(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_updated")
pub fn on_updated(cb: TabsOnUpdated(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_removed")
pub fn on_removed(cb: TabsOnRemoved(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_created")
pub fn on_created(cb: TabsOnCreated(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_moved")
pub fn on_moved(cb: TabsOnMoved(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_detached")
pub fn on_detached(cb: TabsOnDetached(a)) -> b

@external(javascript, "../chrome/tabs_ffi.js", "tabs_on_attached")
pub fn on_attached(cb: TabsOnAttached(a)) -> b
