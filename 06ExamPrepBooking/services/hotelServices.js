const Hotel = require("../models/Hotel")

async function getAllHotels(){
    let hotels=await Hotel.find({}).lean();
    hotels.forEach((hotel)=>{
       
        hotel.currentFreeRooms=Number(hotel.freeRooms)-hotel.bookedUsers.length
        
    });
    hotels.sort((h1,h2)=>{return h2.currentFreeRooms-h1.currentFreeRooms})

    return hotels

}

async function createHotel(hotel){
    let result=await Hotel.create(hotel);
    return result
}

async function readHotelById(id){
    try {
        let hotel=await Hotel.findById(id).populate('owner').lean();
        if(hotel){
            hotel.currentFreeRooms=Number(hotel.freeRooms)-hotel.bookedUsers.length
        }
        return hotel 
    } catch (error) {
        if (error.kind=='ObjectId'){
            return null
        }else throw error
    }


    
   
}



async function deleteHotelById(id){
    
    
    let model=await Hotel.findByIdAndDelete(id);
    
    return model
}
async function replaceHotelById(req,hotel){
    await Hotel.replaceOne({_id:req.params.id},hotel)
}

module.exports={getAllHotels,createHotel,readHotelById,replaceHotelById,deleteHotelById}