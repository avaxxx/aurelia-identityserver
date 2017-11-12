import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { customElement,inject, bindable, noView } from 'aurelia-framework';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"



@noView()
@inject(Element)
@customElement('google-map-element')
export class GoogleMapElement {
    constructor(private element: Element){
        this.element = element;
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
          {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
      ))



        ReactDOM.render(
            <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />,
            this.element
        );
    }
    
    bind() {
        this.render();
    }
}