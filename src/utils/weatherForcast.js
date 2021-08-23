const request=require("request"),
    {weatherSatckApi}=require("./apikeys");



const weatherForcast=({lat,log},cb)=>{
    const url=`http://api.weatherstack.com/current?access_key=${weatherSatckApi}&query=${lat},${log}`;
    request({url,json:true},(err,res)=>{
        if(err){
            cb("network issue!",undefined);
        }else if(res.body.error){
            cb("no result found!",undefined);
        }else{
            cb(undefined,res.body)
        }
    })
}

module.exports=weatherForcast;