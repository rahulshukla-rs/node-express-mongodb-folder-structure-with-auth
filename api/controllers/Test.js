const Test = require("../models/Test");

exports.testOne = (req, res) => {
    // Not to write this way....check testTwo
    res.status(200).json({
        status: true,
        message: "Test One Route"
    })
}

exports.testTwo = async (req, res) => {
    try {
        const data = await Test.find({})
        if(data)
        {
            res.status(200).json({
                status: true,
                message: "Test Two Route",
                data: data
            })
        }
        else
        {
            res.status(500).json({
                status: false,
                message: "Failed to retrive data."
            })
        }
    }
    catch (err) {
        return next(err)
    }
}