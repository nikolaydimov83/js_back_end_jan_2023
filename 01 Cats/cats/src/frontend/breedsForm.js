let form=document.querySelectorAll('form')[1];
form.addEventListener('submit',async (ev)=>{
ev.preventDefault();
let newBreed=ev.target.querySelector('input').value;
let response=await fetch('http://localhost:4040/cats/add-breed/addBreed',{
    method:'post',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify({newBreed})
})
//console.log(response.json())
})
