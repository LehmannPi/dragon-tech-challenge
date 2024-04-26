'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import { createCustomEqual } from 'fast-equals';
import React, { useEffect, useState } from 'react';
import { setKey } from 'react-geocode';

const MapViewer = () => {
  setKey(process.env.NEXT_PUBLIC_GEO_API_KEY as string);
  const mapRef = React.useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    lat: 48.8584,
    lng: 2.2945,
  });

  useEffect(() => {
    // fromAddress('R. Paula Gomes, 375 - São Francisco')
    //   .then(({ results }) => {
    //     const { lat, lng } = results[0].geometry.location;
    //     setPosition({ lat: lat, lng: lng });
    //   })
    //   .catch(console.error);

    // const position =
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');

      // * init marker
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 2,
        mapId: 'ID_PILOT',
      };

      // * setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // * put up marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
      });
    };

    initMap();
  }, []);

  // return <div style={{ width: 600, height: 600 }} ref={mapRef} />;
  return <div style={{ width: '100%', height: '100%' }} ref={mapRef} />;
  // return (
  //   <div
  //     style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
  //     ref={mapRef}
  //   />
  // );
  // return <Box sx={{ width: 'auto', height: '100%' }} ref={mapRef} />;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default MapViewer;
