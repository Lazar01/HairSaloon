import { useAxios } from "use-axios-client";
import { useLazyAxios } from "use-axios-client";

export function getAllEmployees() {
  const { data, error, loading } = useAxios({
    url: "http://localhost:3000/getAllEmployees",
    method: "GET",
  });
  return { data, error, loading };
}

export function getAllServices() {
  const { data, error, loading } = useAxios({
    url: "http://localhost:3000/getAllServices",
    method: "GET",
  });
  return { data, error, loading };
}

export function getAllBlogs() {
  const { data, error, loading, refetch } = useAxios({
    url: "http://localhost:3000/getAllBlogs",
    method: "GET",
  });
  return { data, error, loading, refetch };
}
export function addNewBlog() {
  const [getData, { data, error, cancel }] = useLazyAxios({
    url: "http://localhost:3000/makeNewBlog",
    method: "POST",
  });
  return { getData, cancel, data, error };
}
export function editBlog() {
  const [getData, { data, error, cancel, refetch }] = useLazyAxios({
    url: "http://localhost:3000/editBlog",
    method: "POST",
  });
  return { getData, cancel, refetch, data, error };
}

export function SendEmail() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/sendEmail",
    method: "POST",
  });

  return { getData, data, error, loading }; // Export the relevant values or functions
}

export function SignUp() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/signup",
    method: "POST",
  });

  return { getData, data, error, loading };
}

export function LogIn() {
  const [getData, { data, error, loading, cancel }] = useLazyAxios({
    url: "http://localhost:3000/login",
    method: "POST",
  });

  return { getData, data, error, loading, cancel };
}

export function AuthenticateJWT() {
  const { data, error, loading, refetch } = useAxios({
    url: "http://localhost:3000/authenticateJWT",
    method: "GET",
    headers: { "access-token": localStorage.getItem("token") },
  });

  return { data, error, loading, refetch };
}
