namespace CarInfo.Backend.API.Models {

  public partial class EngineDetail {
    public int Id { get; set; }
    public int CarId { get; set; }
    public string EngineStyle { get; set; }
    public int? Horsepower { get; set; }
    public int? EngineRpm { get; set; }
    public decimal? CityMpg { get; set; }
    public decimal? HighwayMpg { get; set; }

    public virtual CarMakeModel Car { get; set; }
  }
}
