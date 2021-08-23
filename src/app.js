"use strict";
const express=require("express"),
    app=express(),
    path=require("path"),
    hbs=require("hbs"),
    weatherForcast=require("./utils/weatherForcast"),
    geoCoding=require("./utils/geocoding");
    

const PORT=process.env.PORT||3000;
//paths
const PUBLICPATH=path.join(__dirname,"../public"),
    VIEWSPATH=path.join(__dirname,"../templates/hbs"),
    PARTIALPATH=path.join(VIEWSPATH,"../partials")


//configs
app.set("view engine","hbs");
app.set("views",VIEWSPATH);
hbs.registerPartials(PARTIALPATH);


//middleware
app.use(express.static(PUBLICPATH));


//routers
app.get("/",(req,res)=>{
    res.render("index",{
        name:"jala"
    });
})
app.get("/about",(req,res)=>{
    res.render("about",{
        name:"jala"
    })
})
app.get("/help",(req,res)=>{
    res.render("help")
})


//apis call
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"no address found!"
        })
    }
    geoCoding(req.query.address,(err,locationData)=>{
        if(err)return res.send({err});
        else{
            weatherForcast(locationData,(err,weatherData)=>{
                if(err){
                    return res.send({err});
                }else{
                    return res.send({locationData,weatherData});
                }
            })
        }
    })
})


app.get("/*",(req,res)=>{
    res.send("baka 404 bakayaru!!");
})
//listerner
app.listen(PORT,()=>{
    console.log(`server listening oon port ${PORT}`);
})