Front end:
- I would have liked to make a generic "loading" component, but decided to keep it a bit simpler for now. The code is set up to support it similar to errorDisplay.
- Additionally, it would be preferable if not every component was reliant on errorDisplay, there's likely a better pattern to inject it as a generic error response.

Back end:
- CarWithEngine pulls back redundant data, but this is extensible in the future when specific car styles are added to CarDetails. An alternative I considered was making 2 separate queries and making the CarWithEngine object take an IEnumerable of EngineDetails, but this was a lot of extra lift for not much extra value, and pigeon holes the object to only ever have a single car detail, or growing to have 2 IEnumerables which is arguably less valuable in the long run.

Database:
- Will be using DB First w/ EF Core to use DB on backend.
- Tables center around CarMakeModel as the source, with references back to it as cars contain multiple 1:many pairings.
- Biggest struggle was narrowing down the information for the relevant information for the car, lots of possible minutia. Decided to stop at the engine as most key information (read: what I'd look for in a car) is captured with three tables + room to grow.
- Next steps would be making an InternalFeatures + ExternalFeatures table to relate back to CarDetails with a tri-state toggle for Standard, Optional, or Not Available. 
    - These tables would either be rows with the IDs and availability (i.e., CarID, FeatureID, Available) with a supplimentary Feature table to list out all possible features
    - Alternatively, it could be a single table with N many columns for each CarID and the features that are simply marked 'Standard', 'Optional', or 'Unavailable'. (e.g., CarID, Power Windows, CD Player, . . .)