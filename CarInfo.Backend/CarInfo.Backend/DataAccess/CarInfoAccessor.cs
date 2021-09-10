using CarInfo.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace CarInfo.Backend.DataAccess
{
  public class CarInfoAccessor
  {
    public CarDBContext dbContext;

    public CarInfoAccessor(CarDBContext carDBContext) {
      dbContext = carDBContext;
    }

    public string GetMake() {
      var results = dbContext.CarMakeModels.Select(row => row.Make).Distinct();

      if(results.Count() <= 0) {
        return string.Empty;
      }

      return JsonConvert.SerializeObject(results);
    }

    public string GetModel(string make) {
      var results = dbContext.CarMakeModels
        .Where(row => row.Make == make)
        .Select(row => row.Model)
        .Distinct();

      return JsonConvert.SerializeObject(results);
    }
  }
}
