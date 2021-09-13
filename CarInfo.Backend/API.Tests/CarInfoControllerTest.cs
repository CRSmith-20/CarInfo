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
  }
}
