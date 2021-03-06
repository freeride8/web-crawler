const {
    extractPageUrlsImdb,
    extractPageUrlsTmdb,
} = require('./extract-pages-urls');
const {
    loadMoviesImdb,
    loadMoviesTmdb,
} = require('../movies/load-movies');

const loadPagesImdb = async (mainDomain, entryPoint) => {
    const pages = 2;
    const arr = [];

    try {
        await Promise.all(
            Array.from({
                length: pages,
            })
            .map((value, index) => {
                const url = entryPoint + (index + 1) +
                    '&ref_=adv_nxt&view=simple&sort=num_votes,desc';
                return extractPageUrlsImdb(url).then((res) => {
                    res.forEach((el) => {
                        arr.push(el);
                    });
                });
            })
        );
        return loadMoviesImdb(mainDomain, arr);
    } catch (err) {
        console.log('Loading IMDB movies');
        console.log(err);
        return loadMoviesImdb(mainDomain, arr);
    }
};

const loadPagesTmdb = async (mainDomain, entryPoint) => {
    const pages = 5;
    const arr = [];

    try {
        await Promise.all(
            Array.from({
                length: pages,
            })
            .map((value, index) => {
                const url = entryPoint + (index + 1);
                return extractPageUrlsTmdb(url).then((res) => {
                    res.forEach((el) => {
                        arr.push(el);
                    });
                });
            })
        );
        return loadMoviesTmdb(mainDomain, arr);
    } catch (err) {
        console.log('Loading TMDB movies');
        console.log(err);
        return loadMoviesImdb(mainDomain, arr);
    }
};

module.exports = {
    loadPagesImdb,
    loadPagesTmdb,
};
