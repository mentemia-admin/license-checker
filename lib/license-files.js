var path = require('path');

var BASENAMES_PRECEDENCE = [
    /^LICENSE$/,
    /^LICENSE\-\w+$/, // e.g. LICENSE-MIT
    /^MIT\-LICENSE$/, // e.g. MIT-LICENSE *** NOTE: Hard coded MIT-LICENSE here to solve the Multi-License problem e.g. choose MIT instead of GPL
    /^LICENCE$/,
    /^LICENCE\-\w+$/, // e.g. LICENCE-MIT
    /^\w+\-LICENCE$/, // e.g. MIT-LICENCE
    /^COPYING$/,
    /^README$/,
];


// Find and list license files in the precedence order
module.exports = function(dirFiles) {
    var files = [];
    BASENAMES_PRECEDENCE.forEach(function(basenamePattern) {
        var found = false;
        dirFiles.forEach(function(filename) {
            if (!found) {
                var basename = path.basename(filename, path.extname(filename)).toUpperCase();
                if (basenamePattern.test(basename)) {
                    files.push(filename);
                    found = true;
                }
            }
        });
    });
    return files;
};
