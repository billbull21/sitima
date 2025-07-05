// lib/fetchStations.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Station } from "@/models/station_model";

export async function getStationsByDate(date: string): Promise<(Station & { id: string })[]> {
  const stationsCol = collection(db, `riverStations/${date}/stations`);
  const snapshot = await getDocs(stationsCol);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as (Station & { id: string })[];
}

export async function getStationsInRange(start: string, end: string): Promise<Record<string, (Station & { id: string })[]>> {
  const riverStationsCol = collection(db, "riverStations");
  
  const snapshot = await getDocs(riverStationsCol);

  console.log("Fetching river stations from range:", snapshot.docs);
  
  // Convert start/end to Date objects for comparison
  const startDate = new Date(start);
  const endDate = new Date(end);

  const selectedDates = snapshot.docs
    .map(doc => doc.id)
    .filter(dateStr => {
      const current = new Date(dateStr);
      return current >= startDate && current <= endDate;
    });

  const result: Record<string, (Station & { id: string })[]> = {};

  for (const date of selectedDates) {
    const stationsCol = collection(db, `riverStations/${date}/stations`);
    const stationSnap = await getDocs(stationsCol);

    result[date] = stationSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (Station & { id: string })[];
  }

  return result;
}
