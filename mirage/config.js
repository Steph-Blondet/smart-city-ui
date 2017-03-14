export default function() {

  this.get('/ev_station_locations', ({ evStationLocations }) => {
    return evStationLocations.all();
  });


  this.get('/existing_charging_stations', ({ existingChargingStations }) => {
    return existingChargingStations.all();
  });


  this.get('/gas_station_locations', ({ gasStationLocations }) => {
    return gasStationLocations.all();
  });


  this.get('/grid_attributes', ({ gridAttributes }) => {
    return gridAttributes.all();
  });


  this.get('/zone_class_cords', ({ zoneClassCords }) => {
    return zoneClassCords.all();
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
