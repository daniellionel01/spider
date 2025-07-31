import * as option from "../../gleam_stdlib/gleam/option.mjs";
import { List } from "../../gleam_stdlib/gleam.mjs";
import { TabUnloaded, TabLoading, TabComplete, User, Capture, Extension, Normal, Popup, Panel, App, DevTools, Automatic, Manual, Disabled, PerOrigin, PerTab } from "./chrome.mjs";

export function tabs_on_activated(cb) {
  chrome.tabs.onActivated.addListener((info) => {
    cb({ tab_id: info.tabId, window_id: info.windowId });
  });
}

export function tabs_send_message(tab_id, payload) {
  chrome.tabs.sendMessage(tab_id, payload);
}

export function runtime_on_message(cb) {
  chrome.runtime.onMessage.addListener((request, sender, _sendResponse) => {
    cb({ request }, make_sender(sender));
  });
}

function convert_query_info_to_js(query_info) {
  // Convert from gleam format (snake_case) to JS format (camelCase)
  const result = {};
  
  // Helper function to extract option value
  function extract_option(option_value) {
    return option_value && option_value._type === "Some" ? option_value._value : undefined;
  }
  
  if (query_info.status && query_info.status._type === "Some") {
    result.status = convert_tab_status_to_js(query_info.status._value);
  }
  
  // Using extract_option for all option fields
  const last_focused_window = extract_option(query_info.last_focused_window);
  if (last_focused_window !== undefined) {
    result.lastFocusedWindow = last_focused_window;
  }
  
  const window_id = extract_option(query_info.window_id);
  if (window_id !== undefined) {
    result.windowId = window_id;
  }
  
  if (query_info.window_type && query_info.window_type._type === "Some") {
    result.windowType = convert_window_type_to_js(query_info.window_type._value);
  }
  
  const active = extract_option(query_info.active);
  if (active !== undefined) {
    result.active = active;
  }
  
  const index = extract_option(query_info.index);
  if (index !== undefined) {
    result.index = index;
  }
  
  const title = extract_option(query_info.title);
  if (title !== undefined) {
    result.title = title;
  }
  
  const url = extract_option(query_info.url);
  if (url !== undefined) {
    result.url = url;
  }
  
  const current_window = extract_option(query_info.current_window);
  if (current_window !== undefined) {
    result.currentWindow = current_window;
  }
  
  const highlighted = extract_option(query_info.highlighted);
  if (highlighted !== undefined) {
    result.highlighted = highlighted;
  }
  
  const discarded = extract_option(query_info.discarded);
  if (discarded !== undefined) {
    result.discarded = discarded;
  }
  
  const frozen = extract_option(query_info.frozen);
  if (frozen !== undefined) {
    result.frozen = frozen;
  }
  
  const auto_discardable = extract_option(query_info.auto_discardable);
  if (auto_discardable !== undefined) {
    result.autoDiscardable = auto_discardable;
  }
  
  const pinned = extract_option(query_info.pinned);
  if (pinned !== undefined) {
    result.pinned = pinned;
  }
  
  const audible = extract_option(query_info.audible);
  if (audible !== undefined) {
    result.audible = audible;
  }
  
  const muted = extract_option(query_info.muted);
  if (muted !== undefined) {
    result.muted = muted;
  }
  
  const group_id = extract_option(query_info.group_id);
  if (group_id !== undefined) {
    result.groupId = group_id;
  }
  
  return result;
}

// Helper function to extract option value
function extract_option(option_value) {
  return option_value && option_value._type === "Some" ? option_value._value : undefined;
}

function convert_create_properties_to_js(properties) {
  const result = {};
  
  const index = extract_option(properties.index);
  if (index !== undefined) {
    result.index = index;
  }
  
  const opener_tab_id = extract_option(properties.opener_tab_id);
  if (opener_tab_id !== undefined) {
    result.openerTabId = opener_tab_id;
  }
  
  const url = extract_option(properties.url);
  if (url !== undefined) {
    result.url = url;
  }
  
  const pinned = extract_option(properties.pinned);
  if (pinned !== undefined) {
    result.pinned = pinned;
  }
  
  const window_id = extract_option(properties.window_id);
  if (window_id !== undefined) {
    result.windowId = window_id;
  }
  
  const active = extract_option(properties.active);
  if (active !== undefined) {
    result.active = active;
  }
  
  return result;
}

