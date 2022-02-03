import axios from "axios";
import dayjs from "dayjs";
import { Country } from "../types/country";
import { TResponseGetCases } from "../types/response";

const baseURL = "https://api.covid19api.com/";
const instance = axios.create({
  baseURL,
});

const getCountries = () => instance.get<Country[]>("/countries");
const getCasesByCountry = (
  slug: string,
  params: { from: string; to: string }
) => instance.get<TResponseGetCases>(`dayone/country/${slug}`, { params });

const api = {
  getCountries,
  getCasesByCountry,
};

export default api;
