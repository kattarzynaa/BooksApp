/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {

    templateOf: {
      bookList: '#template-book',
    },

    containerOf: {
      bookList: '.books-list',
    },

  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
  };

  const favoriteBooks = [];

  function renderInBookList(){
    const thisBookRender = this; 

    /* start Loop on dataSource.books */
    for(let book of dataSource.books){
      //console.log('book: ', book);

      /* generate HTML based on template */
      const generatedHTML = templates.bookList(book);    
      //console.log('HTML: ', generatedHTML);

      /* create element using utils.createDOMFromHTML */
      thisBookRender.element = utils.createDOMFromHTML(generatedHTML);
      //console.log('DOM: ', generatedHTML);

      /* find book list container */

      const bookListContainer = document.querySelector(select.containerOf.bookList);
      //console.log('bookListContainer2: ', bookListContainer);

      /* add DOMelement to .books-list */

      bookListContainer.appendChild(thisBookRender.element);

    /* End loop */
    }
  }

  function initActions(){
    //const thisBook = this; 
    let bookTrigger = '';

    const ulArray = document.querySelectorAll('.book');
    //console.log('ulArray: ', ulArray);

    /*  Start loop */
    for(let i = 1; i <= ulArray.length; i++){
    
      /* find book wrapper */
      bookTrigger = document.querySelector('[data-id="' + i + '"]');
      //console.log('Book Trigger: ', bookTrigger);

      /* add event listener on book clickable trigger */
      bookTrigger.addEventListener('dblclick', function(event){
        
        bookTrigger = document.querySelector('[data-id="' + i + '"]');

        /* prevent default action for event */
        event.preventDefault();

        /* Check if book is in  favoriteBooks array */
        if(!favoriteBooks.includes(bookTrigger)){

          /* if not - add class  .favorite */
          bookTrigger.classList.add('favorite');
          favoriteBooks.push(bookTrigger);

        } else {
        /* if yes - remove class  .favorite */
          bookTrigger.classList.remove('favorite');
          favoriteBooks.pop(bookTrigger);
        }
      });
    }
  }

  renderInBookList();
  initActions();

}