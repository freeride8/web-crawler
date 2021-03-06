const db = require('../models');
const {
    Movies,
    Directors,
    Languages,
    Genres,
} = db;

const getAllInfo = async () => {
    const output = [];
    try {
        const result = await Movies.findAll({
            include: [{
                    model: Directors,
                    through: {
                        attributes: ['director_id', 'movie_id'],
                    },
                },
                {
                    model: Languages,
                    through: {
                        attributes: ['language_id', 'movie_id'],
                    },
                },
                {
                    model: Genres,
                    through: {
                        attributes: ['genre_id', 'movie_id'],
                    },
                },
            ],
        });

        if (result.length === 0) {
            return null;
        }

        result.forEach((movie, index) => {
            const obj = {
                title: movie.title,
                runtime: movie.runtime,
                rating: movie.rating,
                revenue: movie.revenue,
                directors: [],
                genres: [],
                languages: [],
                provider: movie.provider,
            };

            movie.Directors.forEach((d) => {
                obj.directors.push(d.director);
            });
            movie.Genres.forEach((g) => {
                obj.genres.push(g.genre);
            });
            movie.Languages.forEach((lang) => {
                obj.languages.push(lang.language);
            });
            if (obj.directors.length === 0) {
                obj.directors = 'n/a';
            }
            if (obj.genres.length === 0) {
                obj.genres = 'n/a';
            }
            if (obj.languages.length === 0 || obj.languages[0] === null) {
                obj.languages = 'n/a';
            }
            if (!obj.runtime) {
                obj.runtime = 'n/a';
            }
            if (!obj.revenue) {
                obj.revenue = 'n/a';
            }
            if (!obj.rating) {
                obj.rating = 'n/a';
            }
            output.push(obj);
        });
        return output;
    } catch (err) {
        console.log('Getting all error: ');
        console.log(err);
        return null;
    }
};

module.exports = {
    getAllInfo,
};
