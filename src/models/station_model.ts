// models/station_model.ts

export interface Station {
  pos: {
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
  pagi: Measurement[];
  siang: Measurement[];
  sore: Measurement[];
  malam: Measurement[];
  last_data: Measurement[];
  manual: {
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
}

export interface Measurement {
  waktu: string;
  jam: string;
  wlevel: string;
  wlevel_mdpl: string;
  distance: string;
  status: string;
}
