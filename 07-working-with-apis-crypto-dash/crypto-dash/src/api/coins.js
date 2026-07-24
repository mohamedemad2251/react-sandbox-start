import { perPageOptions, sortByOptions } from "../consts/const";
import apiClient from "../lib/apiClient";

export const getCoins = async (perPage = perPageOptions[0].value, page = 1, sortBy = sortByOptions[0].value) => {
    const data = await apiClient.get(`coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&order=${sortBy}`);
    console.log(data);
    return data;
};

export const getCoin = async (coinId) => {
    if (!coinId) {
        throw new Error("A coin ID is required");
    };
    try {
        const data = await apiClient.get(`coins/${coinId}/?`);
        return data;
    }
    catch (error) {
        throw new Error("Failed to get coin details!");
    }
};

export const getCoinPriceChart = async (coinId, days) => {
    if (!coinId) {
        throw new Error("A coin ID is required");
    }
    else if (!days) {
        throw new Error("Number of days is required");
    }
    try {
        const data = await apiClient.get(`coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
        return data;
    }
    catch {
        throw new Error("Failed to get coin's chart details!");
    }

};