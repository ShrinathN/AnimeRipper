//will only run on download pages
//first it must acertain if its okay to run
//
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "goToPage") {
    window.location.href = request.data;
  }
});
// do {
  var greenButtons = document.getElementsByClassName("bttn green");
  var downloadLink = greenButtons[0].href;
// } while (greenButtons[0] != undefined);
chrome.runtime.sendMessage({
  todo: "addDownloadLink",
  data: downloadLink
});
chrome.runtime.sendMessage({
  todo: "whatIsNextPage"
});
