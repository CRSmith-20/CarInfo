Notes / steps from here:

Front end:
- React 17, ES6, tests are a combo of jest (mocking and API), and enzyme (component, in conjunction with jest). I used snapshots as more of a challenge than anything, it worked out pretty well in my opinion.

- I would have liked to make a generic "loading" component, but decided to keep it a bit simpler for now. The code is set up to support it similar to the ErrorDisplay component.
- Additionally, it would be preferable if not every component was reliant on errorDisplay, there's likely a better pattern to inject it as a generic error response.
- UI is extremely simple, leveraging bootstrap styles to make the first pass more digestable. I have sass included as well for more focused changes and extending bootstrap, with all the tools needed. It just ended up being a bit too much of a rabbit hole for what I needed.
- I had intended on using pictures everywhere, but settled for a proof of concept in the makes page, and included images so if I were to revisit it, I could clean it up and present some more information to the user
    - The biggest drawback of this is the loss of knowing the outer components of the car, but it also prevents some confusion given that different styles can look significantly different
    - Ideally, each model would have its own sub-styles (e.g., sport, offroad, etc), I left this open as a possiblity in the DB.
- With the images / css / other static items, I would eventually move to a CDN pattern (probably Azure CDN), as the amount of images would grow very quickly as cars were added.
- There's likely a lot of refactoring that could happen down the line to break logic out into components, but for the sake of time, I left them as is.

Back end:
- .NET CORE 3.1, ASP.NET MVC Core
- Combo of MOQ and XUnit for controller / data access tests
- CarWithEngine pulls back redundant data, but this is extensible in the future when specific car styles are added to CarDetails. An alternative I considered was making 2 separate queries and making the CarWithEngine object take an IEnumerable of EngineDetails, but this was a lot of extra lift for not much extra value, and pigeon holes the object to only ever have a single car detail, or growing to have 2 IEnumerables which is arguably less valuable in the long run.
- Controllers are really simple, I think the bulk of their use would come from filling out the CRUD operations, but for describing a car, this is all that was necessary.
- 

Database:
- DB First w/ EF Core
- Tables center around CarMakeModel as the source, with references back to it as cars contain multiple 1:many pairings.
- Biggest struggle was narrowing down the information for the relevant information for the car, lots of possible minutia. Decided to stop at the engine as most key information (read: what I'd look for in a car) is captured with three tables + room to grow.
- Next steps would be making an InternalFeatures + ExternalFeatures table to relate back to CarDetails with a tri-state toggle for Standard, Optional, or Not Available. 
    - These tables would either be rows with the IDs and availability (i.e., CarID, FeatureID, Available) with a supplimentary Feature table to list out all possible features
    - Alternatively, it could be a single table with N many columns for each CarID and the features that are simply marked 'Standard', 'Optional', or 'Unavailable'. (e.g., CarID, Power Windows, CD Player, . . .)

For any questions, comments, concerns, feedback, please email me at crsmith240 at gmail dot com
