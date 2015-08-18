var fs = require('fs');

var config = {
    target: 'README.md',
    cascade: true,
    firstLevel: 2,
    menuTitle: '## Table of Contents',
    placeholder: '<!--mdMenu-->'
};

fs.readFile(config.target, function(err, data) {
    if (err) throw err;

    // todo: remove menuTitle from the menu
    var regexp = /#{1,6}\s.+/g;
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
        var comment = new RegExp(config.placeholder + '\\s[\\s\\S]*' + config.placeholder);

        res = source.replace(comment, config.placeholder + '\r\n' + config.menuTitle + '\r\n' + headersArr.join('\r\n') + '\r\n' + config.placeholder);
    } else {
        res = config.menuTitle + '\r\n' + headersArr.join('\r\n') + '\r\n\r\n' + source;
    }


    fs.writeFile('README.md', res, function (err) {
        if (err) throw err;

        console.log('It\'s saved!');
    });
});