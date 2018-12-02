var ripit = document.getElementById("ripit");
var say = document.getElementById('say');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.todo == "bob")
  {
    say.innerHTML = request.bob[2];
  }
});

ripit.onclick = function()
{
  chrome.runtime.sendMessage({todo: "sendbob"});
};
