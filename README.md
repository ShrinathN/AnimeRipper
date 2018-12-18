# AnimeRipper
Rips direct download (.mp4) links from chia anime.


## Installation :

This project is a chrome extension so it should work on Linux, Windows, and OSX all the same.

1. Clone this repo using one of the methods below

	1. **(RECOMMENDED)** Use this link to download the zip file, and unzip it.
  **[CLICK HERE TO DOWNLOAD](https://github.com/ShrinathN/AnimeRipper/archive/master.zip)**

	2. Second way to do this, use the below command if you're familiar with the use of a terminal, and have git installed, this is the command.

```
git clone http://github.com/ShrinathN/AnimeRipper
```

2. Open Chrome and browse to your extensions page. Just copy paste this (**chrome://extensions/**) in the URL bar if you don't know how to do that.

3. On the right upper corner there should be a switch saying _**"Developer mode"**_, turn that switch on.

4. Three new buttons should pop up in the left upper corner, the leftmost should say _**"Load unpacked"**_, click on it.

5. A folder selection prompt should open, browse to and select the folder which was created when you extracted the zip file.

That's it, the extension should be installed now

## Usage :

Make sure you're **not** using any ad blockers or JavaScript blockers, or this extension will not work. If you are, please disable them when you're using this plugin.

1. Browse to the main page of an anime on chia-anime.tv. The main page is where all the episodes of an anime are listed.

2. Click on the extension, a simple popup with two buttons should open. Click on the _**RIP**_ button.

3. Your browser should begin visiting different pages now, do not be alarmed, this is normal. Sit back for a minute or two, do not browse any other page (sorry, this is a shortcoming, but it will be fixed in the future updates)

4. Viola, you are presented with a list of .mp4 file links, you can download them using _wget_ or _curl_ or _aria2c_, I leave that upto you.

## Changelog :

### v1.2.1

* Added changelog
* Made the running status label dynamic
* Fixed mirror sorting

### v1.2

* Fixed storage bug
* Added sort by different mirrors feature
* Added logo

### v1.1

* Added a run check for content scripts (so that they don't run every time)
* Added CSS, looks better now
* Made the download page content script more robust

### v1.0

* Can rip anime .mp4 links off chia-anime