function convert_update_properties_to_js(properties) {
  const result = {};
  
  const pinned = extract_option(properties.pinned);
  if (pinned !== undefined) {
    result.pinned = pinned;
  }
  
  const opener_tab_id = extract_option(properties.opener_tab_id);
  if (opener_tab_id !== undefined) {
    result.openerTabId = opener_tab_id;
  }
  
  const url = extract_option(properties.url);
  if (url !== undefined) {
    result.url = url;
  }
  
  const highlighted = extract_option(properties.highlighted);
  if (highlighted !== undefined) {
    result.highlighted = highlighted;
  }
  
  const active = extract_option(properties.active);
  if (active !== undefined) {
    result.active = active;
  }
  
  const muted = extract_option(properties.muted);
  if (muted !== undefined) {
    result.muted = muted;
  }
  
  const auto_discardable = extract_option(properties.auto_discardable);
  if (auto_discardable !== undefined) {
    result.autoDiscardable = auto_discardable;
  }
  
  return result;
}

function convert_reload_properties_to_js(properties) {
  if (!properties || properties._type === "None") return undefined;
  const props = properties._value;
  const result = {};
  
  const bypass_cache = extract_option(props.bypass_cache);
  if (bypass_cache !== undefined) {
    result.bypassCache = bypass_cache;
  }
  
  return result;
}

function convert_move_properties_to_js(properties) {
  const result = {
    index: properties.index,
  };
  
  const window_id = extract_option(properties.window_id);
  if (window_id !== undefined) {
    result.windowId = window_id;
  }
  
  return result;
}

function convert_tab_status_to_js(status) {
  if (status._type === "TabUnloaded") {
    return "unloaded";
  } else if (status._type === "TabLoading") {
    return "loading";
  } else if (status._type === "TabComplete") {
    return "complete";
  }
  return null;
}

function convert_window_type_to_js(type) {
  if (type._type === "Normal") {
    return "normal";
  } else if (type._type === "Popup") {
    return "popup";
  } else if (type._type === "Panel") {
    return "panel";
  } else if (type._type === "App") {
    return "app";
  } else if (type._type === "DevTools") {
    return "devtools";
  }
  return null;
}

function make_on_updated_info(info) {
  return {
    audible: make_option(info.audible),
    auto_discardable: make_option(info.autoDiscardable),
    discarded: make_option(info.discarded),
    fav_icon_url: make_option(info.favIconUrl),
    frozen: make_option(info.frozen),
    group_id: make_option(info.groupId),
    muted_info: make_option(make_muted_info(info.mutedInfo)),
    pinned: make_option(info.pinned),
    status: make_option(make_tab_status(info.status)),
    title: make_option(info.title),
    url: make_option(info.url),
  };
}

function make_on_removed_info(info) {
  return {
    is_window_closing: info.isWindowClosing,
    window_id: info.windowId,
  };
}

function make_on_moved_info(info) {
  return {
    from_index: info.fromIndex,
    to_index: info.toIndex,
    window_id: info.windowId,
  };
}

function make_on_detached_info(info) {
  return {
    old_position: info.oldPosition,
    old_window_id: info.oldWindowId,
  };
}

function make_on_attached_info(info) {
  return {
    new_position: info.newPosition,
    new_window_id: info.newWindowId,
  };
}

export function tabs_query(query_info, cb) {
  const jsQueryInfo = convert_query_info_to_js(query_info);
  chrome.tabs.query(jsQueryInfo, (tabs) => {
    const the_tabs = tabs.map(make_tab);
    cb(List.fromArray(the_tabs));
  });
}

export function tabs_get(tab_id, cb) {
  chrome.tabs.get(tab_id, (tab) => {
    cb(make_tab(tab));
  });
}

export function tabs_get_current(cb) {
  chrome.tabs.getCurrent((tab) => {
    cb(make_tab(tab));
  });
}

export function tabs_create(properties, cb) {
  const jsProperties = convert_create_properties_to_js(properties);
  chrome.tabs.create(jsProperties, (tab) => {
    cb(make_tab(tab));
  });
}

export function tabs_update(tab_id, properties, cb) {
  const jsProperties = convert_update_properties_to_js(properties);
  // Handle optional tab_id
  const tab_id_value = extract_option(tab_id);
  
  if (tab_id_value !== undefined) {
    chrome.tabs.update(tab_id_value, jsProperties, (tab) => {
      cb(make_tab(tab));
    });
  } else {
    chrome.tabs.update(jsProperties, (tab) => {
      cb(make_tab(tab));
    });
  }
}

export function tabs_reload(tab_id, properties, cb) {
  const jsProperties = convert_reload_properties_to_js(properties);
  const tab_id_value = extract_option(tab_id);
  
  if (tab_id_value !== undefined) {
    if (jsProperties) {
      chrome.tabs.reload(tab_id_value, jsProperties, cb);
    } else {
      chrome.tabs.reload(tab_id_value, cb);
    }
  } else {
    if (jsProperties) {
      chrome.tabs.reload(jsProperties, cb);
    } else {
      chrome.tabs.reload(cb);
    }
  }
}

