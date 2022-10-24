import React from 'react'
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';

const TicketShow = ({ ticket }) => {
    const router = useRouter();

    const [doRequest, errors] = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id
        },
        onSuccess: (order) => router.push('/orders/[orderId]', `/orders/${order.id}`)
    });
    return (

        <div className='d-flex justify-content-sm-center align-items-center vh-100 vstack'>
            <div className='row rounded w-75 form-color p-3'>
                <div className='col'>
                    <h1>{ticket.title}</h1>
                    <h2>{ticket.date}</h2>
                    <h3>{ticket.location}</h3>
                    <p>{ticket.description}</p>
                </div>
                <div className='col-4'>
                    <div className='row mt-4 align-items-center'>
                        <h4 className='text-center'>Price: {ticket.price}</h4>
                        <button onClick={() => doRequest()} className='btn btn-primary p-2 mt-2'>Purchase</button>
                    </div>
                    <div className='row mt-4'>
                        {errors}
                    </div>
                </div>
            </div>
        </div>

    );
}
TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query; // query extracts params
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketShow;