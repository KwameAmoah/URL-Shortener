const express = require('express');
const { connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url')
const URL = require('./models/url')

const app = express();

const PORT= 5000

connectToMongoDB("mongodb://localhost:27017/url-shortener")
.then(() => console.log('mongodb connected'))

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = res.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    { $push: {
        clicks: {
          timestamp: Date.now(),
        },
    },
});
res.redirect(entry.redirectURL)

})

app.listen(PORT, () => console.log('server started at PORT'))