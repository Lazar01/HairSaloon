import { useAxios } from "use-axios-client";
import {useLazyAxios} from "use-axios-client";

export function getAllEmployees() {
  const { data, error, loading } = useAxios({
    url: "http://localhost:3000/getAllEmployees",
    method: "GET",
  });
  return { data, error, loading };
}