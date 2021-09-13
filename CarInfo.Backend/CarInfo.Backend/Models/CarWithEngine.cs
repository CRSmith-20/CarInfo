namespace CarInfo.Backend.API.Models {

  public class CarWithEngine {

    public string Drive { get; set; }
    public string Transmission { get; set; }
    public string EngineStyle { get; set; }
    public int? Horsepower { get; set; }
    public int? EngineRpm { get; set; }
    public decimal? CityMpg { get; set; }
    public decimal? HighwayMpg { get; set; }
  }
}
