document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    
    chrome.storage.local.get(['cacheClearingEnabled'], (result) => {
      const isEnabled = result.cacheClearingEnabled;
      statusElement.textContent = `Cache clearing is ${isEnabled ? 'enabled' : 'disabled'}`;
    });
  });
  