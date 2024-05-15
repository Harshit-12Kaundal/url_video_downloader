const express = require('express')
const axios = require('axios')
const router = express.Router()


// function to doownload the video

const dowlaoadvideo  = async (url)=>{
    try{
        const response = await axios.get(url ,{ responseType:'arraybuffer'});
        return response.data;
    }
    catch(err){
        throw new Error('Failed to download video')
    }
};

// route to handle video downlaod 

router.post('/download', async (req, res)=>{
    const {url } = req.body;
    try {
        const videoData = await dowlaoadvideo(url);
        res.send(videoData);
      } catch (error) {
        res.status(500).send(error.message);
      }
});

module.exports = router;