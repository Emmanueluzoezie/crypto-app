import { gql } from "@apollo/client";

export const ADD_FAVORITE_CRYPTO = gql`
    mutation MyMutation(
        $total_market: Float
        $name: String
        $image: String
        $price: Float
        $rank: Float
        $username: String
        $symbol: String
        $market_cap: Float
        $percent: Float
    ){
        insertFavorite_crypto(
            name: $name
            image: $image
            price: $price
            total_market: $total_market
            rank: $rank
            username: $username
            symbol: $symbol
            market_cap: $market_cap
            percent: $percent
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

export const DELETE_FAVORITE_CRYPTO = gql`
    mutation MyMutation($name:String!){
        deleteFavorite_crypto(
            name: $name
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