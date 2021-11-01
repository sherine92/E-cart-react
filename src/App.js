import React, { Component } from 'react'
import { Route,BrowserRouter } from 'react-router-dom' 
import Cart from './components/Cart'
import Navbar from './components/Navbar'
import Products from './components/Products'

export default class App extends Component {
    state={cartItem:[]}
    componentDidMount(){
      let data = JSON.parse(localStorage.getItem('data'))
      if(data!=null){
        this.setState({cartItem:data})
      }
    }
    addToLocalStorge=(data)=>{
      localStorage.setItem('data',JSON.stringify(data))
    }
  addItem=(item)=>{
    let excit= this.state.cartItem.find((elm)=>elm.id===item.id)
    if(excit){
      let cart=this.state.cartItem.map((elm)=>elm.id===excit.id?{...excit,qty:excit.qty+1}  :elm)
      this.setState({cartItem:cart})
      this.addToLocalStorge(cart)
    }else{
      let cart=[...this.state.cartItem,{...item,qty:1}]
      this.setState({cartItem:cart})
      this.addToLocalStorge(cart)
    }
    
  }


  removeItem=(item)=>{
    let excit= this.state.cartItem.find((elm)=>elm.id===item.id)
    if(excit.qty >1){
      let cart=this.state.cartItem.map((elm)=>elm.id===excit.id?{...excit,qty:excit.qty-1}  :elm)
      this.setState({cartItem:cart})
      this.addToLocalStorge(cart)
    }
  }


  removeProduct=(item)=>{
       let cart=this.state.cartItem.filter((elm)=>elm.id!==item.id)
       this.setState({cartItem:cart})
       this.addToLocalStorge(cart)
  }
  render() {
    let totalQty=this.state.cartItem.reduce((x,y)=> x + y.qty,0)
    let totalPrice=this.state.cartItem.reduce((x,y)=> x + y.qty*y.price,0)
  
    return (
      <>
    
       <Navbar totalQty={totalQty} totalPrice={totalPrice} /> 
       <div className='row'>
          <div className='col-md-9'>
      
          <Products path='/home'component={Products}addItem={this.addItem}/>
         </div>
         <div className='col-md-3'>
       <Cart path='/cart'component={Cart}addItem={this.addItem} removeItem={this.removeItem} removeProduct={this.removeProduct} cartItem={this.state.cartItem}/>
       </div>
       </div>
       
      </>
    )
  }
}

