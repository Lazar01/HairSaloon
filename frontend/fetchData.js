import { useAxios } from "use-axios-client";
import {useLazyAxios} from "use-axios-client";

export function getAppointments() {
  const { data, error, loading } = useAxios({
    url: "http://localhost:3000/getAppointments",
    method: "GET",
  });
  return { data, error, loading };
}