const { nanoid } = require('nanoid');
const Url = require('../model/url');
async function generateURl(req, res) {
    const shortId = nanoid(8);
    const result = await Url.find({ createdBy: req.user._id });

    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            message: 'Please provide a redirect url'
        });
    }
    await Url.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.redirect('/');
}

async function getUrl(req, res) {
    const shortId = req.params.id;
    const url = await Url.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: new Date()
            }
        }
    })
    res.redirect(url.redirectUrl);
}
async function handleAnalystics(req, res) {
    let shortId = req.params.id;
    if (!shortId) {
        return res.status(400).json({
            message: 'Please provide a shortId'
        })
    }
    const url = await Url.findOne({ shortId });
    return res.status(200).json({
        clicks: url.visitHistory.length,
        analytics: url.visitHistory
    })
}

async function deleteUrlasync(req, res) {
    const { id } = req.params;
    console.log("url id get here", id); // Debug line
    console.log('Trying to delete shortId:', id); // Debug line

    try {
        const url = await Url.findOneAndDelete({ shortId: id });
        if (!url) {
            console.log('URL not found in DB');
            return res.status(404).json({ message: 'URL not found' });
        }

        console.log('URL deleted:', url);
        res.status(200).json({ message: 'URL deleted successfully' });
    } catch (error) {
        console.error('Deletion error:', error); // 🔥 Important debug
        res.status(500).json({ message: 'Error deleting URL' });
    }
}

module.exports = { generateURl, getUrl, handleAnalystics, deleteUrlasync };