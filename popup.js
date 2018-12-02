var ripit = document.getElementById("ripit");
var yamete = document.getElementById("yamete");
var say = document.getElementById('say');
var isRunning;

chrome.storage.sync.get("isRunning", function(result) {
  isRunning = result.isRunning;
  if (isRunning) {
    say.innerHTML = "Running...";
    ripit.disabled = true;
  } //if isRunning is true
  else {
    say.innerHTML = "Not Running";
    ripit.disabled = false;
  }
});

ripit.onclick = function() {
  chrome.storage.sync.set({
    isRunning: true
  });
  say.innerHTML = "Running...";
  ripit.disabled = true;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {
          file: "episode_list.js"
        });
      });
}

yamete.onclick = function() {
  chrome.storage.sync.set({isRunning: false});
  say.innerHTML = "Not Running";
  ripit.disabled = false;
}
