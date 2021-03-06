import React from 'react';
import "./../../styles/Form.css";
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            img:'',
            name:'',
            price:0,
            redirect:false,
            editStatus:false

        }
        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleReset= this.handleReset.bind(this);
    }
    componentDidMount(){
        const {id}= this.props.match.params;
        axios.get(`/api/products/${id}`)
        .then(response=>{
            this.setState({img:response.data[0].img,
            name:response.data[0].name,
            price:response.data[0].price,
            editStatus:true })
        })
    }

    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value})
           
    }
    handleReset(){
        this.setState({
            img:'',
            name:'',
            price:0,
            redirect:true
        })
    }
    handleAdd=(e)=>{
        e.preventDefault();
        const {img,name,price}= this.state;
        let newProduct ={img,name,price}        
        axios.post('/api/product',newProduct)
        .then(response=>{
            this.setState({redirect:true})
        }) 
    }
    handleUpdate=(id)=>{
        const {img,name,price}= this.state;
        let body= {img,name,price}
        axios.put(`/api/products/${id}`,body)
        .then(response=>
            console.log(response))       

    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        const {id}= this.props.match.params;      

        return(
         
            <form className="form-container">
                <img alt="product_image" src={this.state.img} className="form-image"/>
                <h4>Image url:</h4>
                <input name="img" value={this.state.img} onChange={this.handleInputChange}/>
                <h4>Product Name:</h4>
                <input name="name" value={this.state.name} onChange={this.handleInputChange}/>
                <h4>Price:</h4>
                <input name="price" value={this.state.price} onChange={this.handleInputChange}/>

                { this.state.editStatus ? (
                <div className="button-container">
                <button onClick={this.handleReset}>Cancel Edit</button>
                <Link to="/"><button onClick={()=>this.handleUpdate(id)}>Save Changes</button></Link>
                </div>
                )
                :(
                <div className="button-container">
                <button onClick={this.handleReset}>Cancel</button>
                <button onClick={this.handleAdd}>Add to Inventory</button>
                </div>
                )
                }


               

            </form>
        )
    }
}
export default Form;