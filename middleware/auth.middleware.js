const jwt=require("jsonwebtoken")
 const auth=(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if(token){
            var decoded = jwt.verify(token, 'moumita');
            console.log(decoded);
            if(decoded)
            {
                req.body.userid=decoded.userid
                req.body.username=decoded.username
                
                next()
            }
            else{
                res.status(200).send({"msg":"Wrong  token"})
            }
        }
        else{
            res.status(200).send({"msg":"Token needed"})
        }
    } catch (error) {
        res.status(400).send({"err":error})
    }
} 

module.exports={
    auth
}