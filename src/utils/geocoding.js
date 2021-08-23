const request=require("request"),
    {geoCodingApi}=require("./apikeys");


const geoCoding=(location,cb)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${geoCodingApi}&limit=1`;
    request({url,json:true},(err,res)=>{
        if(err){
            cb("network isuue!",undefined);
        }else if(res.body.features.length==0){
            cb("no results found",undefined);
        }
        else{
            let data={
                lat:res.body.features[0].center[1],
                log:res.body.features[0].center[0],
                location:res.body.features[0].place_name
            }
            cb(undefined,data);
        }
    })
}

module.exports=geoCoding;