using CarInfo.Backend.API.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace CarInfo.Backend.DataAccess {

  public class CarInfoAccessor {

    public CarDBContext dbContext;

    public CarInfoAccessor(CarDBContext carDBContext) {
      dbContext = carDBContext;
    }

    public virtual string GetMake() {
      var results = dbContext.CarMakeModels.Select(row => row.Make).Distinct();

      if(results.Count() <= 0) {
        return string.Empty;
      }

      return JsonConvert.SerializeObject(results);
    }

    public virtual string GetModel(string make) {
      var results = dbContext.CarMakeModels
        .Where(row => row.Make == make)
        .Select(row => row.Model)
        .Distinct();

      if(results.Count() <= 0) {
        return string.Empty;
      }

      return JsonConvert.SerializeObject(results);
    }

    public virtual string GetYears(string model) {
      var results = dbContext.CarMakeModels
        .Where(row => row.Model == model)
        .OrderBy(row => row.ModelYear)
        .Select(row => new YearWithId { ID = row.Id, Year = row.ModelYear });

      if(results.Count() <= 0) {
        return string.Empty;
      }

      return JsonConvert.SerializeObject(results);
    }

    public virtual string GetCarDetails(int id) {
      var results = dbContext.CarDetails
        .Where(row => row.CarId == id)
        .Join(dbContext.EngineDetails,
        cd => cd.CarId == id,
        ed => ed.CarId == id,
        (cd, ed) => new CarWithEngine {
          Drive = cd.Drive,
          Transmission = cd.Transmission,
          EngineStyle = ed.EngineStyle,
          Horsepower = ed.Horsepower,
          EngineRpm = ed.EngineRpm,
          CityMpg = ed.CityMpg,
          HighwayMpg = ed.HighwayMpg
        });

      if(results.Count() <= 0) {
        return string.Empty;
      }

      return JsonConvert.SerializeObject(results);
    }
  }
}
