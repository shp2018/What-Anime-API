const express = require("express");
const router = express.Router();
var axios = require('axios')



    

router.get("/getAnime", (req, res, next)=>{
    const imageLink = req.query.imageLink
    
    axios.get(`https://trace.moe/api/search?url=${imageLink}`, {
     
    
    }).then(result=>{
        res.json(result.data) 
    })
    .catch(err => {
       
        res.status(400).json(err.toJSON())
    })

})

router.get("/getThumbnail", (req, res, next)=>{
    const anilist_id = req.query.anilist_id
    const at = req.query.at
    const filename = req.query.filename
    const tokenthumb = req.query.tokenthumb
    
    axios.get(`https://trace.moe/thumbnail.php?anilist_id=${anilist_id}&file=${encodeURIComponent(filename)}&t=${at}&token=${tokenthumb}`, {
     
    
    }).then(thumb=>{
        res.send(thumb.data)
    })
    .catch(err => {
       
        res.status(400).send(err)
    })

})
router.get("/getVideo", (req, res, next)=>{
    const anilist_id = req.query.anilist_id
    const at = req.query.at
    const filename = req.query.filename
    const tokenthumb = req.query.tokenthumb
    
    axios.get(`https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`, {
     
    
    }).then(result=>{
        res.send(result.data)
    })
    .catch(err => {
       
        res.status(400).send(err)
    })

})

    




module.exports = router;




