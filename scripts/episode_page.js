//this is supposed to only run on episode pages
//it will fire at every www.chia-anime.me/*subbed page, so we'll have to filter

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "yesCanRun") {
    if (document.getElementById("download") != null) {
	  var downloadA = document.getElementById("download");
	  window.location = downloadA.href;
	}
  }
});

chrome.runtime.sendMessage({
  todo: "canIRun"
});
