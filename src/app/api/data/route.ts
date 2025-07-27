import fs from 'fs';
import path from 'path';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') || '2025';
  const filePath = path.join(process.cwd(), 'public', 'data', `${year}.json`);

  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(jsonData), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

