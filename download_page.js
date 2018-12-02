//will only run on download pages
//first it must acertain if its okay to run

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "goToPage") {
    window.location.href = request.data;
  }
  else if (request.todo == "writeData") {
    document.write(request.data);
  }
});


window.setTimeout(ripLink, 1000); //runs after 1 second to let the browser decode the download link, its obfuscated

function ripLink() {
  var greenButtons = document.getElementsByClassName("bttn green");
  if(greenButtons == undefined) //probably means page hasn't finished loading
  {
    window.setTimeout(ripLink, 1000); //execute itself again 1 second later
    return; //exit
  }
  var downloadLink = greenButtons[0].href;
  chrome.runtime.sendMessage({
    todo: "addDownloadLink",
    data: downloadLink
  });
  chrome.runtime.sendMessage({
    todo: "whatIsNextPage"
  });
}
