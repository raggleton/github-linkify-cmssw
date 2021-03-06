# github-linkify-cmssw

This Chrome extension turns `#include X` in C/C++ files, and `import X`/`from X import Y`/`process.load(XXX.YYY.ZZZ_cff)` in python config files, into hyperlinks when viewing CMSSW files on Github.com, so you can get to the includes easily. It works on the central repo AND your forks.

C++ bonus: it even adds links to the related src files (if they exist).

## Demo

### C++ file:
![Demo of c++ features](cpp.gif?raw=true)

### Python config
![Demo of python features](py.gif?raw=true)

## Install

Get it here: [Chrome web store](https://chrome.google.com/webstore/detail/github-linkify-for-cmssw/dfhloocknejlnadfgmkceikaaidgmndk)


### Manual installation instructions if you can't use the web store

1) Download the latest release:

https://github.com/raggleton/github-linkify-cmssw/releases/latest

You will have to hit "Continue" in your downloads bar. Note that it may say "Extensions cannot be installed from this website". That's fine.

2) Go to [chrome://extensions](chrome://extensions)

3) Drag and drop the `github-linkify-cmssw.crx` package onto the window. Click OK when it asks permission to access github.com. This should install it.


## Install for developers

1) Clone this repo.

2) Go to `chrome://extensions`

3) If you installed the extension from the crx package above, remove it (hit the little bin icon next to it) or disable it.

4) Enable Developer Mode by ticking the box in the top right of the page.

5) Hit "Load unpacked extension..." and navigate to the folder into which you cloned.

6) This should add the extension at the top of the list of extensions.

7) You can now edit make edits. Everything is done in [contentscript.js](contentscript.js). The [manifest.json](manifest.json) file declares the extension to Chrome, with options about name, version number, page permissions, etc.

8) Once you've made your edits, hit the Reload button below the extension (or ctrl/cmd+R on the `chrome://extensions` page) and reload your CMSSW page to see your work in action!

### Package extension into CRX file

This is required whenever a new release is made

1) Go to `chrome://extensions`

2) Click "Pack extension..."

3) Select your `github-linkify-cmssw` directory

4) Select private key. This will be generated the first time you package an extension. See https://developer.chrome.com/extensions/packaging

5) This will output a CRX file

### Making a new release

1) First make a tag:

```
git tag -a <tagname> -m <brief description> <commit hash>
git push origin --tags
```

2) Then navigate to https://github.com/raggleton/github-linkify-cmssw/releases, click "Draft a new release"

3) Choose your new tag, enter title and description

4) Attach the new CRX file

5) Hit "Publish release"

## TODO/Ideas

- if on a header page, add link to src file!
- detect if file is PY or CPP from file extension in URL (easy), then customise looping e.g. for C++ stop once you've hit a non-comment line that doens't have include in it
- testing URL: STOP once you've found a succcessful one
- bug: only works on reload?
- Maybe I'll do a Firefox equivalent some day.

Robin Aggleton 2019
