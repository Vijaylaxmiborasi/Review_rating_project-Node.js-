    const reviewSchema = require('../models/reviewModelSchema')

//add review
const addReview = async(req, res)=>
{
    try{
        const savedReview = new reviewSchema(req.body)
        await savedReview.save();
        res.status(201).json({
            success : 'success',
            review : savedReview,
            message : 'Review added successfully'
        })
    }
    catch(err){
        res.status(500).json({
            success : 'failure',
           message : 'Error occured while adding review : '+err.message
        })
    }
}

//update review
const editReview = async(req, res) =>
{
    try{
        const edit = await reviewSchema.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators : true
        });
        res.json(edit);
    }
    catch(err){
        res.send('error '+err.message);
    }
}

//delete review
const deleteReview = async(req, res) => 
{
    
    try{
        await reviewSchema.findByIdAndDelete(req.params.id);
        res.status(204).json({
            success : 'success',
            data : {}
        })
    }catch(err){
        res.status(500).json({
            success : 'failure',
            message : 'error occured'+err.message
        })
    }
}

// review list
const listReview = async(req, res) => {
    try{
        const reviewList = await reviewSchema.find();
        res.send({
            success : "success",
            data : reviewList
        });
    }catch(err){
        res.send({
            success : 'failure',
            message :"Error occured "+err.message
        })
    }
}

// detail of review
const detailReview = async(req, res)=>
{
    const id = req.params._id;
    try{
        const detail = await reviewSchema.findOne({_id : id})
        .populate({
            path : "userId",
            select : "name profilePic city state contact"
        }).populate({
            path : "companyId",
            select : "userName location city foundedOn companyLogo"
        })
        res.status(201).json({
            success : 'success',
            data : detail
        })
    }
    catch(err){
        res.json({
            success : 'failure',
            message : 'error occured '+err.message
        })
    }
}

module.exports = {
    addReview,
    editReview,
    deleteReview,
    listReview,
    detailReview
}
