import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const DATA = gql`
  {
    hello
  }
`;

  function Test() {
  const { loading, error, data } = useQuery(DATA);
    console.log(data)
 return(
     <div>

     </div>
 )
}

export default Test