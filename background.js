chrome.tabs.onActivated.addListener(async () => {
    const tab = await getCurrentTab();
    if (tab) {
      const url = tab.url;
      // Send URL to Flask backend for tracking
      fetch('http://localhost:5000/api/track-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
    }
  });
  
  async function getCurrentTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        resolve(tab);
      });
    });
  }
  