import './App.css'
import React from 'react'
import { BrowserRouter as Router } from  'react-router-dom'
import TipCalculator from './TipCalculator'

const App = props => {

    return (
                <div className="TipCaululator">
                    <TipCalculator/>
                </div>
    )
}

export default App