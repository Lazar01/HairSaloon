import { useEffect, useState } from 'react';
import {AuthenticateJWT} from "../fetchData.js"
const useVerifyAuthentication = () => {
  const { data, loading, error } = AuthenticateJWT();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(-1);
  useEffect(() => {
    if (data && data.Message === "Authenticated") {
      {
        setIsAuthenticated(true);
        setUserID(data.userID)
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [data]);
  return {isAuthenticated, userID};
};

export default useVerifyAuthentication;