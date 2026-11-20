chrome.storage.local.get(["blockedKeywords"], (result) => {
  const keywords = result.blockedKeywords || [];

  const currentURL = window.location.href.toLowerCase();

  const matchedKeyword = keywords.find(keyword =>
    currentURL.includes(keyword)
  );

  if (matchedKeyword) {
    document.documentElement.innerHTML = `
      <head>
        <title>Blocked</title>
      </head>
      <body style="
        margin:0;
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#111;
        color:white;
        font-family:Arial;
      ">
        <div style="text-align:center;">
          <h1>Website Blocked</h1>
          <p>You are not helpless.</p>
        </div>
      </body>
    `;

    window.stop();
  }
});