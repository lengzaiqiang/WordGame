import { gql } from "@apollo/client";

export const GetRandomWordQuery = gql `
    query {
        GetRandomWord {
            word
        }
    }
    `;

export const CheckWordQuery = gql `
        query CheckWord($input1: String!) 
        {
            CheckWord(word : $input1) 
            {
                wordCorrect
                wordExist
                letterResult 
            }
        }
    `;
