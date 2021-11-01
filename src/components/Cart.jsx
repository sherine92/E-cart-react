import React, { Component } from 'react'

export default class Cart extends Component {

    render() {
        console.log(this.props.cartItem);
        return (
            <>
                <div>
                    <h2 className='cartTitle my-5 '>Cart Item</h2>
                    {this.props.cartItem.length === 0 ? <h5>Cart is Empty</h5> : ''}
                    {this.props.cartItem.map((value, index) => {
                        return (
                            <div key={value.id}>
                                <div className="cartItem overflow-hidden text-center ">
                                    <div className="cart-img float-left px-2">
                                        <img className='w-100' src={value.image} alt="" />
                                    </div>
                                    <div className="cart-action float-left ">
                                        <h6>{value.title}</h6>
                                        <p className='price'>${value.price * value.qty}</p>
                                        <button onClick={() => {
                                            this.props.addItem(value)
                                        }} className='btn btn-info'>+</button>
                                        <span className='px-3'>{value.qty}</span>
                                        <button onClick={() => {
                                            this.props.removeItem(value)
                                        }} className='btn btn-danger'>-</button>
                                        <button onClick={() => {
                                            this.props.removeProduct(value)
                                        }} className='btn btn-danger ml-3'><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )

                    })}

                </div>
            </>
        )
    }
}
