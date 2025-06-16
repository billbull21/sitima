type Pos = {
  id: string;
  wilayah: string;
  longlat: string;
  nama: string;
  kabupaten: string;
  tanggal: string;
  siaga_hijau: string;
  siaga_kuning: string;
  siaga_merah: string;
  sungai: string;
};

export type StationTimeInput = {
  waktu: string;
  jam: string;
  wlevel: string;
  wlevel_mdpl: string;
  distance: string;
  status: string;
  debit?: number;
};

type Manual = {
  enam: string;
  wlevel_enam: string;
  status_enam: string;
  duabelas: string;
  wlevel_duabelas: string;
  status_duabelas: string;
  delapanbelas: string;
  wlevel_delapanbelas: string;
  status_delapanbelas: string;
};

export type Station = {
  pos: Pos;
  pagi: StationTimeInput[];
  siang: StationTimeInput[];
  sore: StationTimeInput[];
  malam: StationTimeInput[];
  last_data: StationTimeInput[];
  manual: Manual;
};