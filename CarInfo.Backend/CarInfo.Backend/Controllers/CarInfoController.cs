using CarInfo.Backend.DataAccess;
using CarInfo.Backend.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarInfo.Backend.Controllers
{
  public class CarInfoController : Controller
  {
    private CarInfoAccessor _carInfoAccessor;
    public CarInfoController(CarDBContext context) {
      _carInfoAccessor = new CarInfoAccessor(context);
    }

    [HttpGet]
    [Route("make")]
    public ActionResult GetCarMake() {
      var results = _carInfoAccessor.GetMake();

      if(results == String.Empty) {
        return BadRequest("No available Makes");
      }
      return Ok(results);
    }
    
    [HttpGet]
    [Route("models/{make}")]
    public ActionResult GetModelForMake([FromRoute] string make) {
      var results = _carInfoAccessor.GetModel(make);

      return Ok(results);
    }

    [HttpGet]
    [Route("years/{model}")]
    public ActionResult GetYearsForModel([FromRoute] string model) {
      var results = _carInfoAccessor.GetYears(model);

      return Ok(results);
    }

    [HttpGet]
    [Route("details/{id}")]
    public ActionResult GetCarInfo([FromRoute] int id) {
      var results = _carInfoAccessor.GetCarDetails(id);
      return Ok();
    }
  }
}
