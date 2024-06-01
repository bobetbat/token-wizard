import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const endpoint = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
const headers = {
  "content-type": "application/json",
  // "Authorization": "<token>"
};
interface Query {
  query: string;
}
export const getItems: Query = {
  "query": `{
    pairs {
      id
    }
  }`,
};


export const useGraph = (graphqlQuery: Query) => {
  const [data, setData] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          "method": "POST",
          "headers": headers,
          "body": JSON.stringify(graphqlQuery)
        };
        const response = await fetch(endpoint, options);
        const data = await response.json();
        console.log('providers.getDefaultProvider()',)

        setData(data);
        console.log("fetch data:", data);
      } catch (error) {
        console.log("error Contract:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};

