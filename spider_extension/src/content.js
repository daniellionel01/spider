import { init } from "./spider_extension/content.mjs";

init();

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log({ action: request.action });
});
