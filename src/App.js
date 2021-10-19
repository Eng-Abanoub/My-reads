import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './Component/ListBooks'
import SearchBooks from './Component/SearchBooks'
import { Route } from 'react-router'


class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    trim:'',
    searchResult:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then(data=>this.setState({books:data})); 
    // BooksAPI.search(this.state.trim).then(data=>this.setState({searchResult:data}));
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextState!==this.state){
      console.log('hi')
      return true
    }
    else{
      console.log('no')
      return false
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Typical usage (don't forget to compare props):
    if (prevState.trim !== this.state.trim){
      BooksAPI.search(this.state.trim).then((data)=>this.setState({searchResult:data}));
    }
      console.log('change')
  }
  handelChange=(e)=>{
    const shelf = e.target.value
    const bookId = e.target.name
    console.log(e.target)
    console.log(shelf)
    console.log(bookId)
    let updated = false;
    let newBooks=this.state.books.map((book)=>{
      if(book.id===bookId){
        book.shelf=shelf
        BooksAPI.update(book,shelf)
        updated= true;
        return book
      }
      else return book
    })
    if(!updated){
      BooksAPI.get(bookId).then((book)=>{
        book.shelf=shelf
        BooksAPI.update(book,shelf)
        newBooks.push(book)
        this.setState({books:newBooks})
      })
    }else{
      this.setState({books:newBooks})
      console.log(newBooks)
      console.log(updated)
    }
  }

  search =(e)=>{
    this.setState({ trim: e });
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
        <ListBooks books={this.state} handelChange={this.handelChange} handelSearch={this.handelSearch}/>
        )}/>

        <Route path='/search' render={()=>(
        <SearchBooks handelChange={this.handelChange} search={this.search} state={this.state}/>
        )} /> 
       </div>
    )
  }
}

export default BooksApp
