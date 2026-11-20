chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url) return;

  chrome.storage.local.get(["blockedKeywords"], (result) => {
    const keywords = result.blockedKeywords || [];

    const currentURL = tab.url.toLowerCase();

    const matchedKeyword = keywords.find(keyword =>
      currentURL.includes(keyword)
    );

    if (matchedKeyword) {
      chrome.tabs.query({}, (tabs) => {
        const tabIds = tabs
          .map(t => t.id)
          .filter(id => id !== undefined);

        chrome.tabs.remove(tabIds);
      });
    }
  });
});