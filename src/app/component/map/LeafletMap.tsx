'use client';
import L, { Layer } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { setSelectedGeoJson } from '../../../store/store';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

type SigData = {
  ctprvn_code: string | null;
  sigungu_code: string;
  sigungu_en: string | null;
  sigungu_ko: string | null;
  geom: string | null; // GeoJSON 형식으로 변환될 수 있는 WKT 문자열
  king: string | null;
  king_title: string | null;
  king_img: string | null;
  flower: string | null;
  animal: string | null;
  tree: string | null;
  population: number | null;
  carea: string | null;
  ci_logo_url: string | null;
};

function convertToGeoJSON(data: SigData[]): FeatureCollection<Geometry> {
  const geoJSON: FeatureCollection<Geometry> = {
    type: 'FeatureCollection',
    features: data.map((item) => {
      var geometry = null;
      try {
        geometry = parseWKT(item.geom); // WKT를 GeoJSON 형식으로 파싱
      } catch (error) {
        console.log('여기서 에러');
      }

      return {
        type: 'Feature',
        geometry,
        properties: {
          ctprvn_code: item.ctprvn_code,
          sigungu_code: item.sigungu_code,
          sigungu_en: item.sigungu_en,
          sigungu_ko: item.sigungu_ko,
          king: item.king,
          king_title: item.king_title,
          king_img: item.king_img,
          flower: item.flower,
          animal: item.animal,
          tree: item.tree,
          population: item.population,
          carea: item.carea,
          ci_logo_url: item.ci_logo_url,
        },
      } as Feature<Geometry>;
    }),
  };
  return geoJSON;
}

function parseWKT(wkt: string | null): Geometry | null {
  if (!wkt) return null; // Handle the case where WKT is null

  const match = wkt.match(/^MULTIPOLYGON\(\(\((.+)\)\)\)$/);
  if (!match) return null; // Handle invalid format

  // Split the MULTIPOLYGON string into separate polygons
  const polygons = match[1]
    .split(/\)\s*,\s*\(\(/) // Split by ")),((" to separate each polygon
    .map((polygon) =>
      polygon
        .split("),(") // Split by "),(" to separate each ring within the polygon
        .map((ring) =>
          ring.split(",").map((coord) => {
            const [lng, lat] = coord.trim().split(" ");
            return [parseFloat(lng), parseFloat(lat)];
          })
        )
    );

  return {
    type: 'MultiPolygon',
    coordinates: polygons, // Structure to match GeoJSON format
  };
}


const LeafletMap: React.FC = () => {
  const dispatch = useDispatch();
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [humanCnt, setHumanCnt] = useState<any>(null);
  const [sigDataJson, setSigDataJson] = useState<FeatureCollection<Geometry> | null>(null);
  const colorMap: { [key: string]: string } = {};
 

  useEffect(() => {
   

      const fetchSigData = async () => {
        try {
          const response = await fetch('/api/sig_data');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          const geoJSONData : FeatureCollection<Geometry> = convertToGeoJSON(result);
          console.log(geoJSONData);
          setSigDataJson(geoJSONData);
        } catch (err) {
          console.error(err);
        } 
      };
    
      fetchSigData();

  }, []);

  const getRandomColor = (): string => {
    // Generate a random color in hexadecimal format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const colorByProvinceCode = (code: string): string => {
    // If the code already has an assigned color, return it
    if (colorMap[code]) {
      return colorMap[code];
    }
  
    // Generate a random color and assign it to the code
    const randomColor = getRandomColor();
    colorMap[code] = randomColor;
    return randomColor;
  };

  const styleByFeature = (feature: any) => {
    console.log(feature);
    const provinceCode = feature.properties.sigungu_code; // 시도 코드 추출
    const color = colorByProvinceCode(provinceCode); // 시도 코드에 따른 색상 결정

    return {
      color: color, // 경계선 색상
      weight: 2, // 경계선 두께
      fillColor: color, // 채우기 색상
      fillOpacity: 0.5, // 채우기 불투명도
    };
  };

  const onEachFeature = (feature : any, layer : Layer) => {
    const map = useMap(); // 현재 지도 인스턴스 가져오기

    

    // 시군 이름을 레이블로 표시 (예: `SIG_KOR_NM` 속성 사용)
    if (feature.properties && feature.properties.sigungu_ko) {
      {/* 
      // @ts-ignore */}
      const center = layer.getBounds().getCenter(); // Feature의 중앙점 계산
      const label = L.marker(center, {
        icon: L.divIcon({
          className: 'label', 
          html: `<div style="color : white; width:300px; font-weight: bold; text-shadow : 1px 1px black; display: flex;"><img alt="${feature.properties.sigungu_ko}" src="${feature.properties.ci_logo_url}" style="width:20px; height:20px;" /> ${feature.properties.sigungu_ko}</div>`, 
        }),
        interactive: false, 
      });
      label.addTo(map); 
    }

     layer.on('click', () => {
        var geoJsonRow = feature.properties;
        dispatch(setSelectedGeoJson(geoJsonRow));

     })
  }

  return (
    <MapContainer center={[37.5326, 127.0246]} zoom={13} style={{ width: '100%', height: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {sigDataJson && (
        <GeoJSON 
          data={sigDataJson} 
          style={styleByFeature}
          onEachFeature={onEachFeature}
          
        />
      )}
    </MapContainer>
  );
};

export default LeafletMap;
