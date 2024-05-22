import 'leaflet/dist/leaflet.css';
import Travaye from '../../assets/travaye.png';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { googleApiKey } from '../../server';
import { useSearchParams } from 'react-router-dom';

const Map = ({ lat, long }) => {
  const [params] = useSearchParams();

  const address = params.get('address');
  const name = params.get('name');
	const apiKey = googleApiKey;
	return (
		<div className="w-[98%] h-[98%] py-[2%] border-t border-[#D6DDEB] mx-auto">
			{/* <MapContainer
        center={[6.5392, 3.3842]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "600px", zIndex: "0!important" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[6.5392, 3.3842]}
          icon={
            new Icon({
              iconUrl: Travaye,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>business location</Popup>
        </Marker>
      </MapContainer> */}
			<iframe
				width="100%"
				height="500"
				style={{ border: '0' }}
				loading="lazy"
				allowFullScreen
				referrerPolicy="no-referrer-when-downgrade"
				src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${name}+${address}`}
			></iframe>
		</div>
	);
};

export default Map;
