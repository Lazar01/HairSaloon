import { useAxios } from "use-axios-client";

export default function App(url, method) {
  const { data, error, loading } = useAxios({
    url: url,
    method:method
  });

  if (loading || !data) return "Loading...";
  if (error) return "Error!";

  return (data) 
}