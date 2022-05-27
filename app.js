const Express=require("express")
const Mongoose=require("mongoose")
const BodyParser=require("body-parser")
const res = require("express/lib/response")
const req = require("express/lib/request")

var app= Express()

app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var markModel=Mongoose.model("marks",new Mongoose.Schema(
    {
         
        admno:String,
        name: String,
        cgpa: String
    }
))

Mongoose.connect("mongodb+srv://ansu:12345@cluster0.abf13.mongodb.net/studentmarksDb")
app.get("/api/viewall",(req,res)=>{
    markModel.find((error,data)=>{
        if(error)
        {
            res.send({"Status":"error"})
        }
        else{
            res.send(data)
        }
    })
})
app.post("/api/search",(req,res)=>{
    var getAdmno=req.body
    markModel.find(getAdmno,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send(data)
        }
    })
})
app.post("/api/delete",(req,res)=>{
    var getId=req.body
    markModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success"})
        }
    })
})

app.post("/api/read",(req,res)=>{
    var data=req.body
    let ob=new markModel(data)
    ob.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":data})

        }
        else{
            res.send({"Status":"success","data":data})

        }
    })
    
})
app.listen(4000,()=>{
    console.log("server running")
})