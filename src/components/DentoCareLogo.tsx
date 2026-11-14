import React from 'react';
import type { Language } from '../types/clinic';

interface DentoCareLogoProps {
  lang: Language;
  variant?: 'light' | 'dark';
  showDualName?: boolean;
}

export const DentoCareLogo: React.FC<DentoCareLogoProps> = ({
  lang,
  variant = 'dark',
  showDualName = false,
}) => {
  const isLight = variant === 'light';

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="40"
          height="40"
          rx="12"
          fill={isLight ? '#FFFFFF' : '#0B4F54'}
        />
        <path
          d="M14.2 11.5C11.9 11.5 10.2 13.4 10.4 16.1C10.7 19.6 12.1 24.4 13.5 27.6C14.1 29.1 15.7 29.2 16.4 27.7L18.1 23.6C18.8 22 21.2 22 21.9 23.6L23.6 27.7C24.3 29.2 25.9 29.1 26.5 27.6C27.9 24.4 29.3 19.6 29.6 16.1C29.8 13.4 28.1 11.5 25.8 11.5C24.1 11.5 22.4 12.3 20 12.3C17.6 12.3 15.9 11.5 14.2 11.5Z"
          stroke={isLight ? '#0B4F54' : '#FFFFFF'}
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 15.6C17.2 16.4 18.6 16.7 20 16.7C21.4 16.7 22.8 16.4 24 15.6"
          stroke="#3BB4C1"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${
            isLight ? 'text-white' : 'text-[#0F2942]'
          }`}
        >
          {showDualName
            ? 'DentoCare Clinics · عيادات دنتوكير'
            : lang === 'ar'
              ? 'عيادات دنتوكير'
              : 'DentoCare Clinics'}
        </span>
      </span>
    </span>
  );
};
