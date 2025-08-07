# API

* launching the browser
  * headful / headless
  * viewport
  * chrome executable
  * user directory
  * proxy
* managing tabs
  * opening new tab
  * visiting a url
* interacting with websites
  * get an element
  * find multiple elements
  * get element attribute
* event handlers
  * on tab open / close / navigation
  * on network request

## Example Code
```gleam
import spider_server
import spider_core

pub fn main() {
  let server = spider_server.start_server()

  let session = spider_server.launch_session(server)

  let page = spider_server.create_tab(session)
  let page = spider_server.goto(page, "https://google.com")
  let el = spider_server.await_element("textarea[name=q]", timeout: spider_core.Seconds(30))

  spider_server.stop_session(session)
  spider_server.stop_server(server)
}
```
