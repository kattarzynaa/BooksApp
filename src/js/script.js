/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {

    templateOf: {
      bookList: '#template-book',
    },

    containerOf: {
      bookList: '.books-list',
      form: '.filters',
    },

  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBook = this;

      thisBook.getElements();
      thisBook.determineRatingBgc();
      thisBook.renderInBookList();
      thisBook.initActions();
    }

    getElements(){
      const thisBook = this;

      thisBook.bookListContainer = document.querySelector(select.containerOf.bookList);
      thisBook.filtersForm = document.querySelector(select.containerOf.form);

    }

  renderInBookList(){
    const thisBook = this; 

    /* start Loop on dataSource.books */
    for(let book of dataSource.books){

      // Rating bar visualisation

      const ratingBgc = thisBook.determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;

      
      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;

      //Book list render

      /* generate HTML based on template */
      const generatedHTML = templates.bookList(book);    
      //console.log('HTML: ', generatedHTML);

      /* create element using utils.createDOMFromHTML */
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      //console.log('DOM: ', generatedHTML);

      /* add DOMelement to .books-list */

      thisBook.bookListContainer.appendChild(thisBook.element);

    /* End loop */
    }
  }

  initActions(){
    const thisBook = this; 

    const favoriteBooks = [];
    const filters = [];
  
    // Favorite books function

    thisBook.bookListContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      

      if (event.target.offsetParent.classList.contains('book__image') && !favoriteBooks.includes(event.target.offsetParent.classList)){

        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(event.target.offsetParent.classList);
  
      } else {
  
        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.pop(event.target.offsetParent.classList);
      }
    });

    // Filtering books function

    thisBook.filtersForm.addEventListener('change', function(event){

      event.preventDefault();

        if(event.target.type == 'checkbox' && event.target.tagName == 'INPUT' && event.target.name == 'filter'){
        }
      
        if(event.target.checked == true){
          filters.push(event.target.value);
        } else {
          const index = filters.indexOf(event.target.value);
          filters.splice(index, index + 1);
        }  
   
        for(let book of dataSource.books){
    
          const bookPath = document.querySelector('[data-id="' + book.id + '"]');
          let shouldBeHidden = false;
    
          for(let type of filters){
            if(book.details[type]){
            
              shouldBeHidden = false;
              break;
    
            } else  shouldBeHidden = true;
          }
    
          if(shouldBeHidden) {
            bookPath.classList.add('hidden');
          } else if (!shouldBeHidden) {
            bookPath.classList.remove('hidden');
          }
        }
    });
  }



  determineRatingBgc(value){

    const datas = dataSource.books;

    for(let data of datas){
      if(value == data.rating && data.rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } 
      else if(value == data.rating && data.rating > 6 && data.rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } 
      else if(value == data.rating && data.rating > 8 && data.rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } 
      else if(value == data.rating && data.rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      } 
    }
    
  }
  }

  const app = new BooksList();

}