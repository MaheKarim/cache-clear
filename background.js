// Function to clear cache and reload a tab
function clearCacheAndReload(tabId) {
  chrome.browsingData.removeCache({}, () => {
    chrome.tabs.reload(tabId);
  });
}

// Function to toggle the cache clearing state
function toggleCacheClearing() {
  chrome.storage.local.get(['cacheClearingEnabled'], (result) => {
    const newValue = !result.cacheClearingEnabled;
    chrome.storage.local.set({ cacheClearingEnabled: newValue }, () => {
      console.log(`Cache clearing ${newValue ? 'enabled' : 'disabled'}`);
    });
  });
}

// Listen for the extension icon click
chrome.action.onClicked.addListener(() => {
  toggleCacheClearing();
});

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === '_execute_action' || command === 'clear_cache_and_reload_f5') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0];
      if (tab) {
        clearCacheAndReload(tab.id);
      }
    });
  }
});

// Listen for tab reload events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.storage.local.get(['cacheClearingEnabled'], (result) => {
      if (result.cacheClearingEnabled) {
        clearCacheAndReload(tabId);
      }
    });
  }
});
