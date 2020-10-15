import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

import api from '../services/api';

import mapMarketImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}


const OrphanagesMap = () => {
  const [orphanages, setOphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOphanages(response.data)
    });
  }, []);
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarketImg} alt=" Happy Map marker" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
        </header>
        <footer>
          <strong>Campo Mourão</strong>
          <span>Paraná</span>
        </footer>
      </aside>
      <Map
        center={[-24.0483376, -52.4265378]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            position={[orphanage.latitude, orphanage.longitude]}
            icon={mapIcon}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default OrphanagesMap;
