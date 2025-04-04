import express from "express";

// create instance

const router = express.Router();

// it is a get request to the homepage
router.get('/',(req,res)=>{
    res.send('Hello from server');
})

export default router;