import axios from "axios";

import { getAvailableMakes, getModelsForMake, getYearsForModel, getCarDetails } from './actions'

jest.mock("axios");

describe("getAvailableMakes", () => {
    describe("when API call is successful", () => {
        it("should return available makes", async () => {
            const makes = [
                "Hyundai", "Ford", "Volkswagen", "Toyota"
            ]

            axios.get.mockResolvedValueOnce({data: makes});

            const result = await getAvailableMakes();

            expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/make')
            expect(result).toEqual(makes);
        });
    });
    describe("when API call fails", () => {
        it("should return an error", async () => {
            axios.get.mockRejectedValueOnce(new Error("Generic Failure"));

            const result = await getAvailableMakes();

            expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/make')
            expect(result).toEqual("API Request failed with: Error: Generic Failure")
        })
    })
})