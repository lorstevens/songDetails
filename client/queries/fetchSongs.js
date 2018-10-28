import gql from 'graphql-tag';


//make sure you use the ``      
//Not actually running the query. Just defining the query
export default gql `
{
    songs{
        id
        title
    }
}
`;
