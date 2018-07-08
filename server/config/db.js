import mongoose from 'mongoose';

export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://ammce:madrid94@ds219051.mlab.com:19051/weather-app');
    mongoose.connection
        .once('open', () => {
            console.log("Mongo db is running");
        })
        .on('error', err => console.log(err));
}