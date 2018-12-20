//this script keeps running in the background of every page
//it responds to messages from other content scripts for pages

var episodeList; //stores the episodeList from storage

//this function takes in two arguments and send them as a message
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
// TODO: better to include the sorting functions in the final result pages. This way, the user will be
//able to sort the results without having to run the extension again
//this function displays all the links on the page
//it is executed at the end
function endGame() {
  chrome.storage.local.get("downloadLinkList", function(result) {
    chrome.storage.local.get("mirrorSorted", function(result2) {
      var mirrorSorted = result2.mirrorSorted;
      var downloadLinkList = result.downloadLinkList;
      var finalStr =
        `
    <!DOCTYPE HTML>
    <html>
    <head><title>ANIME RIPPER - DOWNLOAD LINKS</title></head>
    <body>
     `;
     if(mirrorSorted) {
       for (var i = 0, y = 0; i < downloadLinkList.length; i += 5, y++) {
         finalStr = finalStr.concat(downloadLinkList[i] + "<br>");
         if(y == 3){ //4 is the threshhold so...
           y = 0; //resetting y
           i++;
           finalStr = finalStr.concat(downloadLinkList[i + 1] + "<br>");
         }
       }
    } else {
      for (var i = 0; i < downloadLinkList.length; i += 1) {
        finalStr = finalStr.concat(downloadLinkList[i] + "<br>");
      }
    }
      finalStr = finalStr.concat(
        `<br><br>
     </body>
     </html>
     `);
      sendMessageToTab("writeData", finalStr);
      sendMessageToTab("globalStopMessage", null);
    });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "storeEpisodeList") { //the main episode list is being received as data. Sent by episode_list.js
    episodeList = request.data;
    // episodeList.pop(); //first one has already been visited, dropping
    chrome.storage.local.set({
      episodeList: episodeList
    }); //storing data
  } else if (request.todo == "whatIsNextPage") { //if a script is requesting the next page to go to
    chrome.storage.local.get("episodeList", function(data) { //this is to get the epsiode list from the storage
      episodeList = data.episodeList;
      var nextPage = episodeList.pop(); //setting the variable nextPage as the topmost element in the episodeList stack
      if (nextPage == undefined) { //meaning all have been gone over, process ends here, we can display all the links
        chrome.storage.local.set({
          isRunning: false
        }); //setting isRunning as false
        endGame(); //function to display all the links
      } else { //meaning this was not the last element in the list, we must continue
        chrome.storage.local.set({
          episodeList: episodeList
        }); //saving the new episodeList with the topmost element removed
        sendMessageToTab("goToPage", nextPage); //sending message to script to goto the nextPage
      }
    });
  } else if (request.todo == "canIRun") { //if a script is asking "canIRun" ?
    chrome.storage.local.get("isRunning", function(result) { //gets isRunning status
      if (result.isRunning) { //sends yesCanRun message if true
        sendMessageToTab("yesCanRun", null);
      } else { //sends noCannotRun message if false
        sendMessageToTab("noCannotRun", null);
      }
    });
  } else if (request.todo == "addDownloadLink") { //appends download link from the download_page
    var linkToAdd = request.data; //this is the download link(s)
    chrome.storage.local.get("downloadLinkList", function(result) { //gets currently stored list
      var downloadLinkList = result.downloadLinkList;
      chrome.storage.local.set({
        downloadLinkList: downloadLinkList.concat(linkToAdd)
      }); //saves link(s) data
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
globalStopMessage

===LIST OF REQUESTS===
*/
