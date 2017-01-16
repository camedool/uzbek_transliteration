
window.onload = init; 

function init() { 

    console.log("first stamp");

    $("#transliterateBtn").click(function() {
   	    // console.log($('input[value="language"]').val() )
        if($('input[value="Latin"]').is(':checked')) { 
            console.log("to Latin");
            //chrome.tabs.executeScript(null, {"file:js/content.js"}); 
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "latin"}, function(response) {
                   // console.log(response.farewell);
                });
            });
        } else {
            console.log("to Cyrllic");
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "cyrillic"}, function(response) {
                   // console.log(response.farewell);
                });
            });
        }
    
	});
};

// if($('input[value="Latin"]').is(':checked')) { 
//     alert("to Latin");
//     replaceToLatin($("body")); 
// }


