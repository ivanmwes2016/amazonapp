import { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger' //for debugging 
import axios from 'axios'
// import data from './data'

function reducer (state, action) {
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading:true}
        case 'FETCH_SUCCESS':
            return {...state, products:action.payload, loading:false}
        case 'FETCH_FAIL':
            return {...state, loading:false, error:action.payload}
        default:
            return state
    }
}


export default function HomeScreen(){
    const [currency] = useState('£')
    // const [products, setProducts] = useState([])
    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), 
            {
                products:[],
                loading:true,
                error:'',
            }
        )

    useEffect( () => {
        const fetchdata = async () => {
            dispatch({type:'FETCH_REQUEST'})
            
            try{
                const result= await axios.get('http://localhost:7777/api/products')
                dispatch({type:'FETCH_SUCCESS', payload:result.data})                
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload:err.message})
            }
        }
        fetchdata()
    }, [])

    return(
        <div>
            <main>
                <h1>Featured Products</h1>
                <div className='products'>
                    {products.map(product => (
                        <div className='product' key={product.slug}>
                            <img src={product.image} alt={product.name} />
                            <div className='product-info'>
                                <Link to={`/product/${product.slug}`}><p>{product.name}</p></Link>
                                <p><strong>{currency}{product.price}</strong></p>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}