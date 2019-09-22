const Twit = require('twit');

const fs = require("fs");
const contents = fs.readFileSync("books.json");
const Books_List = JSON.parse(contents)


const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
    timeout_ms: 60*1000,
})

var stream = T.stream('statuses/filter', { track: 'currently reading' })

stream.on('tweet', function (tweet) {
    const random_gen = Math.floor(Math.random() * 10) + 1
    const book_num = 'book' + random_gen
    
    let response1 = 'Hello @' + tweet.user.screen_name + ' 👋' + ' You might want to read "' + Books_List[book_num].name + '" next! ' + Books_List[book_num].url
    let response2 = Books_List[book_num].read ? 'I\'ll also let you on a small secret... My creator @shreerangp has also read this book' : ''

    T.post('statuses/update', {
        status: response1 + ' ' + response2,
        in_reply_to_status_id: tweet.id_str
    }, function(err, data, response) {
        console.log('Bot responded!!!\n')
    });
})

// const flp_track_id = 'patwardha';
// const flp_token = '39616cbf9c3f4f24b31c047ebfed3c36';

// let flp_book_query = 'https://affiliate-api.flipkart.net/affiliate/1.0/booksFeeds/' + flp_track_id + '/category/bks-97s.json'


// T.get('account/verify_credentials', { skip_status: true })
//   .catch(function (err) {
//     console.log('caught error', err.stack)
//   })
//   .then(function (result) {
//     console.log('All good!')
//   })