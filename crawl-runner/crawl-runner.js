/* globals process */
const {
    loadPagesImdb,
    loadPagesTmdb,
} = require('../pages/load-pages');

const {
    deleteEntries,
    initialInsert,
} = require('../db-operations');

const entryPointImdb = 'http://www.imdb.com/search/title?page=';
const mainDomainImdb = 'http://imdb.com';

const entryPointTmdb = 'https://www.themoviedb.org/movie?page=';
const mainDomainTmdb = 'https://www.themoviedb.org';

const runCrawler = async () => {
    process.stdout.write('Started crawling');
    const intervalCrawl = setInterval(() => {
        process.stdout.write('.');
    }, 500);

    try {
        await deleteEntries();
    } catch (err) {
        console.log('Delete error: ');
        console.log(err);
    }

    initialInsert();

    const imdb = loadPagesImdb(mainDomainImdb, entryPointImdb);
    const tmdb = loadPagesTmdb(mainDomainTmdb, entryPointTmdb);
    try {
        await Promise.all([imdb, tmdb]);
        console.log('Finished crawling \n');

        clearInterval(intervalCrawl);

        process.stdout.write('Waiting transactions and queries to finish');

        const intervalQuery = setInterval(() => {
            process.stdout.write('.');
        }, 500);

        setTimeout(() => {
            clearInterval(intervalQuery);
            process.exit();
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    runCrawler,
};
