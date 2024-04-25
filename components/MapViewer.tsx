'use client';

import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';

const MapViewer = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');

      const position = {
        lat: 0,
        lng: 0,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 4,
        mapId: 'ID_PILOT',
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
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

export default MapViewer;
