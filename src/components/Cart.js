import {TiCancelOutline} from 'react-icons/ti'


const Cart = ({stateCart,dispatch, name, price, image,id, varieties, roast, origin})=> {
   
    const data = stateCart.filter((item) => item.id === id)
    const qty = data[0].qty
   
    return( 
    <div className="PerItemsCart">
        <div className="cartDetails">
            <div className="a">
                <img className ="Items" src ={image} alt ="coffee"/><br/>
                <button className="btn" onClick={() => dispatch({ type: "DECREMENT_QTY", payload:{id: id} })}>-</button>
                <input type="text" placeholder="qty " value={qty} disabled="true" />
                <button className="btn" onClick={() => dispatch({ type: "INCREMENT_QTY", payload:{id: id} })}>+</button>
                <p>{`SUBTOTAL: ${price * qty}`} </p>
            </div>
            <div className="b">
                <p> {`${varieties} Coffee`}</p>
                <p>{`${roast} Roast`}</p> 
                <p>{`${origin}`}</p>
                <p> {`PHP ${price}`}</p> 
                <button className="cartCancel"onClick={()=> dispatch({type: 'DELETE_CART', payload: {id: id} })}><TiCancelOutline size={35}/></button>
            </div>
        </div>
    </div>
);
}
export default Cart;