export function tabs_remove(tab_id, cb) {
  chrome.tabs.remove(tab_id, cb);
}

export function tabs_move(tab_id, move_properties, cb) {
  const jsMoveProperties = convert_move_properties_to_js(move_properties);
  chrome.tabs.move(tab_id, jsMoveProperties, (tab) => {
    cb(make_tab(tab));
  });
}

export function tabs_duplicate(tab_id, cb) {
  chrome.tabs.duplicate(tab_id, (tab) => {
    cb(make_tab(tab));
  });
}

export function tabs_on_updated(cb) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    cb(tabId, make_on_updated_info(changeInfo), make_tab(tab));
  });
}

export function tabs_on_removed(cb) {
  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    cb(tabId, make_on_removed_info(removeInfo));
  });
}

export function tabs_on_created(cb) {
  chrome.tabs.onCreated.addListener((tab) => {
    cb(make_tab(tab));
  });
}

export function tabs_on_moved(cb) {
  chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
    cb(tabId, make_on_moved_info(moveInfo));
  });
}

export function tabs_on_detached(cb) {
  chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
    cb(tabId, make_on_detached_info(detachInfo));
  });
}

export function tabs_on_attached(cb) {
  chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
    cb(tabId, make_on_attached_info(attachInfo));
  });
}

function make_option(value) {
  if (value === undefined || value === null) {
    return new option.None();
  }
  return new option.Some(value);
}
function make_sender(sender) {
  return {
    document_id: make_option(sender.documentId),
    document_lifecycle: make_option(sender.documentLifecycle),
    frame_id: make_option(sender.frameId),
    id: make_option(sender.id),
    native_application: make_option(sender.nativeApplication),
    origin: make_option(sender.origin),
    tab: make_option(make_tab(sender.tab)),
    tls_channel_id: make_option(sender.tlsChannelId),
    url: make_option(sender.url),
  };
}

function make_tab(tab) {
  return {
    active: tab.active,
    audible: tab.audible,
    auto_discardable: tab.autoDiscardable,
    discarded: tab.discarded,
    fav_icon_url: make_option(tab.favIconUrl),
    frozen: tab.frozen,
    group_id: tab.groupId,
    height: make_option(tab.height),
    highlighted: tab.highlighted,
    id: make_option(tab.id),
    incognito: tab.incognito,
    index: tab.index,
    last_accessed: tab.lastAccessed,
    opener_tab_id: make_option(tab.openerTabId),
    pending_url: make_option(tab.pendingUrl),
    pinned: tab.pinned,
    session_id: make_option(tab.sessionId),
    status: make_option(make_tab_status(tab.status)),
    title: make_option(tab.title),
    url: make_option(tab.url),
    width: make_option(tab.width),
    window_id: tab.windowId,
    muted_info: make_option(make_muted_info(tab.mutedInfo)),
  };
}

function make_tab_status(status) {
  if (status === "unloaded") {
    return new TabUnloaded();
  } else if (status === "loading") {
    return new TabLoading();
  } else if (status === "complete") {
    return new TabComplete();
  }
}

function make_muted_info(muted_info) {
  if (!muted_info) return null;
  return {
    extension_id: make_option(muted_info.extensionId),
    muted: muted_info.muted,
    reason: make_option(make_muted_info_reason(muted_info.reason)),
  };
}

function make_muted_info_reason(reason) {
  if (!reason) return null;
  if (reason === "user") {
    return new User();
  } else if (reason === "capture") {
    return new Capture();
  } else if (reason === "extension") {
    return new Extension();
  }
  return null;
}

function make_window_type(type) {
  if (!type) return null;
  if (type === "normal") {
    return new Normal();
  } else if (type === "popup") {
    return new Popup();
  } else if (type === "panel") {
    return new Panel();
  } else if (type === "app") {
    return new App();
  } else if (type === "devtools") {
    return new DevTools();
  }
  return null;
}

function make_zoom_settings_mode(mode) {
  if (!mode) return null;
  if (mode === "automatic") {
    return new Automatic();
  } else if (mode === "manual") {
    return new Manual();
  } else if (mode === "disabled") {
    return new Disabled();
  }
  return null;
}

function make_zoom_settings_scope(scope) {
  if (!scope) return null;
  if (scope === "per-origin") {
    return new PerOrigin();
  } else if (scope === "per-tab") {
    return new PerTab();
  }
  return null;
}

function make_zoom_settings(settings) {
  if (!settings) return null;
  return {
    mode: make_option(make_zoom_settings_mode(settings.mode)),
    scope: make_option(make_zoom_settings_scope(settings.scope)),
    default_zoom_factor: make_option(settings.defaultZoomFactor),
  };
}
