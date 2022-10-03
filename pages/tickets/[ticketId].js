import React from 'react'

const TicketShow = ({ ticket }) => {
  return (
    <div>
        <h1>{ticket.title}</h1>
        <h4>Price: {ticket.price}</h4>
    </div>
  );
}
TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query; // query extracts params
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketShow;