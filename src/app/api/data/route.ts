import fs from 'fs';
import path from 'path';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
  const filePath = path.join(process.cwd(), 'public', 'data', '2025.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return NextResponse.json(JSON.parse(jsonData), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

