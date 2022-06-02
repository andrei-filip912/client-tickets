import axios from 'axios';

const buildClient = ({ req }) => {
    
    if(typeof window === 'undefined') {
        // request will be sent from server
        return axios.create({
            baseURL: 'http://ingress-nginx-srv',
            headers: req.headers
        });

    }
    else {
        // request will be sent from browser
        // no props provided bc browser handles everything
        return axios.create();
    }
}

export default buildClient;