// server/router/index.js

module.exports = function (app) {
    app.use('/crm', require('./routes/crm'));
    app.use('/bids', require('./routes/bids'));
};