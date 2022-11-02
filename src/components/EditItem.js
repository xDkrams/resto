import {useState} from 'react';
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";

const EditItem =({dispatch, editData}) => {
   
    const [itemData, setEditData] = useState({
        id: editData.id,
        name: editData.name,
        origin: editData.origin,
        varieties: editData.varieties,
        roast: editData.roast,
        beanType: editData.beanType,
        image: editData.image,
        price: editData.price
    })
const onType=(e)=> {
    const EditData = e.target.name;
    
    switch (EditData) {
        case "name":
            setEditData({
                ...itemData, name: e.target.value
            });
            break;
        case "origin":
            setEditData({
                ...itemData, origin: e.target.value
            });
            break;
        case "varieties":
            setEditData({
                ...itemData, varieties: e.target.value
            });
            break;
        case "roast":
            setEditData({
                ...itemData, roast: e.target.value
            });
            break;    
         case "beanType":
            setEditData({
                ...itemData, beanType: e.target.value
            });
            break;
        case "image":
            setEditData({
                ...itemData, image: e.target.value
            });
            break;
        case "price":
            setEditData({
                ...itemData, price: e.target.value
            });
            break;  
    }
}
const  handleCancel = () => {
 
}
return(
    <div> <h2> Edit </h2> 
        <forms>
                <label> Name </label>
                <input name="name" type="text" value={itemData.name}  onChange={onType}/>
                <br/>
                <label> Roast Type </label>
                <input name="roast" type="text" value={itemData.roast}  onChange={onType}/> 
                <br/>
                <label> Varieties </label>
                <input name="varieties" type="text" value={itemData.varieties} onChange={onType}/> 
                <br/>
                <label> Bean Type </label>
                <input name="beanType" type="text" value={itemData.beanType}  onChange={onType}/> 
                <br/>                
                <label> Origin </label>
                <input name="origin" type="text" value={itemData.origin} onChange={onType}/> 
                <br/>
                <label> Price </label>
                <input name="price" type="number" value={itemData.price} onChange={onType}/> 
                <br/>
                <label> Image </label>
                <input name="image" type="text" value={itemData.image} onChange={onType}/> 
                <br/>
        </forms>
        <Link to="/" ><button onClick={()=> dispatch({type: 'SET_EDIT_FLAG',payload: {editFlag: true } })}> cancel </button></Link>
        
        <Link to="/"><button onClick={()=> {dispatch({type: 'UPDATE',payload:
         {id: itemData.id, name:itemData.name, roast: itemData.roast, varieties:itemData.varieties, 
            beanType:itemData.beanType, origin:itemData.origin, price:itemData.price, image:itemData.image }}
         );
         setEditData({
            id: "",
            name: "",
            origin: "",
            varieties: "",
            roast: "",
            beanType: "",
            image: "",
            price: ''
        })
         }}> update </button></Link>
        
    </div>
);
}

export default EditItem;