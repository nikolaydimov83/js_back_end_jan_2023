const Hotel = require("../models/Hotel")

async function getAllHotels(){
    let hotels=await Hotel.find({}).lean();
    hotels.forEach((hotel)=>{
       
        hotel.currentFreeRooms=hotel.freeRooms-hotel.bookedUsers.length
        
    });
    hotels.sort((h1,h2)=>{return h1.currentFreeRooms-h2.currentFreeRooms})

    return hotels

}

async function createHotel(hotel){
    await Hotel.create(hotel);
}

module.exports={getAllHotels,createHotel}