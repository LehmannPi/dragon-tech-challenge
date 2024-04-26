'use client';

import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import { createCustomEqual } from 'fast-equals';
import React from 'react';
import { setKey } from 'react-geocode';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapViewer = () => {
  setKey(process.env.NEXT_PUBLIC_GEO_API_KEY as string);
  // const mapRef = React.useRef<HTMLDivElement>(null);
  // const [ap, setMap] = useState<google.maps.Map>();

  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };
  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  // fromAddress('R. Paula Gomes, 375 - São Francisco')
  //   .then(async ({ results }) => {
  //     const { lat, lng } = results[0].geometry.location;
  //     console.log(results);
  //     const latlng = await fromLatLng(lat, lng);
  //     // setPosition({ lat: lat, lng: lng });
  //   })
  //   .catch(console.error);
  // !
  // useEffect(() => {
  //   // const position =
  //   const initMap = async () => {
  //     const loader = new Loader({
  //       apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  //       version: 'weekly',
  //     });

  //     const { Map } = await loader.importLibrary('maps');

  //     // * init marker
  //     const { AdvancedMarkerElement } = (await loader.importLibrary(
  //       'marker'
  //     )) as google.maps.MarkerLibrary;

  //     const mapOptions: google.maps.MapOptions = {
  //       center: center,
  //       zoom: 4,
  //       mapId: 'ID_PILOT',
  //     };

  //     // * setup the map
  //     const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

  //     // * put up marker
  //     const marker = new AdvancedMarkerElement({
  //       map: map,
  //       position: center,
  //     });
  //   };

  //   initMap();
  // }, []);

  // React.useEffect(() => {
  //   const update = async () => {
  //     const loader = new Loader({
  //       apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  //       version: 'weekly',
  //     });
  //     const { Map } = await loader.importLibrary('maps');

  //     const mapOptions: google.maps.MapOptions = {
  //       center: clicks[0],
  //       zoom: 4,
  //       mapId: 'ID_PILOT',
  //     };

  //     const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

  //     const { AdvancedMarkerElement } = (await loader.importLibrary(
  //       'marker'
  //     )) as google.maps.MarkerLibrary;

  //     // * put up marker
  //     const marker = new AdvancedMarkerElement({
  //       map: map,
  //       position: clicks[0],
  //     });
  //   };
  //   update();
  // }, [clicks]);

  // return <div style={{ width: '100%', height: '100%' }} ref={mapRef} />;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: '1', height: '100%' }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
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
