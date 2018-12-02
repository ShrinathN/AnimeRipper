var thatData;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.todo == "linksArray") //meaning the main episode list is being sent in
  {
    thatData = request.data;
    chrome.storage.sync.
  }
  else if(request.todo == "sendbob")
  {
    chrome.runtime.sendMessage({todo: "bob", bob: thatData});
  }
});
