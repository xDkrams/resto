import {useState} from 'react';
import  {v4 as uuidv4} from "uuid";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";


const AddItems = ({dispatch, flag}) => {
    const [newItem, setNewItem] = useState({
        id: "",
        name: "",
        origin: "",
        varieties: "",
        roast: "",
        beanType: "",
        image: "",
        price: ""
    });
    const onType = (e) => {
       const inputName= e.target.name;
       switch(inputName) {
        case "name":
            setNewItem({...newItem, name: e.target.value,});
            break;
        case "origin":
            setNewItem({...newItem, origin: e.target.value,});
            break;
        case "varieties":
            setNewItem({...newItem, varieties: e.target.value,});
            break;
        case "roast":
            setNewItem({...newItem, roast: e.target.value,});
            break;
       case "beanType":
            setNewItem({...newItem, beanType: e.target.value,});
            break;
        case "price":
            setNewItem({...newItem, price: e.target.value,});
            break;
        case "image":
            setNewItem({...newItem, image: e.target.value,});
            break;
        default:
            break;
       }
    }
    return(
        <div className="newItemCont">
            <h2> ADD NEW ITEM </h2>
            <forms>
                <input name="name" type="text" placeholder="Name of Coffee" onChange={onType}/>
                <br/>
                <input name="varieties" type="text" placeholder='Robusta/Liberica/Arabica' onChange={onType}/> 
                <br/>
                <input name="roast" type="text" placeholder="Medium / Dark" onChange={onType}/> 
                <br/> 
                <input name="beanType" type="text"placeholder="Whole/Ground" onChange={onType}/> 
                <br/>         
                <input name="origin" type="text" placeholder="Origin" onChange={onType}/> 
                <br/>
                <input name="price" type="Number" placeholder="Price" onChange={onType}/> 
                <br/>
                <input name="image" type="text" placeholder="Image Url" onChange={onType}/> 
                <br/>
            </forms>
            <Link to="/"><button className="BtnNewItem" onClick={()=> dispatch({type: 'SET_FLAG',payload: {flag: !flag} })}> CANCEL </button></Link>
            <Link to="/"><button className="BtnNewItem" onClick={()=> {dispatch({type: "ADD_ITEM", 
            payload: {id: uuidv4(), name:newItem.name, origin:newItem.origin, varieties:newItem.varieties,
            roast:newItem.roast, beanType:newItem.beanType, image:newItem.image, price:newItem.price}
            });  
            setNewItem({
                id: "",
                name: "",
                origin: "",
                varieties: "",
                roast: "",
                beanType: "",
                image: "",
                price: 0
            })

            }}> ADD ITEM
            </button></Link>
            
        </div>
    );
}  
export default AddItems;