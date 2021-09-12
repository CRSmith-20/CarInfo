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
            expect(result).toEqual(["Error", "API Request failed with Error: Generic Failure"])
        })
    })
})

describe("getModelsForMake", () => {
    describe("when API call is successful", () => {
        it("should have all models", async () => {
            const models = [
                "Sonata", "Elantra", "Hotel", "Trivago"
            ]

            axios.get.mockResolvedValueOnce({data: models});

            const result = await getModelsForMake("Test");

            expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/models/' + "Test" )
            expect(result).toEqual(models);
        })
    })
})

describe("getYearsForModel", () => {
    describe("when API call is successful", () => {
        it("should have all models", async () => {
            const formattedPairs = [
                {ID: 1, Year: 1990}, {ID: 2, Year: 2220}, {ID: 3, Year: 3330}
            ]

            axios.get.mockResolvedValueOnce({data: formattedPairs});

            const result = await getYearsForModel("Test");

            expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/years/' + "Test" )
            expect(result).toEqual(formattedPairs);
        })
    })
})

describe("getCarDetails", () => {
    describe("when API call is successful", () => {
        it("should have all models", async () => {
            const returnData = [
                {Drive: 'yes', Transmission: "manual", EngineStyle: "big", Horsepower: 1, EngineRpm: 3, CityMpg: -1, HighwayMpg: -2},
                {Drive: 'bad', Transmission: "automatic", EngineStyle: "awfe", Horsepower: 10, EngineRpm: 123, CityMpg: 59999, HighwayMpg: 5},
                {Drive: 'may', Transmission: "n/a", EngineStyle: "zxcvcxz", Horsepower: 100, EngineRpm: 5432, CityMpg: -2, HighwayMpg: 4},
                {Drive: 'no', Transmission: "bad", EngineStyle: "fewafew", Horsepower: 1000, EngineRpm: 5555555, CityMpg: -3, HighwayMpg: 6},
            ]

            const formattedCarInfo = {Drive: 'yes', Transmission: "manual"}
            const formattedEngineData = [
                {Style: "big", Horsepower: 1, Rpm: 3, CityMPG: -1, HighwayMPG: -2},
                {Style: "awfe", Horsepower: 10, Rpm: 123, CityMPG: 59999, HighwayMPG: 5},
                {Style: "zxcvcxz", Horsepower: 100, Rpm: 5432, CityMPG: -2, HighwayMPG: 4},
                {Style: "fewafew", Horsepower: 1000, Rpm: 5555555, CityMPG: -3, HighwayMPG: 6},
            ]

            axios.get.mockResolvedValueOnce({data: returnData});

            const result = await getCarDetails(5);

            expect(axios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_BASE_URL + '/details/' + 5)
            expect(result.CarInfo).toEqual(formattedCarInfo);
            expect(result.EngineData).toEqual(formattedEngineData);
        })
    })
})
