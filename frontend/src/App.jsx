/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from 'react'
import { Layer, Map, Marker, Source } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddPlots, fetchPlots, selectPlotsData } from './feature/plot/plotSlice';
import styled from '@emotion/styled';
import GroupBlock from './components/GroupBlock';
import DrawControl from './components/DrawControl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmFsbGVub2QiLCJhIjoiY2xndDlubng0MG15aTNmb2NhbmtpcG9kcSJ9.lPum8fgMB8DxAmaO1UXOuA';

const layerStyle = {
  'id': 'maine',
  'type': 'fill',
  'layout': {},
  'paint': {
    'fill-color': '#0080ff',
    'fill-opacity': 0.5
  }
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 2rem;
`

function App() {
  const [plots, setPlots] = useState({
    type: "FeatureCollection",
    features: []
  })
  const [lng, setLng] = useState(-122.45);
  const [lat, setLat] = useState(37.78);
  const [zoom, setZoom] = useState(10);
  const dispatch = useDispatch();
  const data = useSelector(selectPlotsData);

  useEffect(() => {
    dispatch(fetchPlots());
  }, [dispatch]);
  useEffect(() => {
    const updatePlots = (data) => {
      setPlots(prevState => ({
        ...prevState,
        features: [...data]
      }))
    }
    updatePlots(data)
  }, [data]);
  const onUpdate = useCallback(e => {
    dispatch(fetchAddPlots(...e.features));
    console.log(e)
  }, [dispatch]);
  return (
    <Main>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%", borderRadius: "20px" }}
      >
        <Source id="my-data" type="geojson" data={plots}>
          <Layer {...layerStyle} />
        </Source>
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
        />
      </Map>
      <GroupBlock data={data} />
    </Main>

  )
}

export default App
