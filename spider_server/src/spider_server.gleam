import gleam/bytes_tree
import gleam/dynamic/decode
import gleam/erlang/process
import gleam/http/request.{type Request}
import gleam/http/response.{type Response}
import gleam/json
import gleam/option
import mist.{type Connection, type ResponseData}

pub fn start() {
  let assert Ok(server) =
    fn(request: Request(Connection)) -> Response(ResponseData) {
      case request.path_segments(request) {
        ["ws"] -> serve_ws(request)
        _ -> response.set_body(response.new(404), mist.Bytes(bytes_tree.new()))
      }
    }
    |> mist.new
    |> mist.bind("localhost")
    |> mist.port(1234)
    |> mist.start

  server
}

pub type BrowserSession {
  BrowserSession(id: String)
}

pub type BrowserMessage {
  Ping
}

fn browser_message_decoder() -> decode.Decoder(BrowserMessage) {
  use variant <- decode.then(decode.string)
  case variant {
    "ping" -> decode.success(Ping)
    _ -> decode.failure(Ping, "BrowserMessage")
  }
}

fn serve_ws(request: Request(Connection)) {
  mist.websocket(
    request:,
    on_init: init_socket,
    handler: loop_socket,
    on_close: close_socket,
  )
}

fn loop_socket(
  state: BrowserSession,
  message: mist.WebsocketMessage(BrowserMessage),
  connection: mist.WebsocketConnection,
) -> mist.Next(BrowserSession, BrowserMessage) {
  case message {
    mist.Binary(_) -> mist.continue(state)
    mist.Custom(_) -> {
      panic as "received custom message"
    }
    mist.Text(message) -> {
      case json.parse(message, browser_message_decoder()) {
        Ok(message) -> {
          echo message as "runtime message"
          let assert Ok(_) = mist.send_text_frame(connection, "pong")
          Nil
        }
        Error(_) -> {
          echo "could not decode text message"
          echo message as "the message"
          Nil
        }
      }
      mist.continue(state)
    }
    mist.Shutdown | mist.Closed -> {
      mist.stop()
    }
  }
}

fn close_socket(_value: e) {
  echo "socket closed"
  Nil
}

fn init_socket(
  _connection: mist.WebsocketConnection,
) -> #(BrowserSession, option.Option(process.Selector(b))) {
  echo "hello new client!"
  #(BrowserSession("someid"), option.None)
}
