// the lines of code are stored in a table
table = document.getElementsByClassName("js-file-line-container")[0];

// get current page URL
url = table.baseURI;
// make root URL, i.e. only up to CMSSW_*
var pattern = /CMSSW_[0-9]_[0-9]_[0-9]_[A-Za-z0-9]*/;
cmssw = pattern.exec(url)[0]; // gives us the CMSSW name
rootURL = url.substr(0, url.search(pattern)+cmssw.length+1);
// console.log("URL: " + rootURL);

// pattern to do #include matching
var cpp_pattern = /#include/;
var cpp_header_pattern = /[<\"].*[>\"]/; // does "myheader.h" or <myheader>

// pattern to do python matching
var py_pattern1 = /import/;
var py_pattern2 = /from\s.*\simport\s.*/; // might not need this one
var py_pattern3 = /import.*as.*/;
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
            // TODO: check it's not a STL include, like iostream
            if (cpp_pattern.test(line)) {
                var path = cpp_header_pattern.exec(line)[0];
                path = path.replace(/[<>\"]/g,""); //g inmportant - global so replaces all instances
                var link = rootURL.concat(path);

                // let's replace the text with a link
                // TODO keep same styling as before
                for (var k = 0; k < cell.childNodes.length; k++) {
                    if (cell.childNodes[k].textContent.indexOf(path) != -1) {
                        var cell_html = cell.childNodes[k].innerHTML;
                        cell.childNodes[k].innerHTML = cell_html.replace(path, "<a href=\""+link+"\">"+path+"</a>");
                    }
                }
            }
            // TODO test for python
        }
    }
}
