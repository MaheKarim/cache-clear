function clearCacheAndReload(tabId) {
  chrome.browsingData.removeCache({}, () => {
    chrome.tabs.reload(tabId);
  });
}

chrome.action.onClicked.addListener((tab) => {
  clearCacheAndReload(tab.id);
});

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let tab = tabs[0];
    if (tab) {
      if (command === '_execute_action' || command === 'clear_cache_and_reload_f5') {
        clearCacheAndReload(tab.id);
      }
    }
  });
});
