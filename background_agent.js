var isRunning;
var episodeList;

function getRunningStatus()
{
  chrome.storage.sync.get("isRunning", function(result){
    isRunning = result.isRunning;
  });
}

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    getRunningStatus();
    if(isRunning) {
    if(request.todo == "storeEpisodeList") //the main episode list is being sent in as data. Sent by episode_list.js
    {
      episodeList = request.data;
      chrome.storage.sync.set({episodeList: episodeList}); //storing data
    }
    else if(request.todo == "whatIsNextPage") //if a script is requesting the next page to go to
    {
      chrome.storage.sync.get("episodeList", function(data){
        episodeList = data.episodeList;
        var nextPage = episodeList.pop();
        if(nextPage == undefined) //meaning all have been gone over, process ends here
        {
          chrome.storage.sync.set({isRunning: false}); //storing data
        }
        else { //meaning this was not the last element in the list
          chrome.storage.sync.set({episodeList: episodeList}); //saving the new list
          chrome.runtime.sendMessage({todo: "goToPage", data: nextPage}); //sending message to script to goto the nextPage
        }
      });
    }
    else if(request.todo == "canIRun")
    {
      getRunningStatus();
      if(isRunning){
        chrome.runtime.sendMessage({todo: "yesCanRun"});
      }
      else {
        chrome.runtime.sendMessage({todo: "noCannotRun"});
      }
    }
  }
  else {
    console.log("NOT RUNNING BACKGROUND REEEE");
  }
}

/*
===LIST OF REQUESTS===

storeEpisodeList
whatIsNextPage -=-=-=-=- goToPage
canIRun -=-=-= yesCanRun
            -= noCannotRun
addDownloadLink

===LIST OF REQUESTS===
*/
