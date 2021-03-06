
import React from "react";
import { Link } from "react-router-dom";
function ListBooks(props) {
  const { books } = props.books

  let reading = books.filter((book) => book.shelf === 'read').map((book) => {

    let authors = book.authors.map((auther,index) => {
      return (
        <div key={index} className="book-authors">{auther}</div>
      )
    })

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} name={book.id} onChange={e => props.handelChange(e)}>
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
          {/*           
          <div className="book-authors">{book.authors[0]}</div>
          <div className="book-authors">{book.authors[0]}</div> */}
        </div>
      </li>)
  })
  let currentlyReading = books.filter((book) => book.shelf === 'currentlyReading').map((book) => {
    let authors = book.authors.map((auther,index) => {
      return (
        <div key={index} className="book-authors">{auther}</div>
      )
    })
    return (
      <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} name={book.id} onChange={e => props.handelChange(e)}>
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
  })
  let wantToRead = books.filter((book) => book.shelf === 'wantToRead').map((book) => {
    let authors = book.authors.map((auther,index) => {
      return (
        <div key={index} className="book-authors">{auther}</div>
      )
    })
    
    return (
      <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} name={book.id} onChange={e => props.handelChange(e)}>
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
  })

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReading}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToRead}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {reading}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  )
}


export default ListBooks