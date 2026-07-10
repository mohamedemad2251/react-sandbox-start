import { perPageOptions, sortByOptions } from "../consts/const";
import apiClient from "../lib/apiClient";

const getCoins = async (perPage = perPageOptions[0].value, page = 1, sortBy = sortByOptions[0].value) => {
    const data = await apiClient.get(`coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&order=${sortBy}`);
    console.log(data);
    return data;
};

export default getCoins;