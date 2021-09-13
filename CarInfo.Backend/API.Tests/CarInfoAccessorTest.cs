using CarInfo.Backend.API.Models;
using CarInfo.Backend.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using Xunit;

namespace API.Tests {
  public class CarInfoAccessorTest {
    private IConfiguration _config;
    [Fact]
    public void GetMake_ValidMake_Returns() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      using (var context = new CarDBContext(options, _config)) {
        SeedDataForDatabase(context);
      }
      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetMake();
      Assert.Equal("[\"Hyundai\",\"Byundai\",\"Dyundai\"]", results);
    }

    [Fact]
    public void GetMake_InvalidMake_ReturnsEmpty() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetMake();
      Assert.Equal("", results);
    }


    [Fact]
    public void GetModel_ValidMake_ReturnsJson() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      using(var context = new CarDBContext(options, _config)) {
        SeedDataForDatabase(context);
      }
      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetModel("Hyundai");
      Assert.Equal("[\"Forester\",\"Borester\",\"Eorester\"]", results);
    }

    [Fact]
    public void GetModel_InvalidMake_ReturnsEmpty() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetModel("DNE");
      Assert.Equal("", results);
    }

    [Fact]
    public void GetYears_ValidModel_ReturnsJson() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      using(var context = new CarDBContext(options, _config)) {
        SeedDataForDatabase(context);
      }
      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetYears("Dorester");
      Assert.Equal("[{\"ID\":4,\"Year\":1980},{\"ID\":5,\"Year\":1982},{\"ID\":6,\"Year\":1983}]", results);
    }

    [Fact]
    public void GetYears_InvalidModel_ReturnsEmpty() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetYears("Dorester");
      Assert.Equal("", results);
    }

    [Fact]
    public void GetCarDetails_ValidId_ReturnsJson() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      using(var context = new CarDBContext(options, _config)) {
        SeedDataForDatabase(context);
      }
      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetCarDetails(2);

      Assert.Equal("[{\"Drive\":\"AWD\",\"Transmission\":\"Automatic\",\"EngineStyle\":null,\"Horsepower\":300,\"EngineRpm\":7000,\"CityMpg\":2.0,\"HighwayMpg\":4.0}]", results);
    }

    [Fact]
    public void GetCarDetails_InvalidId_ReturnsEmpty() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
              .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

      var x = new CarInfoAccessor(new CarDBContext(options, _config));
      var results = x.GetCarDetails(2);
      Console.WriteLine(results);
      Assert.Equal("", results);
    }

    private void SeedDataForDatabase(CarDBContext context) {
      context.CarMakeModels.Add(new CarMakeModel { Make = "Hyundai", Model = "Forester", ModelYear = 1992 });
      context.CarMakeModels.Add(new CarMakeModel { Make = "Hyundai", Model = "Borester", ModelYear = 1992 });
      context.CarMakeModels.Add(new CarMakeModel { Make = "Hyundai", Model = "Eorester", ModelYear = 1992 });

      context.CarMakeModels.Add(new CarMakeModel { Make = "Byundai", Model = "Dorester", ModelYear = 1980 });
      context.CarMakeModels.Add(new CarMakeModel { Make = "Byundai", Model = "Dorester", ModelYear = 1982 });
      context.CarMakeModels.Add(new CarMakeModel { Make = "Byundai", Model = "Dorester", ModelYear = 1983 });
      
      context.CarMakeModels.Add(new CarMakeModel { Make = "Dyundai", Model = "Corester", ModelYear = 1000 });
      context.CarDetails.Add(new CarDetail { CarId = 1, Drive = "FWD", Transmission = "Manual" });
      context.CarDetails.Add(new CarDetail { CarId = 2, Drive = "AWD", Transmission = "Automatic" });
      context.CarDetails.Add(new CarDetail { CarId = 3, Drive = "4WD", Transmission = "Combo" });
      context.EngineDetails.Add(new EngineDetail { CarId = 1, Horsepower = 200, EngineRpm = 6000, CityMpg = 1, HighwayMpg = 3 });
      context.EngineDetails.Add(new EngineDetail { CarId = 2, Horsepower = 300, EngineRpm = 7000, CityMpg = 2, HighwayMpg = 4 });
      context.EngineDetails.Add(new EngineDetail { CarId = 3, Horsepower = 400, EngineRpm = 8000, CityMpg = 3, HighwayMpg = 5 });
      context.SaveChanges();
    }
  }
}
