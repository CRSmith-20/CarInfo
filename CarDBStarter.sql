CREATE TABLE CarMakeModel(
    ID int IDENTITY(1,1) PRIMARY KEY,
    Make nvarchar(100) NOT NULL, 
    Model nvarchar(100) NOT NULL,
    ModelYear int NOT NULL,
)
--Can consider adding indicies on Make/Model since those will be commonly queried.

CREATE TABLE CarDetails(
    ID int IDENTITY(1,1) PRIMARY KEY,
    CarID int NOT NULL,
    Drive varchar(3),
    Transmission nvarchar(100),
    --ExteriorFeatures FK to ExteriorFeatures ID
    --InteriorFeatures FK to InteriorFeatures ID

    CONSTRAINT fk_CarMakeModelID FOREIGN KEY (CarID) REFERENCES CarMakeModel(ID) ON DELETE CASCADE,
)

Create Table EngineDetails(
    ID int IDENTITY(1,1) PRIMARY KEY,
    CarID int NOT NULL,
    EngineStyle nvarchar(100),
    Horsepower int,
    EngineRPM int,
    CityMPG decimal,
    HighwayMPG decimal,
    
    CONSTRAINT fk_EngineDetailsID FOREIGN KEY (CarID) REFERENCES CarMakeModel(ID)
)

--Note: Seed data pulled from Kelly Blue Book (kbb.com)
INSERT INTO CarMakeModel Values('Hyundai', 'Sonata', 2014)
INSERT INTO CarMakeModel Values('Hyundai', 'Sonata', 2016)
INSERT INTO CarMakeModel Values('Ford', 'Taurus', 2012)
INSERT INTO CarMakeModel Values('Ford', 'Taurus', 2016)
INSERT INTO CarMakeModel Values('Ford', 'Taurus', 2014)

INSERT INTO EngineDetails Values(1,'2.4-liter inline-4', 190, 6300, 24, 35)
INSERT INTO EngineDetails Values(1,'2.0-liter turbocharged inline-4', 274, 6000, 21, 32)
INSERT INTO EngineDetails Values(1,'2.4-liter 4-cylinder hybrid', 206, 4500, 35, 40)

INSERT INTO EngineDetails Values(2,'2.4-liter inline-4 (SE, Sport and Limited)', 185, 6000, 25, 37)
INSERT INTO EngineDetails Values(2,'2.0-liter turbocharged inline-4 (Sport 2.0T)', 245, 6000, 23, 32)
INSERT INTO EngineDetails Values(2,'1.6-liter turbocharged inline-4 (Eco)', 177, 5500, 28, 38)
INSERT INTO EngineDetails Values(2,'2.0-liter inline-4 + electric motor (Hybrid)', 154, 6000, 40, 44)
INSERT INTO EngineDetails Values(2,'2.0-liter inline-4 + electric motor (Plug-in Hybrid)', 154, 6000, 40, 40)

INSERT INTO EngineDetails Values(3,'3.5-Liter V6', 263, 6250, 18, 28)
INSERT INTO EngineDetails Values(3,'3.5-Liter V6 Twin-Turbocharged', 365, 5550, 17, 25)

INSERT INTO EngineDetails Values(4,'3.5-Liter V6', 288, 6500, 18, 27)
INSERT INTO EngineDetails Values(4,'2.0-liter turbocharged inline-4', 240, 5500, 20, 29)
INSERT INTO EngineDetails Values(4,'3.5-liter twin-turbocharged v6 (SHO)', 365, 5550, 16, 24)

INSERT INTO EngineDetails Values(5,'3.5-Liter V6', 288, 6500, 19, 29)
INSERT INTO EngineDetails Values(5,'2.0-liter turbocharged inline-4', 240, 5500, 22, 32)
INSERT INTO EngineDetails Values(5,'3.5-liter twin-turbocharged v6 (SHO)', 365, 5550, 17, 25)

INSERT INTO CarDetails VALUES(1, 'FWD', 'Automatic')
INSERT INTO CarDetails VALUES(2, 'FWD', 'Automatic')
INSERT INTO CarDetails VALUES(3, 'FWD', 'Automatic')
INSERT INTO CarDetails VALUES(4, 'FWD', 'Automatic')
INSERT INTO CarDetails VALUES(5, 'FWD', 'Automatic')

