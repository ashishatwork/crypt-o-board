import React from 'react'
import { CryptoState } from '../CryptoContext'

const Header = () => {

    const {currency, setCurrency} = CryptoState()

    return (
        <nav className="navbar sticky-top navbar-light"  style={{backgroundColor:'#fff1e6'}}>
            <a className="navbar-brand logo" href="/">CRYPT-O-BOARD</a>

            <div className="currency-selector-container">
                <select className="custom-select " 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                </select>
            </div>

        </nav>

    )
}

export default Header
