# Evictions in San Fransisco 3D Geospatial Visualization 

### using Deck.gl, Mapbox, and Open SFData.

![](images/EvictionsVisual.png)

### Project Description:

###### With an ongoing housing crises crippling affordable housing for many communities in the Bay Area, this 3D geospatial visualization illustrates the number of evictions from 1997 to present day in San Fransisco. This visual aims to depict the number of eviction notices for each neighborhood and bring awareness to the communities most impacted by evictions.

### Local Usage Instructions:

Fork and clone this repository.

To see the base map, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can either set an environment variable:

```bash
export MapboxAccessToken=<mapbox_access_token>
```

Or set `MAPBOX_TOKEN` directly in `app.js`.

Other options can be found at [using with Mapbox GL](../../../docs/get-started/using-with-mapbox-gl.md).

```bash
# install dependencies
npm install
# or
yarn
# bundle and serve the app with webpack
npm start
```

### Data format

Sample data is stored in [deck.gl Example Data](https://github.com/leerach/sf-evictions/blob/master/data/Eviction_Notices.geojson). To use your own data, check out
the [documentation of HexagonLayer](../../../docs/layers/hexagon-layer.md)
