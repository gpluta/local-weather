# local-weather

A simple app with city search and city weather display functionalities.
Utilising free weather api available at [http://openweathermap.org](http://openweathermap.org).

## APP HIGHLIGHTS:
- Due to the fact that the openweather api is sometimes very slow, the limit of the LRU has been set to 5 entries. It is configurable in the service implementation. 
- The LRU is implemented as a service. It is a long-living singleton object that can be injected in places where it is needed (in our case it is injected in the route handler and the search component).
- Only items that yield some search resuts are added to the cache.
- The cache is persisted to localStorage, so you can view your search history after a page reload. localStorage is nicely synchronised when you clean the whole cache or each element individually.
- Each history position can be deleted individualy or the whole history can be deleted. Check out the controls on the search list.
---
**CAUTION!** The openweathermap api tends to be slow at times and tends to timeout too. It is not always like that, but sometimes the UX is pretty unpleasant :( 
