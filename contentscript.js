// console.log("Debugging github-linkify-cmssw");

// the lines of code are stored in a table
table = document.getElementsByClassName("js-file-line-container")[0];

// get current page URL
// better way to do this?
url = table.baseURI;

// make root URL, i.e. up to & including CMSSW_X_Y_Z_AAA, or tag hash
// note, be careful as can have URLs in diff formats:
// github.com/cms-sw/cmssw/blob/CMSSW_7_2_X/DataFormats/JetReco/interface/GenJetCollection.h
// with CMSSW_1_2_3, CMSSW_1_2_X, CMSSW_1_2_3_SHLC_fixTk, etc,
// or
// github.com/cms-sw/cmssw/blob/975...a78/DataFormats/JetReco/interface/GenJetCollection.h
var cmssw_pattern = /.*\/cmssw\/blob\/[_a-zA-Z0-9]*?\//;
var rootURL = "";
cmssw = cmssw_pattern.exec(url)[0];
rootURL = url.substr(0, url.search(cmssw_pattern)+cmssw.length);
// console.log("URL: " + rootURL);

// pattern to do #include matching
var cpp_pattern = /#include/;
var cpp_header_pattern = /[<\"].*[>\"]/; // does "myheader.h" or <myheader.h>

// pattern to do python matching
var py_pattern1 = /from\s.*\simport\s.*/;
var py_pattern2 = /import.*as.*/;
var py_pattern3 = /import/;
var py_pattern4 = /process.load(.*)/;

// loop through all rows <tr>
var rows = document.getElementsByTagName("tr");
for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].childNodes.length; j++) {

        // check it's a line of the file, not anything else
        var file_line_pattern = /js-file-line/;
        var cell = rows[i].childNodes[j];
        if (file_line_pattern.test(cell.className)) {
            var line = cell.textContent;

            // check line has a C++ #include, if so pull the header path
            // ensure it has a ".h", and a "/", to exclude STL
            if (cpp_pattern.test(line) && (/\.h/.test(line)) && (/\//.test(line))) {
                var path = cpp_header_pattern.exec(line)[0];
                path = path.replace(/[<>\"]/g,""); //g inmportant - global so replaces all instances
                var link = rootURL.concat(path);

                // get color of original text by getting class name of <span> or <td> tag that houses it,
                // then ask style sheet for color attribute for that class
                var header_class = "";
                for (var k = 0; k < cell.childNodes.length; k++) {
                    if (cell.childNodes[k].textContent.indexOf(path) != -1) {
                        header_class = cell.childNodes[k].className;
                    }
                }
                if (!header_class){
                    header_class = cell.className.split(" ")[0];
                }

                var color = window.getComputedStyle(document.querySelector("."+header_class)).getPropertyValue("color");

                // let's replace the text with a link
                // keep same colour as before, but underline it to make it noticeable for user
                cell.innerHTML = cell.innerHTML.replace(path, "<a href=\""+link+"\" style=\"text-decoration:underline;color:"+color+"\">"+path+"</a>"); // <font color=\"#df5000\">
            }

            // tests for python imports/fragments
            var config = "";
            if (py_pattern1.test(line)) {
                config = line.replace(/from\s/,"");
                config = config.replace(/\simport.*/,"");
            } else if (py_pattern2.test(line)) {
                config = line.replace(/import\s/,"");
                config = config.replace(/\sas\s.*/,"");
            } else if (py_pattern3.test(line)) {
                config = line.replace(/import\s/,"");
            } else if (py_pattern4.test(line)) {
                config = line.replace("process.load(","");
                config = config.replace(")","");
            }

            // if we have a valid python config, turn it into a path
            // ensure it has a / in it so it isn't a 3rd party library
            if (config != "" && (/\./.test(config))) {
                config = config.replace(/['"]/g,"");
                var path = config.replace(/\./g,"/");
                var parts = path.split("/");
                path = path.replace(parts[parts.length-1],"python/"+parts[parts.length-1]+".py")
                var link = rootURL.concat(path)

                // get color of original text by getting class name of <span> or <td> tag that houses it,
                // then ask style sheet for color attribute for that class
                // should probably put this as a function since we do the same for py and c++
                var header_class = "";
                for (var k = 0; k < cell.childNodes.length; k++) {
                    if (cell.childNodes[k].textContent.indexOf(config) != -1) {
                        header_class = cell.childNodes[k].className;
                    }
                }
                if (!header_class){
                    header_class = cell.className.split(" ")[0];
                }
                var color = window.getComputedStyle(document.querySelector("."+header_class)).getPropertyValue("color");

                // let's replace the text with a link
                // keep same colour as before, but underline it to make it noticeable for user
                cell.innerHTML = cell.innerHTML.replace(config, "<a href=\""+link+"\" style=\"text-decoration:underline;color:"+color+"\">"+config+"</a>");
            }
        }
    }
}
