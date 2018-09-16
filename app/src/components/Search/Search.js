// npm install immutable
 import { fromJS } from "immutable"

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

// Actions handlers 

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

//
// Reducer

const initialState = fromJS({});
export default(state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
