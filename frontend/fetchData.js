import { useAxios } from "use-axios-client";

export default function App(url, method) {
  const { data, error, loading } = useAxios({
    url: url,
    method: method
  });

  return { data, error, loading };
}