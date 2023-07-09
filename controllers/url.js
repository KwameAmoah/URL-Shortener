const shortid = require('shortid');
const URL = require('../models/url')


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.ststus(404).json({ error: 'url is required'})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        clicks: [],
    });

    return res.json({id: shortID});

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId});
    return res.json({
        totalClicks: result.clicks.length,
        analytics: SpeechRecognitionResultList.clicks,
    });

}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}