#github-linkify-cmssw

This Chrome extension turns `#include X` in C/C++ files, and `import X`/`from X import Y`/`process.load(XXX.YYY.ZZZ_cff)` in python config files, into hyperlinks when viewing CMSSW files on Github.com, so you can get to the includes easily. It works on the central repo AND your forks. (I don't know why this hasn't been done already.)

C++ bonus: it even adds links to the related src files (if they exist).

## Instructions

1) Download the latest release:

https://github.com/raggleton/github-linkify-cmssw/releases/latest

2) Go to [chrome://extensions](chrome://extensions)

3) Drag and drop the `github-linkify-cmssw.crx` package onto the window. Click OK when it asks permission to access github.com. This should install it.

Maybe I'll do a Firefox equivalent some day. If I ever get this one done.

## Instructions for developers

1) Clone this repo.

2) Go to chrome://extensions

3) If you installed the extension from the crx package above, remove it (hit the little bin icon next to it) or disable it.

4) Enable Developer Mode by ticking the box in the top right of the page.

5) Hit "Load unpacked extension..." and navigate to the folder into which you cloned.

6) This should add the extension at the top of the list of extensions.

7) You can now edit make edits. Everything is done in [contentscript.js](contentscript.js). The [manifest.json](manifest.json) file declares the extension to Chrome, with options about name, version number, page permissions, etc.

8) Once you've made your edits, hit the Reload button below the extension (or ctrl/cmd+R on the chrome://extensions page) and reload your cmssw page to see your work in action!

## TODO/Ideas

- use github API?
- options page to add loacation of headers for non-CMSSW repos?
- or auto lookup - e.g. if #include "myEvent.h" link to same folder/myEvent.h, or #include "../myObj.h" link to ../myObj.h ?
- options page? (keyboard shortcut, etc)
- allow you to custom define where header files are?
- if on a header page, add link to src file!

Robin Aggleton 2014
