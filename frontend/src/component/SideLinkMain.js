import React from 'react';
import {Switch, Route} from 'react-router-dom';
import GenerateInvoice from './Invoice/GenerateInvoice'
import Invoice from './Invoice/Invoices'
import InvoiceDetails from './Invoice/InvoiceDetails'
import Client from './Client/Clients'
import AddClient from './Client/AddClient'
import AddProductForm from './Product/AddProduct'
import Product from './Product/Products';

const Main = () => (
    <main>
        <div className="container">
            <Switch>
            <Route exact path='/' component={GenerateInvoice}/>
            <Route path='/invoices' component={Invoice}/>
            <Route path='/invoiceDetails/:id' component={InvoiceDetails}/>
            <Route path='/clients' component={Client}/>
            <Route path='/addClient' component={AddClient}/>
            <Route path='/products' component={Product}/>
            <Route path='/addProduct' component={AddProductForm}/>
            </Switch>
        </div>
    </main>    
)

export default Main;