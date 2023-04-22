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

  const favoriteBooks = [];
  const filters = [];
  let background = '';
  let width = '';

  function renderInBookList(){
    const thisBookRender = this; 

    /* start Loop on dataSource.books */
    for(let book of dataSource.books){

      determineRatingBgc(book.rating);
      const ratingBgc = background;
      
      book.ratingBgc = ratingBgc;

      determineRatingWidth(book.rating);
      const ratingWidth = width;

      book.ratingWidth = ratingWidth;


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
  
    const bookList = document.querySelector(select.containerOf.bookList);
    const filtersForm = document.querySelector(select.containerOf.form);


    bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
      
      //console.log(event.target.offsetParent);

      favorite(event);
    });

    filtersForm.addEventListener('change', function(event){
      //console.log('event: ', event);
      event.preventDefault();

      
      filterCheck(event);
      isChecked(event);
      filterBooks(event);
      

    });
  }

  function favorite(event){

    if (event.target.offsetParent.classList.contains('book__image') && !favoriteBooks.includes(event.target.offsetParent.classList)){

      event.target.offsetParent.classList.add('favorite');
      favoriteBooks.push(event.target.offsetParent.classList);

    } else {

      event.target.offsetParent.classList.remove('favorite');
      favoriteBooks.pop(event.target.offsetParent.classList);
    }
  }

  function filterCheck(event){

    if(event.target.type == 'checkbox' && event.target.tagName == 'INPUT' && event.target.name == 'filter'){
      //console.log(event.target.value);
    }
  }

  function isChecked(event){
    if(event.target.checked == true){
      filters.push(event.target.value);
    } else {
      const index = filters.indexOf(event.target.value);
      filters.splice(index, index + 1);
    }  
  }

  function filterBooks(){

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
  }

  function determineRatingBgc(value){

    const datas = dataSource.books;
    //let background = '';

    for(let data of datas){
      if(value == data.rating && data.rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } 
      else if(value == data.rating && data.rating > 6 && data.rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } 
      else if(value == data.rating && data.rating > 8 && data.rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } 
      else if(value == data.rating && data.rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      } 
    }
    
  }

  function determineRatingWidth(value){

    width = value * 10;

  }


  renderInBookList();
  determineRatingBgc();
  initActions();

}