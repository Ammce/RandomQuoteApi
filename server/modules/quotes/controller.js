import Quote from './model';

export const createQuote = async (req, res) => {
    const { author, quote, user, comment } = req.body;
    const newQuote = new Quote({ author, quote, user, comment });

    try {
        return res.status(201).json({ quote: await newQuote.save() });
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: "Error with meetup" });
    }
}

export const getAllQuotes = async (req, res) => {
    try {
        return res.status(200).json({ quote: await Quote.find({}).sort('-star') });
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with all meetups' });
    }
}

export const rateQuote = async (req, res) => {
    try {
        let data = await Quote.findById(req.body.quoteID);
        data.set({
            star: (data.star + 1)
        });
        data.save();
        if (!data) {
            return res.status(404).json({ error: true, message: "Not able to find ratings" })
        }
        else {
            return res.status(200).json(data);
        }
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with rating' });
    }
}



