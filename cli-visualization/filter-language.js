const columnify = require('columnify');

const filterLanguageVisual = (result) => {
    console.log(columnify(result, {
        columnSplitter: ' | ',
        config: {
            title: {
                align: 'left',
                maxWidth: 60,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
        },
    }));
};

module.exports = {
    filterLanguageVisual,
};
