import { useAxios } from "use-axios-client";
import { useLazyAxios } from "use-axios-client";

export function getAppointmentsAxios(chosenEmployee, chosenDate) {
  console.log(chosenEmployee);
  const [getAppointments, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/getAppointments",
    method: "GET",
    params: { EmployeeID: chosenEmployee, Date: chosenDate },
  });
  return { data, error, loading, getAppointments };
}

export function makeAppointment() {
  const [makeNewAppointment, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/makeAppointment",
    method: "POST",
    headers: { "access-token": localStorage.getItem("token") },
  });
  return { makeNewAppointment, data, error, loading };
}

export function getAllEmployees() {
  const { data, error, loading, refetch } = useAxios({
    url: "http://localhost:3000/getAllEmployees",
    method: "GET",
  });
  return { data, error, loading, refetch };
}
export function addNewEmployee() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/newEmployee",
    method: "POST",
  });
  return { data, error, loading, getData };
}

export function editEmployee() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/editEmployee",
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { data, error, loading, getData };
}

export function deleteEmployee() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/deleteEmployee",
    method: "DELETE",
  });
  return { data, error, loading, getData };
}

export function getAllServices() {
  const { data, error, loading, refetch } = useAxios({
    url: "http://localhost:3000/getAllServices",
    method: "GET",
  });
  return { data, error, loading, refetch };
}

export function addService() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/newService",
    method: "POST",
  });
  return { data, error, loading, getData };
}

export function editService() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/editService",
    method: "PUT",
  });
  return { data, error, loading, getData };
}

export function deleteService() {
  const [getData, { data, error, loading }] = useLazyAxios({
    url: "http://localhost:3000/deleteService",
    method: "DELETE",
  });
  return { data, error, loading, getData };
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
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { getData, cancel, data, error };
}
export function editBlog() {
  const [getData, { data, error, cancel, refetch }] = useLazyAxios({
    url: "http://localhost:3000/editBlog",
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { getData, cancel, refetch, data, error };
}
export function deleteBlog() {
  const [getData, { data, error, loading, refetch }] = useLazyAxios({
    url: "http://localhost:3000/deleteBlog",
    method: "DELETE",
  });
  return { getData, data, error, loading, refetch };
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
