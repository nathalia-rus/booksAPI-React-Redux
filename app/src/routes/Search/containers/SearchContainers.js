// small file, just to import our actions and props 
// and then in another file, set up a component that's gonna take in those props and do stuff with it

import { connect } from 'react-redux'
import getBooks from "../modules/search"
import {fromJS} from 'immutable'

// import component that's gonna be playing with these props

import Search from '../../../components/Search/Search'

const actions = {
  getBooks: (value) => getBooks(value)
}

// need to map the state to the props

const mapStateToProps = (state) => {
  const search = state.search
  return {
    // set up a props called books, which is gonna go to the search branch in the state tree
    books: search.get('books', fromJS([])), // fromJS = optional, but default = just a blank list 
    // I'm getting books: cf fn in reducers file 
    // get => immutable fn
    // now we need to grab the query: 
    query: search.get('query', '')
    // '' because if nothing there, nothing 
  }
  // remember: the entire state is an object.
}

// need to export, or else it's not gonna work :))

export default connect(mapStateToProps, actions)(Search)
// pass in our props, our actions, and the view / component, in our case, it's Search






