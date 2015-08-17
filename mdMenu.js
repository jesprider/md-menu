var fs = require('fs');

var config = {
    target: 'README.md',
    cascade: true,
    firstLevel: 2,
    menuTitle: '## Table of Contents',
    placeholder: '<!--[mdMenu]-->'
};

fs.readFile(config.target, function(err, data) {
    if (err) throw err;

    var regexp = /#{1,6}\s[^\r\n|\r|\n]+/g;
    var source = data.toString();
    var headersArr = source.match(regexp);
    var res = '';

    if (headersArr === null || !headersArr.length) {
        console.log('No headers were found.');
        return;
    }

    // todo: optimize
    headersArr = headersArr.map(function(header) {
        var tabs = '';

        if (config.cascade) {
            // Detect level of header
            var level = (header.match(/#/g) || []).length;
            // Save tabs if needed
            tabs = new Array(level - config.firstLevel + 1).join('\t') + '* ';
        }

        // Remove unnecessary symbols (#) and trim the string.
        header = header.replace(/#{1,6}\s/g, '').trim();

        return tabs + '[' + header + '](#' + header.replace(/&|\//g, '').replace(/\s/g, '-').toLowerCase() + ')';
    });

    if (source.indexOf(config.placeholder) !== -1) {
        res = source.replace(config.placeholder, config.menuTitle + '\r\n' + headersArr.join('\r\n'));
    } else {
        res = config.menuTitle + '\r\n' + headersArr.join('\r\n') + '\r\n\r\n' + source;
    }


    fs.writeFile('content.md', res, function (err) {
        if (err) throw err;

        console.log('It\'s saved!');
    });
});