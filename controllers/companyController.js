const companySchema = require("../models/companyModels schema")
const ReviewAndRating = require('../models/reviewModelSchema')

//to add company
const addCompany = async (req, res) => {
    const companyData = new companySchema(req.body);
    const isCompanyExists = await companySchema.findOne({
        companyName: req.body.companyName
    })
    if (isCompanyExists) {
        return res.status(409).json({
            success: 'failure',
            message: "Company Already Exists"
        })
    }
    else {
        try {
            companyData.userId = req.params.id
            const filePath = `/upload/${req.file.filename}`;
            companyData.companyLogo = filePath;
            let data = await companyData.save();
            res.status(201).json({
                success: "success",
                message: "company created",
                res: data
            })
        }
        catch (err) {
            res.send({
                success: "failure",
                message: "Error Occured" + err.message
            })
        }
    }
}

//to get company
const getCompany = async (req, res) => {
    try {
        const companyData = await companySchema.find();
        if (companyData != null) {
            res.status(201).json({
                success: 'success',
                res: companyData
            })
        }
        else {
            res.status(404).json({
                success: 'failure',
                message: "Company does not exist."
            })
        }
    }
    catch (err) {
        res.send({
            success: 'failure',
            message: 'error occured ' + err.message
        })
    }
}

// to get company detail with user and review detail
const companyReviewcomment = async (req, res) => {
    const id = req.params.id;
    try {
        const companyDetails = await companySchema.findById(id);
        const reviewData = await ReviewAndRating.find({ companyId: id }, { review: 1, rating: 1, createdAt: 1 })
            .populate({
                path: "userId",
                select: " name  profilePic "
            })
        const totalRating = reviewData.length
        let total = 0
        for (let i of reviewData) {
            total = total + i.rating
        }
        const avgRating = total / totalRating

        const totalReview = reviewData.length
        res.json({
            companyDetails: companyDetails,
            reviewDetails: reviewData,
            totalReview: totalReview,
            avgRating: avgRating
        })

    }
    catch (err) {
        res.status(500).json({
            success: 'failure',
            message: 'error occured ' + err.message
        })
    }
}

// to search company by city name
const searchCompany = async (req, res) => {
    try {
        const companyData = await companySchema.find({ city: req.body.city });
        if(companyData!=null)
        {
            res.status(201).json({
                success: 'success',
                res: companyData
            })
        }
        else{
            res.status(404).json({
                success : 'failure',
                message : "No company found, registered with this city name."
            })
        }
    }
    catch (err) {
        res.send({
            success: 'failure',
            message: 'error occured ' + err.message
        })
    }
}

module.exports = {
    addCompany,
    getCompany,
    companyReviewcomment,
    searchCompany
}
