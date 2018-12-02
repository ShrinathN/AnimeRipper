var thatData;
var isRunning;

//acertains if we have to continue running or not
chrome.storage.sync.get("isRunning", function(result){
  isRunning = result.isRunning;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.todo == "linksArray") //meaning the main episode list is being sent in
  {
    thatData = request.data;
    chrome.storage.sync.set({episodeList: thatData}); //storing to
  }
});
