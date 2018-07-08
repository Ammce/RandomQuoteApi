export default (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); //Instead of start I will put our broweser Domain
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === "OPTIONS") {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
}