const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FormSchema = new Schema({
    _id: String,
	directors: [{
        name: String,
        id: String
    }],
    directors: Array,
    season_count: String,
    rating: {
        average: String,
        rating_people: String,
        stars: Array
    },
    genres: Array,
    pubdate: Array,
    countries: Array,
    lens_id: Number,
    casts: [{
        name: String,
        id: String
    }],
    title: String,
    site: String,
    poster: String,
    summary: String,
    languages: Array,
    episodes: String,
    writers: [{
        name: String,
        id: String
    }],
    imdb: String,
    year: String,
    duration: String,
    douban_site: String,
    aka: Array    
})

// require 这个模型才能去查询
// 是借助了 mongoose 才实现的
module.exports = Form = mongoose.model("forms", FormSchema)