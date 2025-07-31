
## gleam chrome ffi

I require your assistance to create more ffi bindings for gleam with the chrome api for my browser extension.
You can take a look at `src/spider_extension/chrome.gleam` and `src/spider_extension/chrome_ffi.js` for existing bindings that I handcrafted.

I have already downloaded and broken up all of the chrome apis into their type definitions in `../docs/chrome_apis/namespaces`.
You may explore them to get an idea of what types, functions and events to implement.

We are interested in the following chrome apis:
- chrome.tabs
- chrome.runtime
- chrome.scripting
- chrome.cookies
- chrome.devtools.network
- chrome.events
- chrome.extension
- chrome.history
- chrome.pageCapture
- chrome.storage
- chrome.webRequest
- chrome.webNavigation

Important to remember:
- every type needs to mapped manually in javascript to convert between camel case and pascal case
- enums in typescript are just strings and need to converted to the corresponding js class created by gleam
