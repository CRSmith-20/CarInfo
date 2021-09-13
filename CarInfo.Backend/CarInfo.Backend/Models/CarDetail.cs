﻿namespace CarInfo.Backend.API.Models {

  public partial class CarDetail {
    public int Id { get; set; }
    public int CarId { get; set; }
    public string Drive { get; set; }
    public string Transmission { get; set; }

    public virtual CarMakeModel Car { get; set; }
  }
}
