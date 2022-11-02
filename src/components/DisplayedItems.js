import '../App.css';
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import {RiDeleteBin6Line,RiShoppingCart2Line,RiEditLine} from 'react-icons/ri'



const DisplayedItems = ({flag,getIdInfo,name, price, image,id, varieties, roast, origin, beanType,dispatch}) => {
  console.log(flag)
    return(
        <div> 
            <div className='PerItems'>
                <div className='itemName'>
                    <img className ="Items" src ={image} alt ="coffee"/>
                    <p > {`${name.toUpperCase()}`}</p>
                </div>
                <div className="bb">
                    <Link to="EditItem"> <button onClick={() => {getIdInfo(id)}}> <RiEditLine/> </button></Link>
                    <button onClick={()=> {dispatch({type: 'ADD_CART',payload: {id: id} })
                                                           dispatch({type: 'SET_FLAG',payload: {flag: !flag} })
                     }}> <RiShoppingCart2Line/> </button>
                </div>
                <div className="d">
                        <button className="DeLBtn" onClick={()=> {
                            dispatch({type: 'DELETE', payload: {id: id} }) 
                            dispatch({type: 'DELETE_CART', payload: {id: id} })
                            }}>
                            <RiDeleteBin6Line/>
                        </button>
                    </div>
                <div className="ItemDetails">
                    <p className="coffeeType">{varieties}</p>
                    <p>{`${origin}`}</p>
                    <p>{`${roast} Roast`}</p>
                    <p> {`PHP ${price}`}</p> 
                </div>
            </div>
        </div>
    );

}
export default DisplayedItems;