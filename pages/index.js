import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
}
Index.getInitialProps = async ({ req }) => {
    console.log('landing page');
    const client = buildClient({ req });
    const { data } = await client.get('/api/users/currentuser');
    return data;
}
export default Index;