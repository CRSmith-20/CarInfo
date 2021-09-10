using System;
using System.Collections.Generic;

#nullable disable

namespace CarInfo.Backend.Models
{
    public partial class CarMakeModel
    {
        public CarMakeModel()
        {
            CarDetails = new HashSet<CarDetail>();
            EngineDetails = new HashSet<EngineDetail>();
        }

        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int ModelYear { get; set; }

        public virtual ICollection<CarDetail> CarDetails { get; set; }
        public virtual ICollection<EngineDetail> EngineDetails { get; set; }
    }
}
