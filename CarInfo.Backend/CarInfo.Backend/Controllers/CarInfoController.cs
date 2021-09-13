using CarInfo.Backend.DataAccess;
using CarInfo.Backend.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CarInfo.Backend.Controllers {

  public class CarInfoController : Controller {
    public CarInfoAccessor carInfoAccessor;
    public CarInfoController(CarDBContext context) {
      carInfoAccessor = new CarInfoAccessor(context);
    }

    [HttpGet]
    [Route("make")]
    public ActionResult GetCarMake() {
      var results = carInfoAccessor.GetMake();

      if(results == String.Empty) {
        return BadRequest("No available Makes");
      }

      return Ok(results);
    }

    [HttpGet]
    [Route("models/{make}")]
    public ActionResult GetModelForMake([FromRoute] string make) {
      var results = carInfoAccessor.GetModel(make);

      if(results == String.Empty) {
        return BadRequest("No available models for make " + make);
      }

      return Ok(results);
    }

    [HttpGet]
    [Route("years/{model}")]
    public ActionResult GetYearsForModel([FromRoute] string model) {
      var results = carInfoAccessor.GetYears(model);

      if(results == String.Empty) {
        return BadRequest("No available years for model " + model);
      }

      return Ok(results);
    }

    [HttpGet]
    [Route("details/{id}")]
    public ActionResult GetCarInfo([FromRoute] int id) {
      var results = carInfoAccessor.GetCarDetails(id);

      if(results == String.Empty) {
        return BadRequest("No available details for id " + id);
      }

      return Ok(results);
    }
  }
}
