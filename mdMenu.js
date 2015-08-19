var fs = require('fs');

var config = {
    source: 'README.md',
    destination: 'README.md',
    cascade: true,
    firstLevel: 2,
    menuTitle: '## Table of Contents',
    placeholder: '<!--mdMenu-->'
};

fs.readFile(config.source, function(err, data) {
    if (err) throw err;

    // All headers in document
    var headerRegexp = /#{1,6}\s.+/g;
    // Placeholders with/without menu
    var menuRegexp = new RegExp(config.placeholder + '[\\s\\S]*' + config.placeholder);

    var content = data.toString();
    var headersArr = content.match(headerRegexp);

    var res = '';

    if (headersArr === null || !headersArr.length) {
        console.log('No headers were found.');
        return;
    }

    // Remove title of menu from menu (config.menuTitle)
    headersArr = headersArr.filter(function(header){
        return header !== config.menuTitle;
    });

    // todo: optimize
    headersArr = headersArr.map(function(header) {
        var tabs = '';
        var link;

        if (config.cascade) {
            // Detect level of header
            var level = (header.match(/#/g) || []).length;
            // Save tabs if needed
            tabs = new Array(level - config.firstLevel + 1).join('\t') + '* ';
        }

        // Remove unnecessary symbols (#) and trim the string.
        header = header.replace(/#{1,6}\s/g, '').trim();
        link = '#' + header.replace(/[&\/]/g, '').replace(/\s/g, '-').toLowerCase()

        return tabs + '[' + header + '](' + link + ')';
    });

    if (content.indexOf(config.placeholder) !== -1) {
        res = content.replace(menuRegexp, config.placeholder + '\r\n' + config.menuTitle + '\r\n' + headersArr.join('\r\n') + '\r\n' + config.placeholder);
    } else {
        res = config.menuTitle + '\r\n' + headersArr.join('\r\n') + '\r\n\r\n' + content;
    }


    fs.writeFile(config.destination, res, function (err) {
        if (err) throw err;

        console.log('It\'s saved!');
    });
});