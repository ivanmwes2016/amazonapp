import React, { useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Row} from './components.styled'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

function ProductScreen() {

    const params = useParams();
    const {slug} = params

    const [{ loading, error, product }, dispatch] = useReducer(reducer,
        {
            product: [],
            loading: true,
            error: '',
        })


    useEffect(() => {
        const fetchdata = async () => {
            dispatch({ type: 'FETCH_REQUEST' })

            try {
                const result = await axios.get(`http://localhost:7777/api/products/${slug}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        fetchdata()
    }, [slug])



    // const params = useParams()
    // const { slug } = params
    return (
        
            loading? <div>Loading...</div>
            : error? <div>{error}</div>
            :
            <div>
                <Row>
                    <img src={product.image} alt={product.name}/>
                </Row>
            </div>

    )
}

export default ProductScreen;
