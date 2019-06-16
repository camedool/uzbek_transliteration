
window.onload = init; 

function init() { 

    let button = document.getElementById("transliterateBtn");
    button.addEventListener("click", (e) => {
        // add the button spinner class
        let loaderPlaceholder = document.getElementById("loader_placeholder");
        loaderPlaceholder.classList.add("loading");
        button.style.visibility = "hidden";

        // @ts-ignore
        let toLanguage;
        // @ts-ignore
        if (document.getElementById("latin").checked) {
            toLanguage = "latin";
            console.log("latins is being transliterated");
        } else {
            toLanguage = "cyrillic"
            console.log("cyrillic is being transliterated");
        }

        const params = {
            active: true,
            currentWindow: true
        }

        // for(let i=0; i<50000; i++) {
        //     console.log(i);
        // }

        // @ts-ignore
        chrome.tabs.query(params, (tabs) => {
            // @ts-ignore
            chrome.tabs.sendMessage(tabs[0].id, {language: toLanguage}, (response) => {
                // if (response.success) {
                //     loaderPlaceholder.classList.remove("loading");
                //     // remove the button class
                //     button.style.visibility = "visible";

                // }
            })
        });
    });
}

