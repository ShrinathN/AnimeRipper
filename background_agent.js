var isRunning;
var episodeList;

function sendMessageToTab(todo, data) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      todo: todo,
      data: data
    });
  });
}

function getRunningStatus() {
  chrome.storage.sync.get("isRunning", function(result) {
    isRunning = result.isRunning;
  });
}

function sendNextPage() {
  chrome.storage.sync.get("episodeList", function(data) {
    episodeList = data.episodeList;
    var nextPage = episodeList.pop();
    if (nextPage == undefined) //meaning all have been gone over, process ends here
    {
      chrome.storage.sync.set({
        isRunning: false
      }); //storing data
    } else { //meaning this was not the last element in the list
      chrome.storage.sync.set({
        episodeList: episodeList
      }); //saving the new list
    }
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "storeEpisodeList") //the main episode list is being sent in as data. Sent by episode_list.js
  {
    episodeList = request.data;
    // episodeList.pop(); //first one has already been visited, dropping
    chrome.storage.sync.set({
      episodeList: episodeList
    }); //storing data
  }
  else if (request.todo == "whatIsNextPage") //if a script is requesting the next page to go to
  {
    chrome.storage.sync.get("episodeList", function(data) {
      episodeList = data.episodeList;
      var nextPage = episodeList.pop();
      if (nextPage == undefined) //meaning all have been gone over, process ends here
      {
        chrome.storage.sync.set({
          isRunning: false
        }); //storing data

/////////////////////////////////////
        chrome.storage.sync.get("downloadLinkList", function(result) {
          var downloadLinkList = result.downloadLinkList;
          var finalStr = "<!DOCTYPE HTML><html><body>" + downloadLinkList + "</body></html>";
          sendMessageToTab("writeData", finalStr);
        });
/////////////////////////////////////

      } else { //meaning this was not the last element in the list
        chrome.storage.sync.set({
          episodeList: episodeList
        });
        sendMessageToTab("goToPage", nextPage); //sending message to script to goto the nextPage
      }
    });
  }



  else if (request.todo == "canIRun") {
    getRunningStatus();
    if (isRunning) {
      sendMessageToTab("yesCanRun", null);
    } else {
      sendMessageToTab("noCannotRun", null);
    }
  }



  else if (request.todo == "addDownloadLink") {
    var linkToAdd = request.data;
    chrome.storage.sync.get("downloadLinkList", function(result) {
      var downloadLinkList = result.downloadLinkList;
      if(downloadLinkList == undefined) {
        downloadLinkList = "";
      }
      downloadLinkList += linkToAdd + "\n";
      chrome.storage.sync.set({
        downloadLinkList: downloadLinkList
      });
    });
  }
});



/*
===LIST OF REQUESTS===

storeEpisodeList
whatIsNextPage -=-=-=-=- goToPage
canIRun -=-=-= yesCanRun
            -= noCannotRun
addDownloadLink
writeData

===LIST OF REQUESTS===
*/
