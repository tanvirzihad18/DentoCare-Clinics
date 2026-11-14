import React, { useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicContent';
import type { Language } from '../types/clinic';

interface ClinicMapProps {
  lang: Language;
  mapTitle: string;
  directionsLabel: string;
  fallbackNote: string;
}

const MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

const ClinicLocationFallback: React.FC<{
  lang: Language;
  directionsLabel: string;
  fallbackNote: string;
}> = ({ lang, directionsLabel, fallbackNote }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EDF6F7] via-[#F7FAFB] to-[#E2F0F2]">
    <div className="w-12 h-12 rounded-2xl bg-[#0B4F54] text-white flex items-center justify-center mb-4">
      <MapPin className="w-6 h-6" aria-hidden="true" />
    </div>
    <p className="text-base font-bold text-[#0F2942]">
      {CLINIC_INFO.brandEn} · {CLINIC_INFO.brandAr}
    </p>
    <p className="mt-1.5 text-sm text-[#486581] max-w-sm">
      {CLINIC_INFO.address[lang]}
    </p>
    <p className="mt-1 text-xs text-[#627D98]">{fallbackNote}</p>
    <a
      href={CLINIC_INFO.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4F54] hover:bg-[#083D41] rounded-xl min-h-[44px]"
    >
      <span>{directionsLabel}</span>
      <ExternalLink className="w-4 h-4" aria-hidden="true" />
    </a>
  </div>
);

const InteractiveClinicMapInner: React.FC<ClinicMapProps> = ({
  lang,
  directionsLabel,
  fallbackNote,
}) => {
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  if (
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <ClinicLocationFallback
        lang={lang}
        directionsLabel={directionsLabel}
        fallbackNote={fallbackNote}
      />
    );
  }

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={CLINIC_INFO.coordinates}
      defaultZoom={15}
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      style={{ width: '100%', height: '100%' }}
    >
      <AdvancedMarker
        ref={markerRef}
        position={CLINIC_INFO.coordinates}
        onClick={() => setInfoOpen(true)}
        title={`${CLINIC_INFO.brandEn} – ${CLINIC_INFO.brandAr}`}
      >
        <Pin
          background="#0B4F54"
          borderColor="#07363A"
          glyphColor="#3BB4C1"
          scale={1.15}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-[#0F2942]">
            <p className="font-bold text-sm">
              {lang === 'ar' ? CLINIC_INFO.brandAr : CLINIC_INFO.brandEn}
            </p>
            <p className="text-xs text-[#486581] mt-1 leading-relaxed">
              {CLINIC_INFO.address[lang]}
            </p>
            <a
              href={CLINIC_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#0B4F54] underline"
            >
              <span>{directionsLabel}</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export const ClinicMap: React.FC<ClinicMapProps> = (props) => {
  return (
    <div
      aria-label={props.mapTitle}
      className="w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#E2E8EE] bg-[#EDF6F7]"
    >
      {MAPS_API_KEY ? (
        <APIProvider
          apiKey={MAPS_API_KEY}
          libraries={['marker']}
          language="en"
          region="SA"
        >
          <InteractiveClinicMapInner {...props} />
        </APIProvider>
      ) : (
        <ClinicLocationFallback
          lang={props.lang}
          directionsLabel={props.directionsLabel}
          fallbackNote={props.fallbackNote}
        />
      )}
    </div>
  );
};
