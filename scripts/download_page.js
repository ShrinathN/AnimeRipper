//will only run on download pages
//first it must acertain if its okay to run

//will setup the onMessage actions
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "goToPage") { //will go to a page, if told to
    window.location.href = request.data;
  } else if (request.todo == "writeData") { //this is used in the end when all the links are to be displayed
    document.write(request.data);
  } else if (request.todo == "yesCanRun") { //runs when the background script sends the yesCanRun message
    window.setTimeout(ripLink, 1000); //runs after 1 second to let the browser decode the download link, its obfuscated using a javascript function
  } else if (request.todo == "noCannotRun") { //when the background script refuses to allow this script to run
    console.log("Not permitted to run");
  }
});


//this function runs for the first time when the yesCanRun message is received
function ripLink() {
  var greenButtons = document.getElementsByClassName("bttn green"); //this is the
  if (greenButtons == undefined) { //probably means page hasn't finished loading
    window.setTimeout(ripLink, 1000); //execute itself again 1 second later
    return; //exit
  }
  var downloadLink = []; //setting download link as empty array
  var counter; //this will keep act as a counter for all the green download buttons
  for (counter = 0; counter < greenButtons.length; counter++) {
    downloadLink.push(greenButtons[counter].href);
  }

  //sends the download links list
  chrome.runtime.sendMessage({
    todo: "addDownloadLink",
    data: downloadLink
  });
  //asks for the next page to go to
  chrome.runtime.sendMessage({
    todo: "whatIsNextPage"
  });
}

//asks if it can run, starting the operation of the script
chrome.runtime.sendMessage({
  todo: "canIRun"
});
