// pages/api/stations-range.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getStationsInRange } from "@/lib/fetchStations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store"); // 👈 Force no cache
  const { start = "2025-01-01", end = "2025-12-31" } = req.query;

  try {
    const data = await getStationsInRange(start as string, end as string);
    console.log("Fetched stations in range API:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
}
