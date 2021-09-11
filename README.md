Front end:

Back end:

Database:
- Will be using DB First w/ EF Core to use DB on backend.
- Tables center around CarMakeModel as the source, with references back to it as cars contain multiple 1:many pairings.
- Biggest struggle was narrowing down the information for the relevant information for the car, lots of possible minutia. Decided to stop at the engine as most key information (read: what I'd look for in a car) is captured with three tables + room to grow.
- Next steps would be making an InternalFeatures + ExternalFeatures table to relate back to CarDetails with a tri-state toggle for Standard, Optional, or Not Available. 
    - These tables would either be rows with the IDs and availability (i.e., CarID, FeatureID, Available) with a supplimentary Feature table to list out all possible features
    - Alternatively, it could be a single table with N many columns for each CarID and the features that are simply marked 'Standard', 'Optional', or 'Unavailable'. (e.g., CarID, Power Windows, CD Player, . . .)