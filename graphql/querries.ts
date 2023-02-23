import { gql } from "@apollo/client";

export const GET_ALL_FAVORITE_CRYPTO_BY_USERNAME = gql`
    query MyQuery($username: String!){
        getFavorite_cryptoListByUsername(
            username: $username
        ){
            total_market,
            name,
            image,
            price,
            rank,
            username,
            symbol,
            market_cap,
            percent,
            created_at, 
            id
        }
    }
`

export const GET_ALL_FAVORITE_CRYPTO = gql`
    query MyQuery{
        getFavorite_cryptoList{
            total_market,
            name,
            image,
            price,
            rank,
            username,
            symbol,
            market_cap,
            percent,
            created_at, 
            id
        }
    }
`