import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import GenerateInvoice from './Invoice/GenerateInvoice'
import AddClient from './Client/AddClient'

const Main = () => (
    <main>
        <div className="container">
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/generateInv' component={GenerateInvoice}/>
            <Route path='/addClients' component={AddClient}/>
            </Switch>
        </div>
    </main>    
)

export default Main;