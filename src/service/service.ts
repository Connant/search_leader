import axios from "axios";
import { CardsType } from "../types/common_types";

const url = axios.create({
  baseURL: `/cards.mock.json`,
});

export const api = {
  getProducts(): Promise<CardsType> {
    return url.get<CardsType>(``)
    .then((res) => res.data);
  },
};
