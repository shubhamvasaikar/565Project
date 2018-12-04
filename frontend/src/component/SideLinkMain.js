import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import GenerateInvoice from './Invoice/GenerateInvoice'
import Invoice from './Invoice/Invoices'
import InvoiceDetails from './Invoice/InvoiceDetails'
import Client from './Client/Clients'
import AddClient from './Client/AddClient'
import AddProductForm from './Product/AddProduct'

const Main = () => (
    <main>
        <div className="container">
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/generateInv' component={GenerateInvoice}/>
            <Route path='/invoices' component={Invoice}/>
            <Route path='/invoiceDetails/:id' component={InvoiceDetails}/>
            <Route path='/clients' component={Client}/>
            <Route path='/addClient' component={AddClient}/>
            <Route path='/addProducts' component={AddProductForm}/>
            </Switch>
        </div>
    </main>    
)

export default Main;