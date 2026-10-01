import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix Leaflet default marker icon in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Default UAQ coordinates
const DEFAULT_COORDS = [25.5653, 55.5534]

async function geocode(address) {
  if (!address) return null
  try {
    const query = encodeURIComponent(address + ', Umm Al Quwain, UAE')
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
    )
    const data = await res.json()
    if (data[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
  } catch (_) {}
  return null
}

export default function MapView({ address, location }) {
  const [coords, setCoords] = useState(DEFAULT_COORDS)

  useEffect(() => {
    const query = address || location
    if (query) {
      geocode(query).then((c) => {
        if (c) setCoords(c)
      })
    }
  }, [address, location])

  return (
    <div className="map-container">
      <MapContainer
        center={coords}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        key={coords.join(',')}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={coords}>
          <Popup>{address || location || 'UAQ'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
