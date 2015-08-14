var fs = require('fs');
var mdTarget = 'styleguide.md';

fs.readFile(mdTarget, function(err, data) {
    if (err) throw err;

    var reg = /#{1,6}\s[^\r\n|\r|\n]+/g;
    var headersArr = data.toString().match(reg);
    var res = '';

    // todo: optimize
    headersArr = headersArr.map(function(h) {
        return '[' + h + '](#' + h.replace(/#{1,6}|&/g, '').trim().replace(/\s/g, '-').toLowerCase() + ')';
    });

    fs.writeFile('test.md', headersArr.join('\n'), function (err) {
        if (err) throw err;

        console.log('It\'s saved!');
    });
});