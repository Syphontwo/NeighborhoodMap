# NeighborhoodMap
Neighborhood map react project for udactiy FEND

## Google Maps API Restrictions
In order to prevent theft, my API keys are heavily restricted.  There is a file `/src/api-keys.json` which is listed in `.gitignore`.  This enables you to be able to put in your own keys, and resubmit the project without accidentally uploading your secrets.  You will need to update the keys in that file with your own secret keys in order for the project to funciton.

```
{
  "googleMapsApi": "<YOUR KEY HERE>",
  "fouresquareClientID": "<YOUR KEY HERE>",
  "foursquareClientSecret": "<YOUR KEY HERE>"
}
```

A file called `api-keysEXAMPLE.json` has been included to assist you should anything happen with the api-keys.json main file.  Remeber that if another API is added, or any other item requiring a secret, that item should be added to api-keys.json manually through the github website.

## Dependencies
* react@16.5.2
* react-dom@16.5.2
* react-scripts@2.0.4
* axios@0.18.0
  * `npm install axios`
* serve@10.0.2
  * `npm install -g serve`

Made using [NPM](/neighborhood-map/README.md)

## Keys Required
* [Google Maps API](https://cloud.google.com/maps-platform/)
* [Foursquare API](https://developer.foursquare.com/)

## Service Worker
The service worker will only install in the production environment.
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
* [w3schools](https://www.w3schools.com/css/css_margin.asp)
  * General reference on CSS animations
