const express=require('express');
const { generateURl, getUrl, handleAnalystics, deleteUrlasync } = require('../controller/url');
const router=express.Router();

router.get('/:id',getUrl)
router.get('/analytics/:id',handleAnalystics)
router.post('/',generateURl)
router.delete('/:id',deleteUrlasync)

module.exports=router;