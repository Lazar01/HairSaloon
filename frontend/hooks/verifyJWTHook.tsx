import { useEffect, useState } from "react";
import { AuthenticateJWT } from "../fetchData.js";

interface User {
  CustomerID: number;
  Name: string;
  EmailAddress: string;
  ContactNumber: string;
  Password: string;
  Role: string;
}

const useVerifyAuthentication = () => {
  const { data, refetch, error, loading } = AuthenticateJWT();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    CustomerID: -1,
    Name: "",
    EmailAddress: "",
    ContactNumber: "",
    Password: "",
    Role: "",
  });
  const [expTime, setExpTime] = useState(0);
  console.log(data);
  useEffect(() => {
    if (data && data.Message === "Authenticated") {
      setIsAuthenticated(true);
      setUser(data.user);
      setExpTime(data.ExpTime);
    } else {
      setIsAuthenticated(false);
    }
  }, [data]);

  return { isAuthenticated, user, refetch, expTime, error, loading };
};

export default useVerifyAuthentication;
