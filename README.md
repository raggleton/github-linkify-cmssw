#github-linkify

This Chrome extension turns `#include X` in C/C++ files (and in the future `import X`/`from X import Y` in python configs) into hyperlinks when viewing CMSSW files on Github.com, so you can get to the includes easily. (I don't know why this hasn't been done already.)

## Instructions

1) First clone me:
```
git clone git@github.com:raggleton/github-linkify.git
```
2) Then install me:
    - go to `chrome://extensions`
    - drag and drop the `github-linkify.crx` package onto the window. This should install it. (not tested, please feedback)

## TODO
- [ ] Do for Python `import`/`from X import Y` statements
- [ ] ignore STL/boost libraries (like `<iostream>`)
- [ ] keep the colour of the links to their original colour

Maybe I'll do a Firefox equivalent some day. If I ever get this one done.

Robin Aggleton 2014
