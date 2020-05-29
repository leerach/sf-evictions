import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// Source data CSV
const DATA_URL =
  'Eviction_Notices.geojson'; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};

const INITIAL_VIEW_STATE = {
  longitude: -122.4194,
  latitude: 37.7749,
  zoom: 11.3,
  minZoom: 10,
  maxZoom: 13,
  pitch: 50,
  bearing: -27.396674584323023
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = {min: 1, max: 50};

/* eslint-disable react/no-deprecated */
export default class App extends Component {
  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    this.state = {
      elevationScale: elevationScale.min
    };
  }

  _renderLayers() {
    const {data, radius = 25, upperPercentile = 99.9, coverage = 0.6} = this.props;

    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage,
        data,
        elevationRange: [0, 1000],
        elevationScale: data && data.length ? 50 : 0,
        extruded: true,
        getPosition: d => d,
        onHover: info => this.setState({
          hoveredObject: info.object,
          pointerX: info.x,
          pointerY: info.y
        }),
        pickable: true,
        radius,
        upperPercentile,
        material,

        transitions: {
          elevationScale: 1000
        }
      })
    ];
  }

  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    return hoveredObject && (
      <div className="tooltip" style={{left: pointerX, top: pointerY}}>
          <div>
            <div> <b>Evictions: {hoveredObject.points.length} </b> </div>
        </div>
        <div>
            <div> Latitude: {Math.round(hoveredObject.position[1]*10000)/10000}&deg;</div>
        </div>
        <div>
            <div> Longitude: {Math.round(hoveredObject.position[0]*10000)/10000}&deg;</div>
        </div>
      </div>
    );
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        { this._renderTooltip() }
      </DeckGL>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);

  require('d3-request').json(DATA_URL, (error, response) => {
    if (!error) {
      console.log(response.features[0].geometry.coordinates);
      const data = []
      for (var i = 0; i < response.features.length; i++) {
        if (response.features[i].geometry != null){
          data.push(response.features[i].geometry.coordinates);
        }
      }
    

      // // var data = response.map(d => [Number(d.Location.substring(d.Location.indexOf('(')+ 1, 27)), Number(d.Location.substring(d.Location.indexOf('(') + 20, d.Location.indexOf(')')))]);
      
      // const data = response.reduce(function(filtered, d) {
      //   if (d.Location && !isNaN(Number(d.Location.substring(d.Location.indexOf('(')+ 1, 27))) && !isNaN(Number(d.Location.substring(d.Location.indexOf('(') + 20, d.Location.indexOf(')'))))) {
      //   var firstNumber = Number(d.Location.substring(d.Location.indexOf('(')+ 1, 27));
      //   var secondNumber =  Number(d.Location.substring(d.Location.indexOf('(') + 20, d.Location.indexOf(')')));
      //      var someNewValue = [firstNumber,secondNumber]
      //      filtered.push(someNewValue);
      //   }
      //   return filtered;
      // }, []);
      

      console.log(data);
      render(<App data={data} />, container);
    }
  });
}
