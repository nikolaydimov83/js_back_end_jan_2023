const Hotel = require("../models/Hotel")

async function getAllHotels(){
    let hotels=await Hotel.find({}).lean();
    hotels.forEach((hotel)=>{
       
        hotel.currentFreeRooms=Number(hotel.freeRooms)-hotel.bookedUsers.length
        
    });
    hotels.sort((h1,h2)=>{return h1.currentFreeRooms-h2.currentFreeRooms})

    return hotels

}

async function createHotel(hotel){
    await Hotel.create(hotel);
}

async function readHotelById(id){
    

    let hotel=await Hotel.findById(id).populate('owner').populate('bookedUsers').lean();
    //console.log(model);
    return hotel
}



async function deleteModelById(id){
    
    /*let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    let model=models.find((model)=>model.id===id);*/
    let model=await Cube.findByIdAndDelete(id);
    //console.log(model);
    return model
}
async function replaceHotelById(req,hotel){
    await Hotel.replaceOne({_id:req.params.id},hotel)
}

module.exports={getAllHotels,createHotel,readHotelById,replaceHotelById}