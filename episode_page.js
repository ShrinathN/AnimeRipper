//this is supposed to only run on episode pages
//it will fire at every ww2.chia-anime.tv/* page, so we'll have to filter
if (document.getElementById("download") != null) {
      var downloadA = document.getElementById("download");
      window.location.href = downloadA.href;
}
