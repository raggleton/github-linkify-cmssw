#github-linkify-cmssw

This Chrome extension turns `#include X` in C/C++ files (and in the future `import X`/`from X import Y` in python configs) into hyperlinks when viewing CMSSW files on Github.com, so you can get to the includes easily. (I don't know why this hasn't been done already.)

## Instructions

1) Download the latest release:

https://github.com/raggleton/github-linkify-cmssw/releases/latest

2) Then install me:

    - Go to [chrome://extensions](chrome://extensions)
    - Drag and drop the `github-linkify-cmssw.crx` package onto the window. Lcick OK when it asks permission to access github.com. This should install it.

## TODO
- [ ] Do for Python `import`/`from X import Y` statements
- [ ] ignore STL/boost libraries (like `<iostream>`)
- [ ] keep the colour of the links to their original colour

Maybe I'll do a Firefox equivalent some day. If I ever get this one done.

Robin Aggleton 2014
