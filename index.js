const yargs = require('yargs');
const columnify = require('columnify');
const {
    getAllInfo,
    filterGenre,
    filterRuntime,
    filterRating,
    filterLanguage,
    searchMovie,
    searchDirector,
    sort,
} = require('./db-operations');
const {
    genres,
} = require('./resources');
const {
    runCrawler,
} = require('./craw-runner/craw-runner');

const argv = yargs.usage('usage: $0 <command>')
    .command('statistics', 'run statistics', (stat) => {
        stat.usage('usage: $0 statistics <command>')
            .command('filter', 'filter entries', (filter) => {
                filter.usage('usage: $0 statistics filter <command>')
                    .command('runtime', 'filter entries by runtime', (runtime) => {
                        runtime.usage('usage: $0 statistics filter runtime')
                            .options({
                                gt: {
                                    describe: 'Grater than',
                                    type: 'number',
                                },
                                lt: {
                                    describe: 'Lower than',
                                    type: 'number',
                                },
                                eq: {
                                    describe: 'Equals',
                                    type: 'number',
                                },
                            })
                            .conflicts('gt', ['lt', 'eq'])
                            .conflicts('lt', ['gt', 'eq'])
                            .conflicts('eq', ['lt', 'gt'])
                            .help('h')
                            .alias('h', 'help');
                    }, (args) => {
                        let result;
                        if (args.gt) {
                            result = filterRuntime('greater', args.gt);
                        } else if (args.lt) {
                            result = filterRuntime('lower', args.lt);
                        } else if (args.eq) {
                            result = filterRuntime('equals', args.eq);
                        } else {
                            console.log('Not valid option');
                            return;
                        }
                        result.then((res) => {
                            console.log(columnify(res, {
                                columnSplitter: ' | ',
                                config: {
                                    title: {
                                        align: 'center',
                                        maxWidth: 60,
                                        headingTransform: (heading) => {
                                            return '***' +
                                                heading.toUpperCase() +
                                                '***';
                                        },
                                    },
                                    runtime: {
                                        align: 'center',
                                        headingTransform: (heading) => {
                                            return '***' +
                                                heading.toUpperCase() +
                                                '***';
                                        },
                                    },
                                },
                            }));
                        });
                    }).command('rating', 'filter entries by rating', (rating) => {
                        rating.usage('usage: $0 statistics filter rating')
                            .options({
                                gt: {
                                    describe: 'Grater than',
                                    type: 'number',
                                },
                                lt: {
                                    describe: 'Lower than',
                                    type: 'number',
                                },
                                eq: {
                                    describe: 'Equals',
                                    type: 'number',
                                },
                            })
                            .conflicts('gt', ['lt', 'eq'])
                            .conflicts('lt', ['gt', 'eq'])
                            .conflicts('eq', ['lt', 'gt']);
                    }, (args) => {
                        let result;
                        if (args.gt) {
                            result = filterRating('greater', args.gt);
                        } else if (args.lt) {
                            result = filterRating('lower', args.lt);
                        } else if (args.eq) {
                            result = filterRating('equals', args.eq);
                        } else {
                            console.log('Not valid option');
                            return;
                        }
                        result.then((res) => {
                            console.log(columnify(res, {
                                columnSplitter: ' | ',
                                config: {
                                    title: {
                                        align: 'center',
                                        maxWidth: 60,
                                        headingTransform: (heading) => {
                                            return '***' +
                                                heading.toUpperCase() +
                                                '***';
                                        },
                                    },
                                    rating: {
                                        align: 'center',
                                        headingTransform: (heading) => {
                                            return '***' +
                                                heading.toUpperCase() +
                                                '***';
                                        },
                                    },
                                },
                            }));
                        });
                    }).command('language', 'filter entries by language', (lang) => {
                        lang.usage('usage: $0 statistics filter language [name]')
                            .options({
                                name: {
                                    describe: 'Language name',
                                    type: 'string',
                                    demandOption: true,
                                    alias: 'n',
                                },
                            })
                            .help('h')
                            .alias('h', 'help');
                    }, (args) => {
                        let result;
                        if (args.name) {
                            result = filterLanguage(args.name);
                        } else {
                            console.log('Not valid option');
                            return;
                        }
                        result.then((res) => {
                            console.log(columnify(res, {
                                columnSplitter: ' | ',
                                config: {
                                    title: {
                                        align: 'center',
                                        maxWidth: 60,
                                        headingTransform: (heading) => {
                                            return '***' +
                                                heading.toUpperCase() +
                                                '***';
                                        },
                                    },
                                },
                            }));
                        });
                    }).command('genre', 'filter entries by genre', (genre) => {
                        genre.usage('usage: $0 statistics filter genre [name]')
                            .options({
                                name: {
                                    describe: 'Genre name',
                                    type: 'string',
                                    demandOption: true,
                                    alias: 'n',
                                    choices: genres,
                                },
                            })
                            .help('h')
                            .alias('h', 'help');
                    }, (args) => {
                        let result;
                        if (args.name) {
                            result = filterGenre(args.name);
                        } else {
                            console.log('Not valid option');
                            return;
                        }
                        result.then((res) => {
                            console.log(columnify(res, {
                                columnSplitter: ' | ',
                                config: {
                                    title: {
                                        align: 'center',
                                        maxWidth: 60,
                                        headingTransform: (heading) => {
                                            return '***' +
                                                heading.toUpperCase() +
                                                '***';
                                        },
                                    },
                                },
                            }));
                        });
                    });
            }).command('search', 'search entries', (search) => {
                search.usage('usage: $0 statistics search [option]')
                    .options({
                        director: {
                            describe: 'Seacrh for a director',
                            type: 'string',
                            alias: 'd',
                        },
                        movie: {
                            type: 'string',
                            alias: 'm',
                        },
                    })
                    .conflicts('director', 'movie')
                    .help('h')
                    .alias('h', 'help');
            }, (args) => {
                let result;
                if (args.director) {
                    result = searchDirector(args.director);
                } else if (args.movie) {
                    result = searchMovie(args.movie);
                } else {
                    console.log('Not valid option');
                    return;
                }
                result.then((res) => {
                    console.log(columnify(res, {
                        preserveNewLines: true,
                        config: {
                            title: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            runtime: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            rating: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            revenue: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            directors: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            genres: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            languages: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                        },
                        columnSplitter: ' | ',
                    }));
                });
            }).command('sort', 'sort entries', (sorts) => {
                sorts.usage('usage: $0 statistics sort [option]')
                    .options({
                        by: {
                            describe: 'Sort by',
                            type: 'string',
                            alias: 'b',
                            demandOption: true,
                            choices: ['revenue', 'rating', 'runtime', 'title'],
                        },
                        order: {
                            describe: 'Sort by ascending/descending' +
                                 'order. By default it is descending.',
                            type: 'string',
                            alias: 'o',
                            choices: ['asc', 'desc'],
                        },
                    })
                    .help('h')
                    .alias('h', 'help');
            }, (args) => {
                let result;
                if (!args.by) {
                    console.log('Not valid option.');
                    return;
                }
                if (args.order) {
                    result = sort(args.by, args.order);
                } else {
                    result = sort(args.by);
                }
                result.then((res) => {
                    console.log(columnify(res, {
                        preserveNewLines: true,
                        config: {
                            title: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            runtime: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            rating: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                            },
                            revenue: {
                                align: 'center',
                                headingTransform: (heading) => {
                                    return '***' +
                                        heading.toUpperCase() +
                                        '***';
                                },
                                dataTransform: (data) => {
                                    if (data !== 'n/a') {
                                        return '$' + data;
                                    }
                                    return data;
                                },
                            },
                        },
                        columnSplitter: ' | ',
                    }));
                });
            });
    })
    .command('get-all', 'Get all available information', (all) => {
        all.usage('usage: $0 get-all')
            .help('h')
            .alias('h', 'help');
    }, (args) => {
        getAllInfo().then((res) => {
            console.log(columnify(res, {
                preserveNewLines: true,
                config: {
                    title: {
                        align: 'center',
                        headingTransform: (heading) => {
                            return '***' +
                                heading.toUpperCase() +
                                '***';
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
                            return '***' +
                                heading.toUpperCase() +
                                '***';
                        },
                    },
                    directors: {
                        align: 'center',
                        headingTransform: (heading) => {
                            return '***' +
                                heading.toUpperCase() +
                                '***';
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
                            return '***' +
                                heading.toUpperCase() +
                                '***';
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
                            return '***' +
                                heading.toUpperCase() +
                                '***';
                        },
                    },
                },
                columnSplitter: ' | ',
            }));
        });
    })
    .command('update', 'Get the info and insert it into the DB', (update) => {
        update.usage('usage: $0 update')
            .help('h')
            .alias('h', 'help');
    }, async (args) => {
        await runCrawler();
    })
    .demandCommand(1)
    .version(false)
    .help('h')
    .alias('h', 'help')
    .wrap(null)
    .argv;
