import * as option from "../../../gleam_stdlib/gleam/option.mjs";
import { List } from "../../../gleam_stdlib/gleam.mjs";
import { make_option } from "./runtime_ffi.js";
import {
  TabUnloaded,
  TabLoading,
  TabComplete,
  User,
  Capture,
  Extension,
  Normal,
  Popup,
  Panel,
  App,
  DevTools,
  Automatic,
  Manual,
  Disabled,
  PerOrigin,
  PerTab,
} from "./tabs.mjs";

export function tabs_on_activated(cb) {
  chrome.tabs.onActivated.addListener((info) => {
    cb({ tab_id: info.tabId, window_id: info.windowId });
  });
}

export function tabs_send_message(tab_id, payload, cb) {
  let callback = option.unwrap(cb, undefined);
  chrome.tabs.sendMessage(tab_id, payload, undefined, callback);
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
  const tab_id_value = option.unwrap(tab_id, undefined);

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
  const tab_id_value = option.unwrap(tab_id, undefined);

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

export function make_tab(tab) {
  if (!tab) return null;
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
  if (!status) return null;
  if (status === "unloaded") {
    return new TabUnloaded();
  } else if (status === "loading") {
    return new TabLoading();
  } else if (status === "complete") {
    return new TabComplete();
  }
  return null;
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

function convert_query_info_to_js(query_info) {
  // Convert from gleam format (snake_case) to JS format (camelCase)
  const result = {};

  if (option.is_some(query_info.status)) {
    result.status = convert_tab_status_to_js(option.unwrap(query_info.status, null));
  }

  const last_focused_window = option.unwrap(query_info.last_focused_window, undefined);
  if (last_focused_window !== undefined) {
    result.lastFocusedWindow = last_focused_window;
  }

  const window_id = option.unwrap(query_info.window_id, undefined);
  if (window_id !== undefined) {
    result.windowId = window_id;
  }

  if (option.is_some(query_info.window_type)) {
    result.windowType = convert_window_type_to_js(option.unwrap(query_info.window_type, null));
  }

  const active = option.unwrap(query_info.active, undefined);
  if (active !== undefined) {
    result.active = active;
  }

  const index = option.unwrap(query_info.index, undefined);
  if (index !== undefined) {
    result.index = index;
  }

  const title = option.unwrap(query_info.title, undefined);
  if (title !== undefined) {
    result.title = title;
  }

  const url = option.unwrap(query_info.url, undefined);
  if (url !== undefined) {
    result.url = url;
  }

  const current_window = option.unwrap(query_info.current_window, undefined);
  if (current_window !== undefined) {
    result.currentWindow = current_window;
  }

  const highlighted = option.unwrap(query_info.highlighted, undefined);
  if (highlighted !== undefined) {
    result.highlighted = highlighted;
  }

  const discarded = option.unwrap(query_info.discarded, undefined);
  if (discarded !== undefined) {
    result.discarded = discarded;
  }

  const frozen = option.unwrap(query_info.frozen, undefined);
  if (frozen !== undefined) {
    result.frozen = frozen;
  }

  const auto_discardable = option.unwrap(query_info.auto_discardable, undefined);
  if (auto_discardable !== undefined) {
    result.autoDiscardable = auto_discardable;
  }

  const pinned = option.unwrap(query_info.pinned, undefined);
  if (pinned !== undefined) {
    result.pinned = pinned;
  }

  const audible = option.unwrap(query_info.audible, undefined);
  if (audible !== undefined) {
    result.audible = audible;
  }

  const muted = option.unwrap(query_info.muted, undefined);
  if (muted !== undefined) {
    result.muted = muted;
  }

  const group_id = option.unwrap(query_info.group_id, undefined);
  if (group_id !== undefined) {
    result.groupId = group_id;
  }

  return result;
}

function convert_create_properties_to_js(properties) {
  const result = {};

  const index = option.unwrap(properties.index, undefined);
  if (index !== undefined) {
    result.index = index;
  }

  const opener_tab_id = option.unwrap(properties.opener_tab_id, undefined);
  if (opener_tab_id !== undefined) {
    result.openerTabId = opener_tab_id;
  }

  const url = option.unwrap(properties.url, undefined);
  if (url !== undefined) {
    result.url = url;
  }

  const pinned = option.unwrap(properties.pinned, undefined);
  if (pinned !== undefined) {
    result.pinned = pinned;
  }

  const window_id = option.unwrap(properties.window_id, undefined);
  if (window_id !== undefined) {
    result.windowId = window_id;
  }

  const active = option.unwrap(properties.active, undefined);
  if (active !== undefined) {
    result.active = active;
  }

  return result;
}

function convert_update_properties_to_js(properties) {
  const result = {};

  const pinned = option.unwrap(properties.pinned, undefined);
  if (pinned !== undefined) {
    result.pinned = pinned;
  }

  const opener_tab_id = option.unwrap(properties.opener_tab_id, undefined);
  if (opener_tab_id !== undefined) {
    result.openerTabId = opener_tab_id;
  }

  const url = option.unwrap(properties.url, undefined);
  if (url !== undefined) {
    result.url = url;
  }

  const highlighted = option.unwrap(properties.highlighted, undefined);
  if (highlighted !== undefined) {
    result.highlighted = highlighted;
  }

  const active = option.unwrap(properties.active, undefined);
  if (active !== undefined) {
    result.active = active;
  }

  const muted = option.unwrap(properties.muted, undefined);
  if (muted !== undefined) {
    result.muted = muted;
  }

  const auto_discardable = option.unwrap(properties.auto_discardable, undefined);
  if (auto_discardable !== undefined) {
    result.autoDiscardable = auto_discardable;
  }

  return result;
}

function convert_reload_properties_to_js(properties) {
  if (option.is_none(properties)) return undefined;
  const props = option.unwrap(properties, null);
  const result = {};

  const bypass_cache = option.unwrap(props.bypass_cache, undefined);
  if (bypass_cache !== undefined) {
    result.bypassCache = bypass_cache;
  }

  return result;
}

function convert_move_properties_to_js(properties) {
  const result = {
    index: properties.index,
  };

  const window_id = option.unwrap(properties.window_id, undefined);
  if (window_id !== undefined) {
    result.windowId = window_id;
  }

  return result;
}
