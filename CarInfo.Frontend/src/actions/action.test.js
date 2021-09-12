import axios from "axios";

import { getAvailableMakes, getModelsForMake, getYearsForModel, getCarDetails } from './actions'

jest.mock("axios");

describe("getAvailableMakes", () => {
    describe("when API call is successful", () => {
        it("should return available makes", async () => {
            const makes = [
                "Hyundai", "Ford", "Volkswagen", "Toyota"
            ]

            axios.get.mockResolvedValueOnce(makes);

            const result = await getAvailableMakes();

            expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/make')
        });
    });
})