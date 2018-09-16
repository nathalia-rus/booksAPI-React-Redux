// npm install immutable
 import { fromJS } from "immutable"
 import fetch from "isomorphic-fetch"
 // when u got one: import apiKey from "auth/apiKey"
 // https://books.google.com/books?uid=117217888285977420980&hl=fr

 // AIzaSyAPlIAbAw6BHJgtOtUJJdQmbsN4ADFlgq8
 // my id = 117217888285977420980


 // api key
const apiKey = AIzaSyAPlIAbAw6BHJgtOtUJJdQmbsN4ADFlgq8;

// CONSTANTS 

// we need 2 constants : 1 to set the books, and 1 to set value of inpt box / query 
// 1 = books you get from the API, 2 = whatever you type in to the input field 

export const SET_BOOKS = 'SET_BOOKS'
export const SET_QUERY = 'SET_QUERY'

// ACTIONS

//  2 actions: 1 our set books
export function setBooks (books) {
  return {
    type: SET_BOOKS,
    payload: books
    // = anything that is passed into a funciton, in this case, books.
    // gonna be a JSON array of objects. 
  }
}

// now we need a function for query 
export function setQuery (query) {
  return {
    type: SET_QUERY,
    payload: query
  }
}

// other action later on: GET_BOOKS, to handle our fetching. 
// now:

export const getBooks = (query) => {
  return (dispatch, getState) => {
    dispatch(setQuery(query))
    // okay, now our fetch call, go get url :
    // GET https://www.googleapis.com/books/v1/volumes?q={search terms}
    // later: get an API key of your own, or the server might lock you out. 
      fetch("https://www.googleapis.com/books/v1/volumes?q=" + query + '&key=' + apiKey) // if API key: + apiKey 
      .then(response => {
        // we need to check the status 
        if (response.status >= 400) {
          throw new Error('Bad response from the server')
        }
        return response.json()
        // return response or not working lol, and in format json!
      }).then(books =>  {
      // when we got our books back, we need to set it in the state 
      // need to dispatch setBooks, and gonna pass in that books
      dispatch(setBooks(books.items))
      // this is actually gonna contain the actual data from the server 
      // gonna be an object,and it's gonna have the items = array of objects which have our books
      }).catch(error => {
        console.log(error)
      })
      // catches the error 

  }
}



// gonna expose this getbooks fn to the entire app, and attach this fn into the intpu box
// and bind it on change event, so everytile u type, sending info from the input box into this fn 
// gonna make a fetch and do all this stuff
// dispatch: dispatches actions in this file, in this case, the setbooks fn in here 

// ACTIONS HANDLERS

const ACTION_HANDLERS =  {
  [SET_BOOKS]: (state, {payload: books}) => {
    return state.set('books', fromJS(books))
    // prop in the state called books, gonna be an array of objects. 
    // set = function from immutable js 
    // need to convert that array of object into a map ( reg js object), or list (array)
  },
    [SET_QUERY]: (state, {payload: query}) => {
      return state.set('query', fromJS(query))
    }
}

// REDUCER 

const initialState = fromJS({});
export default(state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
