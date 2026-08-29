import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Eye, 
  AlertTriangle, 
  TrendingUp, 
  CloudRain, 
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useFloodData } from '../context/FloodDataContext';
import { RISK_LEVELS, STATION_TYPES } from '../utils/constants';
import { formatWaterLevel, formatRateOfRise, formatRainfall } from '../utils/formatters';

// Custom Leaflet DivIcon generator
const createCustomIcon = (station) => {
  const riskLevel = station.riskAnalysis?.riskLevel || 'SAFE';
  let bgColor = '#10B981';
  let pulseClass = '';
  let badgeColor = 'bg-emerald-500';

  if (riskLevel === 'CRITICAL') {
    bgColor = '#EF4444';
    pulseClass = 'pulse-marker-critical';
    badgeColor = 'bg-rose-500';
  } else if (riskLevel === 'HIGH RISK') {
    bgColor = '#F97316';
    pulseClass = 'pulse-marker-high';
    badgeColor = 'bg-orange-500';
  } else if (riskLevel === 'WATCH') {
    bgColor = '#F59E0B';
    badgeColor = 'bg-amber-500';
  }

  const html = `
    <div class="relative flex items-center justify-center">
      <div class="w-9 h-9 rounded-full ${pulseClass} flex items-center justify-center shadow-xl border-2 border-slate-900" style="background-color: ${bgColor};">
        <span class="text-[11px] font-mono font-bold text-white leading-none">
          ${station.currentTelemetry?.waterLevel?.toFixed(1) || '0'}m
        </span>
      </div>
      <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-slate-900 ${badgeColor}"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-flood-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
};

// River network mock polyline path
const riverChannelPath = [
  [28.6600, 77.2100],
  [28.6448, 77.2167], // ST-001 Upper
  [28.6380, 77.2220],
  [28.6280, 77.2280], // ST-002 Central
  [28.6189, 77.2025], // ST-003 Culvert connection
  [28.5990, 77.2410], // ST-004 Canal
  [28.5820, 77.1950], // ST-005 Underpass link
  [28.5600, 77.2600], // ST-006 Estuary
  [28.5450, 77.2750]
];

export const GisMap = ({ onOpenStationDetail, onOpenResponseLog }) => {
  const { stations, selectedStation, setSelectedStation } = useFloodData();
  const [mapLayer, setMapLayer] = useState('dark'); // 'dark' | 'satellite' | 'streets'
  const [showHazardZones, setShowHazardZones] = useState(true);
  const [showRiverPath, setShowRiverPath] = useState(true);

  const defaultCenter = [28.6139, 77.2200];

  const tileUrls = {
    dark: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  const tileAttributions = {
    dark: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    streets: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
  };

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
      {/* Map Header Toolbar Overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center space-x-2 bg-slate-900/90 backdrop-blur border border-slate-700/80 p-1.5 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 px-2 border-r border-slate-700">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Municipal GIS Basin</span>
        </div>

        {/* Map Layers */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setMapLayer('dark')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              mapLayer === 'dark' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Dark Command Center HUD (OpenStreetMap)"
          >
            Dark HUD
          </button>
          <button
            onClick={() => setMapLayer('streets')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              mapLayer === 'streets' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Standard OpenStreetMap"
          >
            OSM Streets
          </button>
          <button
            onClick={() => setMapLayer('satellite')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              mapLayer === 'satellite' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Public ArcGIS Satellite Imagery"
          >
            Satellite
          </button>
        </div>

        {/* Layer toggles */}
        <div className="flex items-center space-x-1 pl-2 border-l border-slate-700">
          <button
            onClick={() => setShowHazardZones(!showHazardZones)}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              showHazardZones ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Hazard Radii: {showHazardZones ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setShowRiverPath(!showRiverPath)}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              showRiverPath ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Flowline
          </button>
        </div>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur border border-slate-700/80 p-2.5 rounded-xl text-xs space-y-1.5 shadow-lg hidden sm:block">
        <div className="text-[10px] font-mono uppercase text-slate-400 font-bold border-b border-slate-800 pb-1">
          Hydrologic Risk Levels
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-300">Safe (Nominal)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-300">Watch Advisory</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span className="text-slate-300">High Risk (Pre-Crest)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-rose-300 font-semibold">Critical Breach</span>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        key={mapLayer}
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        className={`w-full h-full ${mapLayer === 'dark' ? 'dark-hud-map' : ''}`}
      >
        <TileLayer
          attribution={tileAttributions[mapLayer]}
          url={tileUrls[mapLayer]}
        />

        {/* River Hydrological Flowline */}
        {showRiverPath && (
          <Polyline
            positions={riverChannelPath}
            pathOptions={{
              color: '#06B6D4',
              weight: 4,
              opacity: 0.65,
              dashArray: '8, 8'
            }}
          >
            <Tooltip sticky>Main Hydrologic River Arterial & Urban Spillway</Tooltip>
          </Polyline>
        )}

        {/* Stations & Hazard Buffers */}
        {stations.map((station) => {
          const riskLevel = station.riskAnalysis?.riskLevel || 'SAFE';
          let circleColor = '#10B981';
          let radius = 600;

          if (riskLevel === 'CRITICAL') {
            circleColor = '#EF4444';
            radius = 1200;
          } else if (riskLevel === 'HIGH RISK') {
            circleColor = '#F97316';
            radius = 900;
          } else if (riskLevel === 'WATCH') {
            circleColor = '#F59E0B';
            radius = 750;
          }

          const icon = createCustomIcon(station);
          const typeObj = STATION_TYPES[station.type] || STATION_TYPES.RIVER;

          return (
            <React.Fragment key={station.id}>
              {/* Dynamic Flood Hazard Inundation Radius */}
              {showHazardZones && (
                <Circle
                  center={[station.coordinates.lat, station.coordinates.lng]}
                  radius={radius}
                  pathOptions={{
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: riskLevel === 'CRITICAL' ? 0.25 : 0.12,
                    weight: riskLevel === 'CRITICAL' ? 2 : 1
                  }}
                />
              )}

              {/* Station Marker Pin */}
              <Marker
                position={[station.coordinates.lat, station.coordinates.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    setSelectedStation(station);
                  }
                }}
              >
                <Popup className="custom-flood-popup min-w-[260px]">
                  <div className="p-1 space-y-2 text-slate-100">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                          {station.code}
                        </span>
                        <h4 className="font-bold text-sm text-slate-100 mt-1 leading-tight">{station.name}</h4>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${RISK_LEVELS[riskLevel.replace(' ', '_')]?.badgeClass || 'bg-slate-800 text-slate-300'}`}>
                        {riskLevel}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400">{station.location}</p>

                    {/* Hydrological Telemetry Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Water Level</span>
                        <span className="font-mono font-bold text-cyan-300">
                          {formatWaterLevel(station.currentTelemetry?.waterLevel)}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          ({station.currentTelemetry?.waterLevelPercentage?.toFixed(0)}% Cap)
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Rate of Rise</span>
                        <span className={`font-mono font-bold ${
                          station.currentTelemetry?.rateOfRise > 10 ? 'text-rose-400' : 'text-slate-200'
                        }`}>
                          {formatRateOfRise(station.currentTelemetry?.rateOfRise)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Precipitation</span>
                        <span className="font-mono text-sky-300">
                          {formatRainfall(station.currentTelemetry?.rainfallIntensity)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">AI Risk Score</span>
                        <span className="font-mono font-bold text-white">
                          {station.riskAnalysis?.riskScore || 0} / 100
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => onOpenStationDetail && onOpenStationDetail(station)}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-1.5 px-2 rounded-lg text-xs flex items-center justify-center space-x-1 transition shadow"
                      >
                        <span>Deep-Dive</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onOpenResponseLog && onOpenResponseLog(station)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-1.5 px-2.5 rounded-lg text-xs transition border border-slate-700"
                        title="Log Incident Response Action"
                      >
                        Log Action
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
