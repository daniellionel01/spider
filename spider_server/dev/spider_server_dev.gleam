import gleam/erlang/process
import spider_server

pub fn main() {
  let server = spider_server.start()

  process.sleep_forever()
}
