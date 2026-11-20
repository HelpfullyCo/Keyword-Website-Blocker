const keywordInput = document.getElementById("keywordInput");
const addBtn = document.getElementById("addBtn");
const keywordList = document.getElementById("keywordList");

function loadKeywords() {
  chrome.storage.local.get(["blockedKeywords"], (result) => {
    const keywords = result.blockedKeywords || [];

    keywordList.innerHTML = "";

    keywords.forEach((keyword, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = keyword;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";

      removeBtn.addEventListener("click", () => {
        keywords.splice(index, 1);
        chrome.storage.local.set({ blockedKeywords: keywords }, () => {
          loadKeywords();
        });
      });

      li.appendChild(span);
      li.appendChild(removeBtn);
      keywordList.appendChild(li);
    });
  });
}

addBtn.addEventListener("click", () => {
  const keyword = keywordInput.value.trim().toLowerCase();

  if (!keyword) return;

  chrome.storage.local.get(["blockedKeywords"], (result) => {
    const keywords = result.blockedKeywords || [];

    if (!keywords.includes(keyword)) {
      keywords.push(keyword);

      chrome.storage.local.set({ blockedKeywords: keywords }, () => {
        keywordInput.value = "";
        loadKeywords();
      });
    }
  });
});

loadKeywords();