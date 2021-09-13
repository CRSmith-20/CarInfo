using CarInfo.Backend.API.Models;
using CarInfo.Backend.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using Xunit;
using Moq;
using CarInfo.Backend.DataAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace API.Tests {
  public class CarInfoControllerTest {
    public IConfiguration _config;
    [Fact]
    public void GetCarMake_ReturnsOK() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetMake()).Returns("[\"Hyundai\"]");

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;
      
      var result = controller.GetCarMake();
      Assert.IsType<OkObjectResult>(result);
      
      var okResult = result as OkObjectResult;
      Assert.Equal("[\"Hyundai\"]", okResult.Value);
    }

    [Fact]
    public void GetCarMake_InvalidQuery_ReturnsBadRequest() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetMake()).Returns(string.Empty);

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetCarMake();
      Assert.IsType<BadRequestObjectResult>(result);

      var badResult = result as BadRequestObjectResult;
      Assert.Equal("No available Makes", badResult.Value);
    }

    [Fact]
    public void GetModelForMake_ReturnsOK() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetModel(It.IsAny<string>())).Returns("[\"Sonata\"]");

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetModelForMake("Hyundai");
      Assert.IsType<OkObjectResult>(result);

      var okResult = result as OkObjectResult;
      Assert.Equal("[\"Sonata\"]", okResult.Value);
    }

    [Fact]
    public void GetModelForMake_InvalidQuery_ReturnsBadRequest() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetModel(It.IsAny<string>())).Returns(string.Empty);

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetModelForMake("Garbage");
      Assert.IsType<BadRequestObjectResult>(result);

      var badResult = result as BadRequestObjectResult;
      Assert.Equal("No available models for make Garbage", badResult.Value);
    }

    [Fact]
    public void GetYearsForModel_ReturnsOK() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetYears(It.IsAny<string>())).Returns("[1738]");

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetYearsForModel("NickCage");
      Assert.IsType<OkObjectResult>(result);

      var okResult = result as OkObjectResult;
      Assert.Equal("[1738]", okResult.Value);
    }

    [Fact]
    public void GetYearsForModel_InvalidQuery_ReturnsBadRequest() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetYears(It.IsAny<string>())).Returns(string.Empty);

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetYearsForModel("Future");
      Assert.IsType<BadRequestObjectResult>(result);

      var badResult = result as BadRequestObjectResult;
      Assert.Equal("No available years for model Future", badResult.Value);
    }
 
    [Fact]
    public void GetCarInfo_ReturnsOK() {
      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetCarDetails(It.IsAny<int>())).Returns("[{\"Drive\":\"AWD\",\"Transmission\":\"Automatic\",\"EngineStyle\":null,\"Horsepower\":300,\"EngineRpm\":7000,\"CityMpg\":2.0,\"HighwayMpg\":4.0}]");

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetCarInfo(4);
      Assert.IsType<OkObjectResult>(result);

      var okResult = result as OkObjectResult;
      Assert.Equal("[{\"Drive\":\"AWD\",\"Transmission\":\"Automatic\",\"EngineStyle\":null,\"Horsepower\":300,\"EngineRpm\":7000,\"CityMpg\":2.0,\"HighwayMpg\":4.0}]", okResult.Value);
    }

    [Fact]
    public void GetCarInfo_InvalidQuery_ReturnsBadRequest() {

      var options = new DbContextOptionsBuilder<CarDBContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options;

      var mockInfoAccessor = new Mock<CarInfoAccessor>(new CarDBContext(options, _config));
      mockInfoAccessor.Setup(x => x.GetCarDetails(It.IsAny<int>())).Returns(string.Empty);

      var controller = new CarInfoController(new CarDBContext(options, _config));
      controller.carInfoAccessor = mockInfoAccessor.Object;

      var result = controller.GetCarInfo(4);
      Assert.IsType<BadRequestObjectResult>(result);

      var badResult = result as BadRequestObjectResult;
      Assert.Equal("No available details for id 4", badResult.Value);
    }
  }
}