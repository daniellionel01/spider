pub type Event(sub)

@external(javascript, "./window_ffi.js", "add_event_listener")
pub fn add_event_listener(type_: String, listener: fn(Event(t)) -> Nil) -> Nil
