var ripit = document.getElementById("ripit");
var yamete = document.getElementById("yamete");
var say = document.getElementById('say');
var isRunning;

chrome.storage.sync.get("isRunning", function(result) {
  isRunning = result.isRunning;
  if (isRunning) {
    say.innerHTML = "Running...";
    ripit.disabled = true;
    yamete.disabled = false;
  } //if isRunning is true
  else {
    say.innerHTML = "Not Running";
    ripit.disabled = false;
    yamete.disabled = true;
  }
});

ripit.onclick = function() {
  chrome.storage.sync.set({isRunning: true});
  
  say.innerHTML = "Running...";
  ripit.disabled = true;
  yamete.disabled = false;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {
          file: "episode_list.js"
        });
      });
      chrome.storage.sync.set({downloadLinkList: ""});
}

yamete.onclick = function() {
  chrome.storage.sync.set({isRunning: false});

  say.innerHTML = "Not Running";
  ripit.disabled = false;
  yamete.disabled = true;
}
