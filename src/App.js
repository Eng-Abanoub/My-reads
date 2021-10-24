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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.trim !== this.state.trim){
      if(this.state.trim!=='')BooksAPI.search(this.state.trim).then((data)=>this.setState({searchResult:data}));
    }
  }
  handelChange=(e)=>{
    const shelf = e.target.value
    const bookId = e.target.name
    console.log(e.target.value)
    let newBooks=this.state.books.map((book)=>{
      if(book.id===bookId){
        book.shelf=shelf
        BooksAPI.update(book,shelf).then((data)=>console.log(data))
        console.log(book)
        return book
      }
      else return book
    })
    this.setState({books:newBooks})

  }
  handelChange2=(e)=>{
    const shelf = e.target.value
    const bookId = e.target.name
    console.log(e.target.value)

    BooksAPI.get(bookId).then((book)=>{
      book.shelf=shelf
      BooksAPI.update(book,shelf).then((data)=>{console.log(data)})

    })
      const result = this.state.searchResult.filter((book)=>{
        if(book.id==bookId){
          console.log(book.shelf)
          book.shelf=shelf
          console.log(book.shelf)
        }
        return book
        });
        this.setState({searchResult:result})  
      this.setState({books:this.state.books})
    }
  
  search =(e)=>{this.setState({ trim: e })}
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
        <ListBooks books={this.state} handelChange={this.handelChange} handelSearch={this.handelSearch}/>
        )}/>

        <Route path='/search' render={()=>(
        <SearchBooks handelChange={this.handelChange2} search={this.search} state={this.state}/>
        )} /> 
       </div>
    )
  }
}

export default BooksApp
