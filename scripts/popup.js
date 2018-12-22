//declaring all the elements being used
var button_ripit = document.getElementById("button_ripit");
var button_yamete = document.getElementById("button_yamete");
var heading_main = document.getElementById("heading_main");
var checkbox_mirror_sorted = document.getElementById("checkbox_mirror_sorted");
//global variable
var isRunning;

chrome.storage.local.get("isRunning", function(result) {
  isRunning = result.isRunning;
  if (isRunning) { //if isRunning is true
    heading_main.innerHTML = "Running...";
    button_ripit.disabled = true;
    button_yamete.disabled = false;
  } else { //if isRunning is false
    heading_main.innerHTML = "Not Running";
    button_ripit.disabled = false;
    button_yamete.disabled = true;
  }
});


//this is clicked when button_yamete is clicked, its basically the "stop" button
button_yamete.onclick = function() {
  chrome.storage.local.set({
    isRunning: false
  }); //setting isRunning as false

  heading_main.innerHTML = "Not Running";
  button_ripit.disabled = false;
  button_yamete.disabled = true;
}

//checks if the extension is running every 1 second (1000 ms)
function checkIfStillRunning()
{
  chrome.storage.local.get("isRunning", function(result){
    if(result.isRunning == false) {
      button_yamete.onclick();
    }
    else {
      window.setTimeout(checkIfStillRunning, 1000);
    }
  });
}

//this is run when the button_ripit is clicked
button_ripit.onclick = function() { //setting isRunning as true
  chrome.storage.local.set({
    isRunning: true
  });
  heading_main.innerHTML = "Running...";
  button_ripit.disabled = true;
  button_yamete.disabled = false;

  var downloadLinkList = [];
  chrome.storage.local.set({downloadLinkList: downloadLinkList}); //setting empty array as dowloadLinkList

  chrome.tabs.query({ //to run the script
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id, {
        file: "scripts/episode_list.js"
      });
  });
  window.setTimeout(checkIfStillRunning, 1000);
}
