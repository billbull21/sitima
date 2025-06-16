import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'sample.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  res.status(200).json(JSON.parse(jsonData));
}
