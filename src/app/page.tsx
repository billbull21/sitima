"use client";

import dynamic from 'next/dynamic';
import Head from 'next/head';

// Leaflet needs to run only on the client side
const LeafletMap = dynamic(() => import('@/components/leaflet_map_component'), { ssr: false });
import { useEffect, useState } from "react";
import type { Station } from "@/models/station_model";
import { Navbar } from './../components/navbar';
import { getStationsInRange } from '@/lib/fetchStations';

export default function Home() {

  // type StationWithId = Station & { id: string };
  // const [stations, setStations] = useState<StationWithId[]>([]);
  
  // useEffect(() => {
  //   const fetchStations = async () => {
  //   try {
  //     const res = await fetch(`/api/stations-range?start=2025-01-01&end=2025-12-31`);
  //     const data: Record<string, StationWithId[]> = await res.json();

  //     console.log("Fetched stations:", res);

  //     const mappedStations = Object.values(data).flat(); // type is StationWithId[]
  //     setStations(mappedStations);
  //     // const res = await fetch(`/api/stations-range?start=2025-01-01&end=2025-12-31`);
  //     // const data = await res.json();


  //     // // Map each document to the Station model
  //     // const mappedStations = Object.values(data).flat().map(doc => ({
  //     //   ...doc, // spread all properties from doc
  //     // })) as Station[];
  //     // setStations(mappedStations);
  //   } catch (error) {
  //     console.error("Error fetching stations:", error);
  //   }
  // };
  // fetchStations();
  //   fetchStations();
  // }, []);

  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(json => {
        const arr = Object.values(json);
        const values = arr[0]; // Only one date key expected
        setStations(Array.isArray(values) ? values : []);
      }).catch(error => {
        console.error("Error fetching stations:", error);
      });
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <LeafletMap stations={stations} />
    </div>
  );
}
