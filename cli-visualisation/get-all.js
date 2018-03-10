const columnify = require('columnify');

const getAllVisual = (result) => {
    console.log(columnify(result, {
        preserveNewLines: true,
        config: {
            title: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            runtime: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
                },
            },
            rating: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
                },
            },
            revenue: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            directors: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
                dataTransform: (data) => {
                    if (data.indexOf(',') !== -1) {
                        return data.split(',').join(', ');
                    }
                    return data;
                },
            },
            genres: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
                dataTransform: (data) => {
                    if (data.indexOf(',') !== -1) {
                        return data.split(',').join(', ');
                    }
                    return data;
                },
            },
            languages: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
        },
        columnSplitter: ' | ',
    }));
};

module.exports = {
    getAllVisual,
};
