const express = require('express');
const router = express.Router();

router.post('/fooddata',async (req,res)=>{
    try{
        res.send([global.food_items,global.foodCategory])
    }catch(error){
        console.log(error);
        res.send("server error");
    }
})

module.exports = router;