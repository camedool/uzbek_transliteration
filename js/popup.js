
window.onload = init; 

function init() { 

    let button = document.getElementById("transliterateBtn");
    button.addEventListener("click", (e) => {
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

        const params = {
            active: true,
            currentWindow: true
        }

        setTimeout(() => {
            // @ts-ignore
            chrome.tabs.query(params, (tabs) => {
                // @ts-ignore
                chrome.tabs.sendMessage(tabs[0].id, {language: toLanguage}, (response) => {
                    if (response && response.success) {
                        loaderPlaceholder.classList.remove("loading");
                        // @ts-ignore                
                        button.disabled = false;
                    }
                })
            });
        }, 0)
    });
}

