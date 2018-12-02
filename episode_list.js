var box2 = document.getElementsByClassName("box2");
var linksArray = [];
for(var i = 0; i < box2.length; i++){
  linksArray.push(box2[i].children[1].children[1].children[0].href);
}
chrome.runtime.sendMessage({todo: "linksArray", data: linksArray});
