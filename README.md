# local-weather

A simple app with city search and city weather display functionalities.
Utilising free weather api available at [http://openweathermap.org](http://openweathermap.org).

## APP HIGHLIGHTS:
- The LRU is implemented as a service. It is a long-living singleton object that can be injected in places where it is needed (i our case it is injected in the route handler and the search component).
- Only items that yield some search resuts are added to the cache.
- The cache is persisted to localStorage, so you can view your search results after a page reload. localStorage is nicely synchronised when you clean the whole cache or each element individually.
- Each history position can be deleted individualy or the whole history can be deleted. Check out the controls on the search list.
