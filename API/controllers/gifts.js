const getAllGifts = (req, res) => {
    res.json({'value':'all gifts'})
}

const createGift = (req, res) => {
    res.json(req.body)
}

const giftInfo = (req, res) => {
    res.json(req.params)
}

const editGifts = (req, res) => {
    res.json({'value':'edit gift'})
}

const deleteGift = (req, res) => {
    res.json({'value':'deleted a gift'})
}

module.exports = {
    getAllGifts,
    createGift,
    giftInfo,
    editGifts,
    deleteGift,
}