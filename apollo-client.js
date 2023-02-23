import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://gouda.stepzen.net/api/unrealized-bumblebee/__graphql',
    headers: { 'Authorization': `apikey ${process.env.NEXT_PUBLIC_CRYPTO_STEPZEN_APIKEY}` },
    cache: new InMemoryCache(),
});

export default client;