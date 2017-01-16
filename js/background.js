function click(e) {
	chrome.tabs.query({currentWindow:true, active:true}, function(tabs) {
		console.log("background.js: click()");
		var specTab = tabs[0];
		chrome.tabs.executeScript(specTab.id, {file:"script.js"});
	});
}


chrome.browserAction.onClicked.addListener(click);


// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});