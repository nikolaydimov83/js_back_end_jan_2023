function parseError(error){
if (error.name=='ValidationError'){
return Object.values(error.errors).map((e)=>e.message);

}else if(error.name){
    return [error.message]
}else {
    return error.map((e)=>e.msg)
}
}

function renameBodyProperties(req) {
    let hotel = req.body;
    hotel.freeRooms = req.body['free-rooms'];
    hotel.name = req.body.hotel;
    hotel.imageUrl = req.body.imgUrl;
    delete req.body['free-rooms'];
    delete req.body.hotel;
    delete req.body.imgUrl;
    return hotel;
}

module.exports={parseError,renameBodyProperties}


