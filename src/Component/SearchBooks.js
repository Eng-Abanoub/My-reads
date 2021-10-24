import React  from "react";
import { Link } from "react-router-dom";

function SearchBooks(props){
    
    const {searchResult,trim,books} = props.state;
    console.log(searchResult)
    let result = <li>no result</li>
    if(Array.isArray(searchResult)){
    result = searchResult.map((book) => {      
        if(!book.hasOwnProperty('authors')) book.authors=['unknown'];
        let authors = book.authors.map((auther,index) => {
          return (<div key={index} className="book-authors">{auther}</div>)
        })
        books.filter((data)=>{
          if(data.id===book.id){
            book.shelf=data.shelf
            console.log(data.shelf)
          }
        })
        if(book.hasOwnProperty('imageLinks'))
        return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf || 'none'} name={book.id} onChange={e=>props.handelChange(e)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read" >Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {authors}
            </div>
          </li>)
        });
    }
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
              <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={trim} onChange={(e)=>props.search(e.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {result}
              </ol>
            </div>
          </div>
        )
    }

export default SearchBooks;