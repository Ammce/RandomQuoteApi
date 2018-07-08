import mongoose, { Schema } from 'mongoose';

const QuoteSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true,
        default: 0
    }
}, {
        timestamps: true
    });

export default mongoose.model('Quote', QuoteSchema);