import './App.css';
import  {v4 as uuidv4} from "uuid";
import DisplayedItems from './components/DisplayedItems';
import { useReducer, } from 'react';
import AddItems from './components/AddItems';
import EditItem from './components/EditItem';
import Cart from './components/Cart';
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";


const App =() => {
  const initialState ={
    items: [
      {
        id: uuidv4(),
        name: "Excelsa-dark",
        origin: "Cavite/Batangas",
        varieties: "Excelsa",
        roast: "Dark",
        beanType: "whole",
        image: "https://learn.bluecoffeebox.com/wp-content/uploads/2018/09/Coffee-beans-varietals.jpg",
        price: 400,
      },
      {
        id: uuidv4(),
        name: "Robusta-dark",
        origin: "Sagada",
        varieties: "Robusta",
        roast: "Dark",
        beanType: "whole",
        image: "https://media.karousell.com/media/photos/products/2022/4/21/benguet_coffee_beans_1650526919_be4a27af_progressive.jpg",
        price: 650,
      },
      {
        id: uuidv4(),
        name: "arabica-Medium",
        origin: "Benguet",
        varieties: "Arabica",
        roast: "Medium",
        beanType: "whole",
        image: "https://cdn.shopify.com/s/files/1/0494/9157/4947/products/medium_150x.jpg?v=1608415767",
        price: 450,
      },
      {
        id: uuidv4(),
        name: "Liberica-Dark",
        origin: "Batangas",
        varieties: "Liberica",
        roast: "Dark",
        beanType: "whole",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLB5cddX1Q8W7q9SWih9VSd2M6ZOMRrh8DqrLYrwtO0KNh2gIDGBaYCaxIIWJSa8_TDE&usqp=CAU",
        price: 350,
      },
    ],
    editFlag: false,
    flag : false,
    filteredVarieties : "All Coffee Varieties",
    cart: [],
    editData : {
      id: "",
      name: "",
      origin: "",
      varieties: "",
      roast: "",
      beanType: "",
      image: "",
      price: ""
    },
    totalAmount:0,
    }

 const reducer = (state, action) => {
    switch (action.type) {
    case `DELETE` :
      return {...state, items: state.items.filter((item) => item.id !== action.payload.id) };
    case `ADD_CART`  : 
        const filtered = state.cart.filter((item)=> item.id === action.payload.id)
        if(filtered.length > 0){
            const updatedCart = state.cart.map((item) => {
              if(item.id === action.payload.id) {
                return {...item, qty: item.qty+1}
              } return item;
            })
              return {...state, cart: updatedCart }
        }else{
          const targetItem = state.items.filter((item)=> item.id === action.payload.id)
          const newItem = {...targetItem[0], qty: 1}
          return {...state, cart: [...state.cart, newItem]}
        }
    case 'ADD_ITEM':
      const checkId= state.items.filter((item)=> item.name.trim().toLowerCase() === action.payload.name.trim().toLowerCase()) 
      if(checkId.length>0) {
        alert(`Coffee name already registered`)
        return state
      }else{
        return {...state, items: [action.payload,...state.items]}
      }
    case `EDIT` :
      return {...state, editFlag: true, editData: action.payload}
    case `UPDATE`:
      const updatedItem = state.items.map((item) => {
        if(item.id === action.payload.id) {
          return action.payload
        }return item
      })
      const updatedCart = state.cart.map((item) => {
        if(item.id === action.payload.id) {
          return {...item,...action.payload}
        }return item
      })
      return {...state, editFlag:false, items: updatedItem, cart: updatedCart}
    case "INCREMENT_QTY":
      const checkCartIdInc = state.cart.filter((item)=> item.id === action.payload.id) 
      if(checkCartIdInc.length > 0){
        const updatedCartQty = state.cart.map((item) => {
          if(item.id === action.payload.id) {
            return {...item, qty: item.qty+1}
          } return item;
        })
        return {...state, cart: updatedCartQty}
      }
    case "DECREMENT_QTY":
      const checkCartIdDec = state.cart.filter((item)=> item.id === action.payload.id) 
      let deleteFlag = false
      const cartCheck = checkCartIdDec[0]
      if(checkCartIdDec.length > 0){
        let updatedCartQty = state.cart.map((item) => {
          if(item.id === action.payload.id) {
            if(item.qty - 1 > 0){
              return {...item, qty: item.qty-1}
            }
            deleteFlag = true
          } 
          return item;
        })
        if(deleteFlag === true) {
          updatedCartQty = updatedCartQty.filter((item) => item.id !== action.payload.id)
        }
        return {...state, cart: updatedCartQty }
      }
    case "DELETE_CART":
      return {...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };
    case "SET_FILTERED_VARIETIES":
      return {...state, filteredVarieties:action.payload.varieties}
    case "SET_FLAG":
      return {...state, flag:action.payload.flag}
    case "SET_EDIT_FLAG":
      return {...state,editFlag:action.payload.flag}
    default:
      break;
    }
 }

const [state, dispatch] = useReducer(reducer, initialState);


const handleFiltereVarieties =(varies) => {
     dispatch({type: "SET_FILTERED_VARIETIES", payload: {varieties: varies}})
 }
 
 const newVarieties = () => {
   const newVariety = ["All Coffee Varieties"]
   state.items.map((item) => {
     if(newVariety.indexOf(item.varieties) < 0) {
      newVariety.push(item.varieties);
     }
     return item;
   })
   return newVariety;
 }
 const newVariety = newVarieties(); 

 const getIdInfo = (id) => {
  const itemId= state.items.filter((item) => item.id === id)
  dispatch({type: "EDIT", payload: itemId[0]})
}

 const getCartTotal = () => {
    let cartTotal = 0;
    state.cart.map((item) => {cartTotal += ( item.price * item.qty)})
    return cartTotal  
 }

 const total = getCartTotal()

  return(
    <div className="App">
      <nav> 
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AddCart">Add New Items</Link>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <div className='filter'>
          {!state.flag ?  <select value={state.filteredVarieties} onChange={(e)=> handleFiltereVarieties(e.target.value)}> 
            {newVariety.map((varie)=> (
              <option value = {varie}> {varie} </option> 
            ))}
          </select>:<p></p> }
        </div>
        
  <div className ="DisplayItems">
    <Routes>
       
        <Route path="/" element= {state.items.map((coffee) => 
            ( state.filteredVarieties === `All Coffee Varieties`||
            state.filteredVarieties === coffee.varieties)&& (
              <DisplayedItems 
                key={coffee.id}
                id={coffee.id}
                name={coffee.name}
                price={coffee.price}
                image={coffee.image}
                varieties={coffee.varieties}
                beanType={coffee.beanType}
                roast={coffee.roast}
                origin={coffee.origin}
                dispatch={dispatch}
                getIdInfo= {getIdInfo}
                flag ={state.flag}
            />) 
            )}/>
      
        <Route path="AddCart" element = {<AddItems dispatch={dispatch} />}/>
        <Route path="EditItem" element = {<EditItem dispatch={dispatch} state={state} editData = {state.editData}/>}/>        
        
    </Routes>
 
  </div>
      </div>
  
      
      
      <div className='cartCont'>
        {total === 0 ? <p> </p>:<div id="totalCont">
          <p id="amount"> {`TOTAL AMOUNT: ${total}`}</p>
        </div>}
        <div className="DisplayItemsCart">
        {state.cart.map((newCart,index) => (
          <Cart
          key={newCart.index}
          id={newCart.id}
          name={newCart.name}
          price={newCart.price}
          image={newCart.image}
          varieties={newCart.varieties}
          beanType={newCart.beanType}
          roast={newCart.roast}
          origin={newCart.origin}
          dispatch ={dispatch} 
          stateCart = {state.cart}
          
          />
        )
        )}
        </div>


        
      </div>
    </div>
  );
}

export default App;
