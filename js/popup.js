window.onload = init;

function init() {

  let button = document.getElementById("transliterateBtn");
  button.addEventListener("click", async (e) => {
    // add the button spinner class
    let loaderPlaceholder = document.getElementById("loader_placeholder");
    loaderPlaceholder.classList.add("loading");

    // @ts-ignore
    button.disabled = true;

    let toLanguage;
    // @ts-ignore
    if (document.getElementById("latin").checked)
      toLanguage = "latin";
    else
      toLanguage = "cyrillic"

    setTimeout(async () => {
      try {
        // @ts-ignore
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        // @ts-ignore
        const response = await chrome.tabs.sendMessage(tabs[0].id, { language: toLanguage });

        if (response && response.success) {
          loaderPlaceholder.classList.remove("loading");
          // @ts-ignore                
          button.disabled = false;
        }
      } catch (error) {
        // inform the user to re-load the page
        let node = document.getElementById("overlay");
        node.style.display = "block";
      }
    }, 0)
  });
}

