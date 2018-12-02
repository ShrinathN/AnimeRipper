//will only run on download pages
//first it must acertain if its okay to run
//

chrome.runtime.sendMessage({
  todo: "canIRun"
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.todo == "yesCanRun") //will only run if this message is received, main stuff is here
      {
        var downloadLink;
        var greenButtons = document.getElementsByClassName("bttn green");
        downloadLink = greenButtons[0].href;
        chrome.runtime.sendMessage({
          todo: "addDownloadLink",
          data: downloadLink
        });
        chrome.runtime.sendMessage({
          todo: "whatIsNextPage"
        });
      } else if (request.todo == "noCannotRun") {
        alert("WANT TO RUN CAN'T WAAAHH\n\n\t-tdownload_page.js");
      }
      if (request.todo == "goToPage") {
        window.location.href = request.data;
      }
    }
