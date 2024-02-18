import { useEffect, useState } from "react";
import { AuthenticateJWT } from "../fetchData.js";

interface User {
  CustomerID: number;
  Name: string;
  EmailAddress: string;
  ContactNumber: string;
  Password: string;
}

const useVerifyAuthentication = () => {
  const { data, refetch, error } = AuthenticateJWT();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    CustomerID: -1,
    Name: "",
    EmailAddress: "",
    ContactNumber: "",
    Password: "",
  });
  useEffect(() => {
    if (data && data.Message === "Authenticated") {
      setIsAuthenticated(true);
      setUser(data.user);
    } else {
      setIsAuthenticated(false);
    }
  }, [data]);

  return { isAuthenticated, user, refetch };
};

export default useVerifyAuthentication;
