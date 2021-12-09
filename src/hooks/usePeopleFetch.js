import { useState, useEffect } from "react";
import axios from "axios";
import {results} from './usersArray';
export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
     fetchUsers();
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
   setUsers(response.data.results);
    

  }, []);

  async function fetchUsers() {
    // setIsLoading(true);
    // const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    // setIsLoading(false);
    // setUsers(results);
  //  setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};

