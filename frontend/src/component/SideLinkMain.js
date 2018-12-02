import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import GenerateInvoice from './Invoice/GenerateInvoice'
import Client from './Client/Clients'
import AddProductForm from './Product/AddProduct'

const Main = () => (
    <main>
        <div className="container">
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/generateInv' component={GenerateInvoice}/>
            <Route path='/clients' component={Client}/>
            <Route path='/addProducts' component={AddProductForm}/>
            </Switch>
        </div>
    </main>    
)

export default Main;