// small file, just to import our actions and props 
// and then in another file, set up a component that's gonna take in those props and do stuff with it

import { connect } from 'react-redux'
import getBooks from "../modules/search"
import {fromJS} from 'immutable'

// import component that's gonna be playing with these props

import Search from '../../../components/Search/Search'





