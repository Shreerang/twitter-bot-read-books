const Twit = require('twit');

const fs = require("fs");
const contents = fs.readFileSync("books.json");
const Books_List = JSON.parse(contents)

const random_gen = Math.floor(Math.random() * 6) + 1
const book_num = 'book' + random_gen

const welcome_1 = 'Hello Book readers 👋' + ' Once you have read your current book, you might want to read "' + Books_List[book_num].name + '" next! ' + Books_List[book_num].url
const welcome_2 = Books_List[book_num].read ? ' I\'ll also let you on a small secret... My creator @shreerangp ❤️ has also read this book 📚' : ''

T.post('statuses/update', { status: welcome_1 + welcome_2 }, function(err, data, response) {
    console.log(data)
})