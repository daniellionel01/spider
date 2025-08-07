import gleam/io

pub fn main() {
  io.println("hey i'm just in the background.")

  let ws = connect_websocket()
}

@external(javascript, "./background_ffi.js", "connectWebSocket")
fn connect_websocket() -> a
