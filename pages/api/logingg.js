
import jwt from 'jsonwebtoken'
const KEY='woaidqnysys'
export default function(req,res){
    
    if(!req.body){
        res.statusCode=404
        res.end('Error')
        return
    }
    const {username,password,contact,schoolCode}=req.body
   
    res.json({
        token:jwt.sign({
            username,
            admin:username==='admin'&& password==='admin',
            contact,
            schoolCode,
        }, KEY)
    })
}