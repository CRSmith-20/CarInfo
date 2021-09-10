using CarInfo.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarInfo.Backend.DataAccess
{
  public class CarInfoAccessor
  {
    public CarDBContext dbContext;

    public CarInfoAccessor(CarDBContext carDBContext) {
      dbContext = carDBContext;
    }

    public IQueryable<CarMakeModel> GetMakeModel() {
      var results = dbContext.CarMakeModels.Select(row => row);
      return results;
    }
  }
}
