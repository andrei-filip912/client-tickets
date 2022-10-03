import React, {useEffect, useState} from 'react';

function OrderShow({ order }) {
    
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft(); // calling function so it does not get called 1s later
        const timerId = setInterval(findTimeLeft, 1000);

        // function is called when navigating away from the page
        return () => {
            clearInterval(timerId);
        }
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }
    return (
        <div>Time left to pay: {timeLeft} seconds</div>
    )
}
OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
}
export default OrderShow