//will only run on download pages
//first it must acertain if its okay to run

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "goToPage") {
    alert("WHOO");
    window.location.href = request.data;
  }
});


window.setTimeout(ripLink, 1000);

function ripLink() {
  var greenButtons = document.getElementsByClassName("bttn green");
  var downloadLink = greenButtons[0].href;
  chrome.runtime.sendMessage({
    todo: "addDownloadLink",
    data: downloadLink
  });
}
