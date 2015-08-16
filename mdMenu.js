var fs = require('fs');

var config = {
    target: 'styleguide.md',
    cascade: true,
    firstLevel: 2
};

fs.readFile(config.target, function(err, data) {
    if (err) throw err;

    var regexp = /#{1,6}\s[^\r\n|\r|\n]+/g;
    var headersArr = data.toString().match(regexp);

    // todo: optimize
    headersArr = headersArr.map(function(header) {
        var tabs = '';

        if (config.cascade) {
            // Detect level of header
            var level = (header.match(/#/g) || []).length;
            // Save tabs if needed
            tabs = new Array(level - config.firstLevel + 1).join('\t');
        }

        // Remove unnecessary symbols (#) and trim the string.
        header = header.replace(/#{1,6}\s/g, '').trim();

        return tabs + '* [' + header + '](#' + header.replace(/&|\//g, '').replace(/\s/g, '-').toLowerCase() + ')';
    });

    fs.writeFile('test.md', headersArr.join('\r\n'), function (err) {
        if (err) throw err;

        console.log('It\'s saved!');
    });
});