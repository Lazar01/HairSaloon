interface Error {
  email: string;
  name: string;
  password: string;
}

interface Values {
  email: string;
  password: string;
  name?: string;
}

export default function Validation(values: Values) {
  let error: Error = { email: "", password: "", name: "" };
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.email === "") {
    error.email = "Email should not be empty!";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  } else {
    error.email = "";
  }

  if (values.name === "") {
    error.name = "Name should not be empty!";
  } else {
    error.name = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty!";
  }
  // else if(!password_pattern.test(values.password))
  // {
  //     error.password = "Password didn't match!";
  // }
  else {
    error.password = "";
  }
  return error;
}
