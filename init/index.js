const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main() 
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb+srv://dilipchharang2004:TKg7qwq5PbOx6LTz@cluster0.c6s9z.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0",{
        serverSelectionTimeoutMS: 30000 ,
    });   
}

const initDB = async () => {
  await Listing.deleteMany({});
 initData.data=  initData.data.map((obj)=>({...obj, owner: "679b923ebfed2048d8f34ae3"})) //add a owner every document
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();