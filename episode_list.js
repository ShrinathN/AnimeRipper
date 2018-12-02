//this file will find out the episode page links and send them to the background_agent.js script
//this will be manually run by the popup.js, so no checks are required

var box2 = document.getElementsByClassName("box2");
var linksArray = []; //this array will hold all the episode page links
for (var i = 0; i < box2.length; i++) {
  linksArray.push(box2[i].children[1].children[1].children[0].href);
}
//this will send a message with the name linksArray, to the background_agent.js script, which will store the info
chrome.runtime.sendMessage({
  todo: "storeEpisodeList",
  data: linksArray
});

//response will tell where to go
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.todo == "goToPage") {
        window.location.href = request.data;
      }
    }
