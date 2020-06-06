import { Component } from 'react'
import global from '../styles/global.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component{

    constructor(props){
        super(props)
    }

    render () {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }

}
