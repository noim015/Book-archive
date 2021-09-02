const searchField = document.getElementById('search-field');
const resultFound = document.getElementById('result_found');
const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error');



// Function for fetch book from DB
const searchBooks = () => {
    
    const searchText = searchField.value;
    const url =`https://openlibrary.org/search.json?q=${searchText}`;
    //Clear input field text
    searchField.value = '';
    //Remove previous search result
    searchResult.textContent = '';
    if (searchText === "") {
        //When input field empty
        errorDiv.innerText = "Search field cannot be empty.";
        resultFound.innerText = '';
        return;
      }
       //When input field is not empty and search button is clicked
      else{
        errorDiv.innerText ='';
        resultFound.innerText = '';
        toggleSpinner('block');
      }
    fetch(url)
        .then( response => response.json())
        .then(data => displaySearchResult(data.docs))
}
//Function For Loading Spinner
const toggleSpinner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}

//Intially loading spinner is off
toggleSpinner('none');

// Function for displaying search result
const displaySearchResult = books => {
    //If no result found
    if(books.length == 0){
        resultFound.innerText = 'No result found';
        toggleSpinner('none');
    }
    //Display Total books quantity
    else{
        
        resultFound.innerText = `Total books found: ${books.length}`;
        
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
        //if book name unknown or undefined
        if(typeof(book.title) === "undefined" ){
            bookTitle = 'Book Name Unknown';
        }
        //If book name is available
        else{
            bookTitle = book.title;
        }

         //If there is an Author of the Book
        if(book?.author_name){
            authorName = book.author_name[0];
        }
        //No Author
        else{
            authorName = 'No Author Name';
        }
         //If First published year undefined
        if(typeof(book.first_publish_year) === "undefined" ){
            publishedYear = 'Year Unknown';
        }
        //If First published year available
        else{
            publishedYear = book.first_publish_year;
        }
         //If there is a Publisher name
        if(book?.publisher){
            publisherName = book.publisher[0];
        }
        //If publisher name unknown
        else{
            publisherName = 'Unknown Publisher name';
        }
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100">
                            <img src="${myImage}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h2 style="color:blue"class="card-title">${bookTitle}</h2>
                                    <h4>Author:<span class="card-subtitle"> ${authorName}</span></h4>
                                    <h5>Publisher:<span class="card-subtitle"> ${publisherName}</span></h5>
                                    <p>Published:  <span class="card-subtitle"> ${publishedYear}</span></p>
                                </div>
                        </div>`;
        searchResult.appendChild(div);
        toggleSpinner('none');
    });
}