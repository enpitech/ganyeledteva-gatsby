import React from 'react'
import logo from '../../../static/logos/logo.png';


export default function Logo(props) {
    return (
        <img {...props} src={logo} alt='Logo'/>
    )
}
