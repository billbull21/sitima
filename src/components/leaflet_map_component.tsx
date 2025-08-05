"use client";

// Fix missing default marker icons in Leaflet when using Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

import type { Station } from "@/models/station_model";
import L, { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Card, CardContent } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "./ui/button";

// Fix missing default marker icons in Leaflet when using Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface LeafletMapComponentProps {
  stations: Station[];
}

const FitBounds = ({ positions }: { positions: LatLngTuple[] }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions);
    }
  }, [positions, map]);

  return null;
};

const LeafletMapComponent = ({ stations }: LeafletMapComponentProps) => {
  // Default center position for the map
  // Calculate center position based on the average of all station coordinates
  // const latlngs = stations
  //   .map(station => station.pos.longlat.split(',').map(Number))
  //   .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));

  const latlngs: LatLngTuple[] = stations
    .map((station) => {
      const [latStr, lngStr] = station.pos.longlat.split(",");
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      return !isNaN(lat) && !isNaN(lng) ? ([lat, lng] as LatLngTuple) : null;
    })
    .filter((v): v is LatLngTuple => v !== null);

  const centerPosition: LatLngTuple =
    latlngs.length > 0
      ? [
          latlngs.reduce((sum, [lat]) => sum + lat, 0) / latlngs.length,
          latlngs.reduce((sum, [, lng]) => sum + lng, 0) / latlngs.length,
        ]
      : [-7.797068, 110.370529];

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <FitBounds positions={latlngs} />
      {stations.map((station, i) => (
        <Marker
          key={i}
          position={
            station.pos.longlat.split(",").map(Number) as LatLngExpression
          }
        >
          <Popup>
            <Card key={i} className="rounded-2xl shadow p-4">
              <CardContent>
                <h2 className="text-xl font-bold">{station.pos.nama}</h2>
                <p className="text-sm text-muted-foreground">
                  {station.pos.kabupaten}
                </p>
                <p className="text-sm">Sungai: {station.pos.sungai}</p>
                <p className="text-sm">
                  Status Terakhir: {station.last_data[0]?.status}
                </p>
                <div className="h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={(
                        ["pagi", "siang", "sore", "malam"] as Array<
                          keyof Pick<
                            Station,
                            "pagi" | "siang" | "sore" | "malam"
                          >
                        >
                      )
                        .map((time) => station[time]?.[0])
                        .filter(Boolean)}
                    >
                      <XAxis dataKey="jam" />
                      <YAxis domain={[0, "auto"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="wlevel" stroke="#1e40af" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm mt-2">
                  Terakhir Update: {station.pos.tanggal}
                </p>
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() => {
                    const url = `/stations/${station.pos.id}`;
                    window.open(url, "_blank");
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMapComponent;
