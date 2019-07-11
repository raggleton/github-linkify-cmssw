#!/bin/bash -e
cd ..
pwd
if [ -e github-linkify-cmssw.zip ];then
    rm github-linkify-cmssw.zip
fi

zip github-linkify-cmssw.zip github-linkify-cmssw/manifest.json github-linkify-cmssw/contentscript.js github-linkify-cmssw/images/icon/icon_128.png
cd -