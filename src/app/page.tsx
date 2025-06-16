"use client";

import dynamic from 'next/dynamic';
import Head from 'next/head';

// Leaflet needs to run only on the client side
const LeafletMap = dynamic(() => import('@/components/leaflet_map_component'), { ssr: false });
import { useEffect, useState } from "react";
import type { Station } from "@/models/station_model";
import { Navbar } from './../components/navbar';

export default function Home() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(json => {
        const values = Object.values(json)[0]; // Only one date key expected
        setStations(Array.isArray(values) ? values : []);
      });
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <LeafletMap stations={stations} />
    </div>
  );
}
