//this is supposed to only run on episode pages
//it will fire at every ww2.chia-anime.tv/* page, so we'll have to filter
chrome.runtime.sendMessage({
  todo: "canIRun"
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.todo == "yesCanRun") //will only run if this message is received, main stuff is here
      {
        var downloadA = document.getElementById("download");
        window.location.href = downloadA.href;
      } else {
        alert("WANT TO RUN CAN'T WAAAHH\n\n\t-tepisode_page.js");
      }
    }
