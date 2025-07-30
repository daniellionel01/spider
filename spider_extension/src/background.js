import { init } from "./spider_extension/background.mjs";

init();

chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.sendMessage(info.tabId, { action: "doSomething" });
});
