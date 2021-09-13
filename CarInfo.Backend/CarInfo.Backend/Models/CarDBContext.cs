using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CarInfo.Backend.API.Models {
  public partial class CarDBContext : DbContext {
    public CarDBContext() {
    }

    public CarDBContext(DbContextOptions<CarDBContext> options)
        : base(options) {
    }

    public CarDBContext(DbContextOptions<CarDBContext> options, IConfiguration configuration)
            : base(options) {
    }

    public virtual DbSet<CarDetail> CarDetails { get; set; }
    public virtual DbSet<CarMakeModel> CarMakeModels { get; set; }
    public virtual DbSet<EngineDetail> EngineDetails { get; set; }

    private readonly IConfiguration _configuration;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
      if(!optionsBuilder.IsConfigured) {
        optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
      }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

      modelBuilder.Entity<CarDetail>(entity => {
        entity.Property(e => e.Id).HasColumnName("ID");

        entity.Property(e => e.CarId).HasColumnName("CarID");

        entity.Property(e => e.Drive)
            .HasMaxLength(3)
            .IsUnicode(false);

        entity.Property(e => e.Transmission).HasMaxLength(100);

        entity.HasOne(d => d.Car)
            .WithMany(p => p.CarDetails)
            .HasForeignKey(d => d.CarId)
            .HasConstraintName("fk_CarMakeModelID");
      });

      modelBuilder.Entity<CarMakeModel>(entity => {
        entity.ToTable("CarMakeModel");

        entity.Property(e => e.Id).HasColumnName("ID");

        entity.Property(e => e.Make)
            .IsRequired()
            .HasMaxLength(100);

        entity.Property(e => e.Model)
            .IsRequired()
            .HasMaxLength(100);
      });

      modelBuilder.Entity<EngineDetail>(entity => {
        entity.Property(e => e.Id).HasColumnName("ID");

        entity.Property(e => e.CarId).HasColumnName("CarID");

        entity.Property(e => e.CityMpg)
            .HasColumnType("decimal(18, 0)")
            .HasColumnName("CityMPG");

        entity.Property(e => e.EngineRpm).HasColumnName("EngineRPM");

        entity.Property(e => e.EngineStyle).HasMaxLength(100);

        entity.Property(e => e.HighwayMpg)
            .HasColumnType("decimal(18, 0)")
            .HasColumnName("HighwayMPG");

        entity.HasOne(d => d.Car)
            .WithMany(p => p.EngineDetails)
            .HasForeignKey(d => d.CarId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("fk_EngineDetailsID");
      });

      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}
