import type { SVGProps } from 'react';

export function PhonePeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill="#5f259f" />
      <path
        d="M62.3,42.9H44.1c-1.1,0-2,0.9-2,2v22.4c0,1.1,0.9,2,2,2h18.2c1.1,0,2-0.9,2-2V44.9C64.3,43.8,63.4,42.9,62.3,42.9z M59.8,64.8H46.6V47.4h13.2V64.8z"
        fill="#ffffff"
      />
      <path
        d="M38.6,30.7h18.2c1.1,0,2-0.9,2-2V22c0-1.1-0.9-2-2-2H38.6c-1.1,0-2,0.9-2,2v6.7C36.6,29.8,37.5,30.7,38.6,30.7z"
        fill="#ffffff"
      />
    </svg>
  );
}
