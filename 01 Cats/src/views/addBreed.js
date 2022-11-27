let addBreedView=()=>{
let formAsString=`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="../../content/styles/site.css">
    <link rel="icon" type="image/x-icon" href="../../content/images/icon.png" />
    <title>Cat Shelter</title>
    <script src="/cats/src/frontend/breedsForm.js" type="module"></script>
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/cats/add-breed">Add Breed</a></li>
                <li><a href="/cats/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
        <form action="/search">
            <input type="text">
            <button type="button">Search</button>
        </form>
    </header>

<form class="cat-form" method="post">
<label for="breed">Breed Name</label>
<input name="breed" type="text" id="breed">
<button>Add Breed</button>
</form>
</body>

</html>`;
return formAsString
}

module.exports={addBreedView}