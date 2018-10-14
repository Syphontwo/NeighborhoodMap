# NeighborhoodMap
Neighborhood map react project for udactiy FEND

## Google Maps API Restrictions
In order to prevent theft, my API key is heavily restricted.  There is a file `/src/api-keys.json` which is listed in `.gitignore`.  You will need to create that file for yourself in the format below in order to gain access to the google maps API.

```
{
  "googleMapsApi": "<YOUR KEY HERE>",
  "fouresquareClientID": "<YOUR KEY HERE>",
  "foursquareClientSecret": "<YOUR KEY HERE>"
}
```

A file called `api-keysEXAMPLE.json` has been included to assist you.  Replace `<YOUR KEY HERE>` with an active API key.  If you add your api keys in the appropriate locations and make a copy of the file with the word `EXAMPLE` removed, you will be able to continue.

## Dependencies
* react@16.5.2
* react-dom@16.5.2
* react-scripts@2.0.4
* axios@0.18.0
  * `npm install axios`
* serve@10.0.2
  * `npm install -g serve`
* Google Maps API key
* Foursquare API key

Made using [NPM](/neighborhood-map/README.md)

## Keys Required
* [Google Maps API](https://cloud.google.com/maps-platform/)

## Service Worker
The service worker will only install in the production environment.  Make sure to use
```
npm run build
serve -s build
```

## Credit Where Credit is Due
* [Elharony](https://www.youtube.com/channel/UCcWSbBe_s-T_gZRnqFbtyIA)
  * Excellent [Youtube videos](https://www.youtube.com/watch?v=ywdxLNjhBYw&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1) that helped me get a general understanding of project parts
* [Janice Medina](https://www.diigo.com/profile/sra_medina)
  * Compiling a [list of helpful resources](https://www.diigo.com/outliner/fkkuvb/Udacity-Neighborhood-Map-Project-(project-%237)?key=25wgqnwals)
* [Ryan Waite (FEND Project Coach)](https://www.youtube.com/channel/UCRb4dFjhmm8RfvTgIfBtXFg)
  * [Tutorial video](https://www.youtube.com/watch?v=LvQe7xrUh7I&index=6&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s&t=0s) which finally kicked me into gear
  * providing a [working example](https://rmw-react-neighborhood-map.herokuapp.com/) for inspiration
