var ripit = document.getElementById("ripit");
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
  chrome.tabs.executeScript(null, {
    file: "episode_list.js"
  });
}
