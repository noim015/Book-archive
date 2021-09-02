// Function for fetch book from DB
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    const url =`https://openlibrary.org/search.json?q=${searchText}`;
    //Clear input field text
    searchField.value = '';
    fetch(url)
        .then( response => response.json())
        .then(data => displaySearchResult(data.docs))
}

// Function for displaying search result
const displaySearchResult = books => {
    
    const resultFound = document.getElementById('result_found');
    const searchResult = document.getElementById('search-result');
    //Remove previous search result
    searchResult.textContent = '';
    if(books.length == 0){
        //If no result found
        resultFound.innerText = 'No result found';
    }
    else{
        //Show how many result matched
        resultFound.innerText = books.length;
    }
    books.forEach(book => {
            //If no image for book
        if (typeof(book.cover_i) === "undefined"){
             myImage = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png`;
        }
            //If there is a image for book
        else{
             myImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
         //If there is an Author of the Book
        if(book?.author_name){
            authorName = book.author_name[0];
        }
        //No Author
        else{
            authorName = 'No Author Name';
        }
         //If there is a First published year
        if(typeof(book.first_publish_year) === "undefined" ){
            publishedYear = 'Year Unknown';
        }
        //Not mentioned of First published year
        else{
            publishedYear = book.first_publish_year;
        }
         //If there is a Publisher name
        if(book?.publisher){
            publisherName = book.publisher[0];
        }
        //Not mentioned of the publisher name
        else{
            publisherName = 'Unknown Publisher name';
        }
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100">
                            <img src="${myImage}" class="card-img-top" alt="...">
                         <div class="card-body">
                            <h2 style="color:blue"class="card-title">${book.title}</h2>
                            <h4>Author:<span class="card-subtitle"> ${authorName}</span></h4>
                            <h5>Publisher:<span class="card-subtitle"> ${publisherName}</span></h5>
                            <p>Published:  <span class="card-subtitle"> ${publishedYear}</span></p>
                        </div>
                        </div>`;
        searchResult.appendChild(div);
        
        
    });
}