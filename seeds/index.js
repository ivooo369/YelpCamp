const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63e55df637d1fab58a540dd1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dprh57lps/image/upload/v1676565963/YelpCamp/qivbrkh4g0ewvawkspca.jpg',
                    filename: 'YelpCamp/qivbrkh4g0ewvawkspca'
                },
                {
                    url: 'https://res.cloudinary.com/dprh57lps/image/upload/v1676565962/YelpCamp/rrjuem3scld4lffbz33p.jpg',
                    filename: 'YelpCamp/rrjuem3scld4lffbz33p'
                },
                {
                    url: 'https://res.cloudinary.com/dprh57lps/image/upload/v1676565963/YelpCamp/rwbrnbzhh0nuui4teysv.jpg',
                    filename: 'YelpCamp/rwbrnbzhh0nuui4teysv'
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur, numquam tenetur ipsa aperiam, atque saepe beatae deserunt repudiandae minus assumenda quidem distinctio aliquam repellat itaque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});