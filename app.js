const express = require('express');
var _ = require('lodash');
const { ApiFetch } = require('./FetchData/FetchData');
const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json());


app.get("/api/see",async(req,res)=>{
    try{
        let data = await ApiFetch();
        if(data===null){
            return res.status(400).json({error:"Returned Empty"});
        }
        const size = _.size(data.blogs);
        if(size===0){
            return res.status(400).json({error:"Empty Set"});
        }
        const longestString = _.maxBy(data.blogs, obj => _.get(obj, 'title.length', 0));
        if(longestString===null){
            return res.status(404).json({error:"None found"});
        }
        const TitlesCount = _.filter(data.blogs, item =>
             _.includes(item.title.toLowerCase(), 'privacy')).length;
        if(TitlesCount===0){
            return res.status(404).json({error:"No matching found"});
        }

        const uniqueTitles = _.uniqBy(data.blogs, 'title');
        const UniqueNames = uniqueTitles.map(item =>item.title);

        var obj ={
            size,
            longestString,
            TitlesCount,
            UniqueNames
        };
        return res.json(obj);
    }
    catch(err){
        console.log(err);
    }
})

app.get("/api/search",async (req,res)=>{
    try{
        
        let data = await ApiFetch();
        const filter = req.query;
        const title = Object.values(filter)[0]; 
        const privacyTitles = _.filter(data.blogs, item =>
            _.includes(item.title.toLowerCase(), title));
        if(privacyTitles.length===0){
            return res.status(400).json({error:"invalid parameter"});
        }
        return res.json(privacyTitles);
    }
    catch(err){
        console.log(err);
    }
});

app.listen(3000,(req,res)=>{
    console.log("Server is Up");
})