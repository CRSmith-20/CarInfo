using CarInfo.Backend.DataAccess;
using CarInfo.Backend.Models;
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
    public CarDBContext dbContext;
    public CarInfoController(CarDBContext context) {
      dbContext = context;
    }

    [HttpGet]
    [Route("make")]
    public ActionResult GetCarMake() {
      var carDataAccessor = new CarInfoAccessor(dbContext);
      var results = carDataAccessor.GetMake();

      if(results == String.Empty) {
        return BadRequest("No available Makes");
      }
      return Ok(results);
    }
    
    [HttpGet]
    [Route("model/{make}")]
    public ActionResult GetModelForMake([FromRoute] string make) {
      var carDataAccessor = new CarInfoAccessor(dbContext);
      var results = carDataAccessor.GetModel(make);

      return Ok(results);
    }
  }
}
