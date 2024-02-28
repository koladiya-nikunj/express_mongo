const LoginModel = require("../models/loginModel")

const getUser = async(req,res) =>{
    try {   
        const allData = await LoginModel.find();
        console.log('All data :', allData);
        res.status(200).json({allData});
    } catch (error) {
        console.error('Error retrieving allData:', error);
        res.status(500).json({ error: 'Failed to retrieve allData' });
    }
}
module.exports = getUser