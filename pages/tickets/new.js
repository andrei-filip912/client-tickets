import React, { useState } from 'react'
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';

function NewTicket() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [doRequest, errors] = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title, price
        },
        onSuccess: () => {
            router.push('/');
        }
    })

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if(isNaN(value)) {
            return;
        }   

        setPrice(value.toFixed(2));
    };

    return (
        <div>
            <h1>Create a ticket</h1>
            <form onSubmit={onSubmit}>
                <div className='margin-bottom'>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        className='form-control'
                    />
                </div>
                <div className='margin-bottom'>
                    <label>Price</label>
                    <input 
                        value={price}
                        onBlur={onBlur} // event onLeave
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }} 
                        className='form-control' />
                </div>
                {errors}
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default NewTicket;