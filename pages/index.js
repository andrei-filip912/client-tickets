import Link from 'next/link';
import Image from 'next/image';
import bg from '../public/bg.jpg';
// import ticket from '../public/ticket.jpg';
import { useRouter } from 'next/router';

const Index = ({ currentUser, tickets }) => {
    const router = useRouter();

    const ticketList = tickets.map(ticket => {
        return (
            <div key={ticket.id} className="col">
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{ticket.title}</h5>
                        <p className="card-text">Price: {ticket.price}.</p>
                        <a onClick={() => router.push('/tickets/[ticketId]', `/tickets/${ticket.id}`)} className="btn btn-primary">Buy</a>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="concert-img rounded" >
                <Image src={bg} alt='...' placeholder="blur"></Image>
            </div>

            <div className='filters d-md-flex'>
                    <input type='text' placeholder='Search' className='me-md-auto form-control form-width ' ></input>

                    <input type='date' placeholder='dd-MM-yyyy' className=' form-control form-width'></input>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4">
                {ticketList}
            </div>
        </div>
    );

}
Index.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
}
export default Index;