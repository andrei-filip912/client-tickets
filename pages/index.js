import Link from 'next/link';
import Image from 'next/image';
import bg from '../public/bg.jpg';
import sadImage from '../public/sad.png';
import { useRouter } from 'next/router';
import React from 'react';

const Index = ({ currentUser, tickets }) => {
    const getDateString = (string) => {
        const date = new Date(string);
        return date.getDay() + '/' + (date.getMonth() +1) + '/' + date.getFullYear() + ' ' + date.getUTCHours() + ':' + date.getMinutes();
    }
    const router = useRouter();

    const ticketList = tickets.map(ticket => {
        return (
            <div key={ticket.id} className="col">
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{ticket.title}</h5>
                        <p className="card-text">{getDateString(ticket.date)}</p>
                        <p className="card-text">{ticket.location}</p>
                        <p className="card-text"><b>{ticket.price}€</b></p>
                        <p className="card-text ticket-description"><b>Description:</b><br/>{ticket.description}</p>
                        <a onClick={() => router.push('/tickets/[ticketId]', `/tickets/${ticket.id}`)} className="btn btn-primary">Buy</a>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className='pb-4 vh-80'>
            <div className="concert-img rounded" >
                <Image src={bg} alt='...' placeholder="blur"></Image>
            </div>

            <div className='filters d-md-flex mb-md-2 mb-sm-5'>
                <input type='text' placeholder='Search' className='me-md-auto form-control form-width mb-sm-2' ></input>

                <input type='date' placeholder='dd-MM-yyyy' className=' form-control form-width '></input>
            </div>
            {
                tickets.length ? (
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {ticketList}
                    </div>
                )
                    :
                    (
                        <div className="d-flex flex-column justify-content-center align-items-center vh-40 ">
                            <div className='sad-icon pb-5 text-center'>
                                <Image src={sadImage}></Image>
                                <p>No tickets found</p>
                            </div>
                        </div>
                    )
            }

        </div>
    );

}
Index.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
}
export default Index;