"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import type { Station } from "@/models/station_model";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function StationDetailPage() {
  const { id } = useParams();
  const [stationData, setStationData] = useState<
    { date: string; station: Station }[]
  >([]);
  const [stationInfo, setStationInfo] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("2025"); // <-- add year state

  useEffect(() => {
    setLoading(true);
    fetch(`/api/data?year=${year}`)
      .then((res) => res.json())
      .then((json) => {
        const result: { date: string; station: Station }[] = [];
        Object.entries(json).forEach(([date, stations]) => {
          if (Array.isArray(stations)) {
            const found = stations.find((s: any) => s?.pos?.id === id);
            if (found) result.push({ date, station: found });
          }
        });
        setStationData(result.reverse());
        if (result.length > 0) setStationInfo(result[0].station);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, year]); // <-- add year dependency

  // Prepare chart data: flatten all time slots for this station across dates
  type TimeSlot = "pagi" | "siang" | "sore" | "malam";
  const timeSlots: TimeSlot[] = ["pagi", "siang", "sore", "malam"];
  const chartData = stationData.flatMap(({ date, station }) =>
    timeSlots.flatMap((time) =>
      ((station as Record<TimeSlot, any[]>)[time] || []).map((m: any) => ({
        ...m,
        date,
        waktu: m.waktu,
        jam: m.jam,
        wlevel: Number(m.wlevel),
      }))
    )
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 px-8">
        {/* Year selector */}
        <div className="mb-4 flex justify-start">
          <label className="mr-2 font-medium" htmlFor="year-select">
            Tahun:
          </label>
          <select
            id="year-select"
            className="border rounded px-2 py-1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {[2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center mt-10">Loading...</div>
        ) : stationInfo ? (
          <Card>
            <CardContent>
              <h1 className="text-2xl font-bold mb-2">
                {stationInfo.pos.nama}
              </h1>
              <p className="text-sm text-muted-foreground mb-2">
                {stationInfo.pos.kabupaten}
              </p>
              <p className="text-sm mb-2">Sungai: {stationInfo.pos.sungai}</p>
              <p className="text-sm mb-2">ID: {stationInfo.pos.id}</p>
              <div className="h-72 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <XAxis
                      dataKey="waktu"
                      tickFormatter={(v) => {
                        if (!v) return "";
                        const date = new Date(v.replace(" ", "T"));
                        return chartData.length > 40
                          ? date.toLocaleString("default", { month: "short" })
                          : `${date.getDate()} ${date.toLocaleString(
                              "default",
                              { month: "short" }
                            )}`;
                      }}
                      minTickGap={10}
                    />
                    <YAxis
                      domain={[
                        (dataMin: number) => Math.floor(dataMin - 0.1),
                        (dataMax: number) => Math.ceil(dataMax + 0.1),
                      ]}
                    />
                    <Tooltip
                      labelFormatter={(v) => {
                        if (!v) return "";
                        const date = new Date(v.replace(" ", "T"));
                        return date.toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="wlevel"
                      stroke="#1e40af"
                      fill="#93c5fd"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs mt-2 text-gray-500">
                Data dari {stationData.length} hari, total {chartData.length}{" "}
                pengukuran.
              </p>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center mt-10">
            Data tidak ditemukan untuk ID {id}
          </p>
        )}
      </div>
    </div>
  );
}
