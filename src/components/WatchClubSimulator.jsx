import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  RotateCw,
  RotateCcw,
  Star,
  Store as StoreIcon,
  User,
  Phone,
  Lock,
  Unlock,
  CheckCircle2,
  Package,
  Edit3,
  ChevronDown,
  Gift,
  Check,
  ShieldCheck,
  Tag,
  Search,
  X,
  Sparkles,
} from 'lucide-react'
import confetti from 'canvas-confetti'

// 1. Eight representative Watch Club stores
export const STORES_LIST = [
  { id: 'APJ', name: 'Ambarukmo Plaza Jogja', city: 'Yogyakarta' },
  { id: 'KKJ', name: 'Kota Kasablanka Jakarta', city: 'Jakarta' },
  { id: 'SMB', name: 'Summarecon Mall Bandung', city: 'Bandung' },
  { id: 'PAR', name: 'Paragon Semarang', city: 'Semarang' },
  { id: 'PAN', name: 'Panakukang Makassar', city: 'Makassar' },
  { id: 'EWB', name: 'E-Walk Balikpapan', city: 'Balikpapan' },
  { id: 'AEO', name: 'AEON Sentul', city: 'Bogor' },
  { id: 'DUT', name: 'Duta Mall 1 Banjarmasin', city: 'Banjarmasin' },
]

// 2. Initial prizes catalogue
export const PRIZES_CATALOG = [
  { id: 'prz_jam', text: 'Jam Tangan Eksklusif', displayText: 'Jam Tangan Eksklusif', isGrandPrize: true, defaultStock: 2 },
  { id: 'prz_pouch', text: 'Pouch Serut Premium', displayText: 'Pouch Serut Premium', isGrandPrize: false, defaultStock: 5 },
  { id: 'prz_lap', text: 'Lap Microfiber Jam', displayText: 'Lap Jam Tangan', isGrandPrize: false, defaultStock: 4 },
  { id: 'prz_pulpen', text: 'Pulpen Eksklusif WC', displayText: 'Pulpen Eksklusif', isGrandPrize: false, defaultStock: 6 },
  { id: 'prz_sticker', text: 'Sticker Pack Watch Club', displayText: 'Sticker Pack WC', isGrandPrize: false, defaultStock: 8 },
  { id: 'prz_strap', text: 'Strap Rantai Stainless', displayText: 'Strap Rantai', isGrandPrize: false, defaultStock: 3 },
]

// Preset starting inventories per store
const INITIAL_STORE_STOCKS = {
  APJ: { prz_jam: 2, prz_pouch: 5, prz_lap: 4, prz_pulpen: 6, prz_sticker: 8, prz_strap: 3 },
  KKJ: { prz_jam: 1, prz_pouch: 6, prz_lap: 5, prz_pulpen: 7, prz_sticker: 10, prz_strap: 4 },
  SMB: { prz_jam: 2, prz_pouch: 4, prz_lap: 3, prz_pulpen: 5, prz_sticker: 6, prz_strap: 2 },
  PAR: { prz_jam: 1, prz_pouch: 5, prz_lap: 4, prz_pulpen: 4, prz_sticker: 7, prz_strap: 3 },
  PAN: { prz_jam: 2, prz_pouch: 3, prz_lap: 2, prz_pulpen: 5, prz_sticker: 5, prz_strap: 2 },
  EWB: { prz_jam: 1, prz_pouch: 4, prz_lap: 3, prz_pulpen: 6, prz_sticker: 8, prz_strap: 1 },
  AEO: { prz_jam: 2, prz_pouch: 7, prz_lap: 5, prz_pulpen: 8, prz_sticker: 9, prz_strap: 4 },
  DUT: { prz_jam: 1, prz_pouch: 3, prz_lap: 4, prz_pulpen: 4, prz_sticker: 6, prz_strap: 2 },
}

// Watch Club Logo SVG
function WatchClubLogo({ className = 'w-28' }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg viewBox="0 0 793.3 106.2" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-white">
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.3,44.8c0.6-1.5,1.2-3.3,1.9-5.3c0.7-2.1,1.1-3.8,1.4-5c0.3-1.5,0.5-2.6,0.5-3.4c0.1-0.8,0-1.8-0.1-2.9 h16.3c-1.8,2.5-3.7,5.7-5.6,9.5c-1.5,3.1-2.9,6.1-4,9.1l-22.5,59.4H57.6l-0.5-59.4l-22.9,59.4h-31L2.5,47.8c0-5.9-0.2-10-0.6-12.2 c-0.2-1.7-0.9-4.2-1.9-7.4h34.9c-0.5,1.4-0.9,2.5-1.2,3.3c-0.3,0.9-0.5,1.8-0.7,2.8c-0.3,1.6-0.5,3.4-0.5,5.3c0,0.2,0,1.7,0.1,4.4 L33.3,78l19.2-49.8h34.1L87.1,78L100.3,44.8z M188.9,28.2h-54l-5.8,18.6c2.1-1.2,4-2.1,5.8-2.6c1.8-0.5,4-0.7,6.7-0.7h29.6 c2,0,3.2,0.4,3.8,1.1c0.6,0.7,0.7,2,0.3,3.9c-0.4,1.8-1,3.1-1.8,3.9c-0.8,0.7-2.2,1.1-4.2,1.1h-27c-6.5,0-11.4,1.9-14.7,5.7 c-3,3.4-5.3,9.4-7,17.9l-1.1,5.5c-1.6,8.4-1.5,14.4,0.2,18.1c1.8,3.7,5.9,5.5,12.3,5.5h21.1c4.1,0,7.1-0.6,8.9-1.7 c1.8-1.1,3.5-3.4,5.1-7l-0.2,8.7h29.6c-0.7-1.7-1-3.7-1.1-5.8c0-2.1,0.3-5.1,1-8.8l6.6-34.1c2.1-10.7,2-18.3-0.2-22.7 C200.6,30.4,196,28.2,188.9,28.2 M158,68.8h13.2l-2.1,11.1c-1,5-1.9,8.1-2.8,9.3c-0.9,1.2-2.8,1.8-5.6,1.8h-7 c-2.3,0-3.9-0.4-4.6-1.3c-0.8-0.9-0.9-2.6-0.4-5.3l1.7-8.9c0.5-2.8,1.3-4.6,2.3-5.4C153.8,69.2,155.6,68.8,158,68.8 M233.4,12.4 l29.9-1.1l-3.3,17h23.6l-2.9,15.3h-23.6l-7.9,41.1c-0.5,2.6-0.5,4.3,0,5.1c0.5,0.8,2.1,1.2,4.6,1.2h10.5c2.5,0,4.7-0.3,6.5-0.9 c1.8-0.6,3.4-1.3,4.7-2l-5.4,18.3h-37.2c-5.4,0-9.2-1.6-11.4-4.8c-2.8-3.9-3.3-10.5-1.5-19.5l7.4-38.4h-12.7l2.9-15.3h12.7 L233.4,12.4z M311,83l6.1-31.5c1-5.3,3.8-7.9,8.3-7.9h17c7,0,11.4,1.4,13.1,4.1l1.1-19.4h-46.1c-6.5,0-11.7,2.3-15.7,6.8 c-3.6,4.1-6.1,9.8-7.5,17.3l-5.7,29.7c-1.5,7.6-1.1,13.6,1,17.8c2.1,4.2,6.4,6.4,13,6.4h45.9l5.8-19c-2.3,1.2-4.5,2.2-6.6,2.8 c-2.1,0.6-5.4,0.9-9.7,0.9h-14.5C311.7,90.9,309.9,88.3,311,83 M400.3,0l-6.9,35.8c2.1-2.8,3.4-4.5,4-5.2c1.4-1.6,3-2.4,4.8-2.4 h23.1c6.8,0,11.3,2.5,13.5,7.4c2.3,4.9,2.5,11.9,0.8,21l-6.1,31.7c-0.9,4.9-1.4,8.7-1.3,11.4c0.1,1.5,0.4,3.6,1.1,6.5h-36.2 c2-3.2,3.4-6,4.3-8.5c0.9-2.5,1.7-5.6,2.4-9.4l7.4-38.4c0.4-2.3,0.4-4-0.1-5c-0.5-1-1.7-1.5-3.6-1.5h-10.8c-1.8,0-3.2,0.5-4.1,1.4 c-0.9,0.9-1.6,2.6-2,5.1l-7.4,38.4c-0.9,4.9-1.4,8.7-1.3,11.4c0.1,1.5,0.4,3.6,1.1,6.5H347c2-3.2,3.4-6,4.3-8.5 c0.9-2.5,1.7-5.6,2.4-9.4l13.6-70.5c0.9-4.9,1.4-8.7,1.3-11.4c-0.1-1.5-0.4-3.6-1.1-6.5H400.3z M520.3,83c-1,5.3,0.7,7.9,5.3,7.9 H540c4.4,0,7.6-0.3,9.7-0.9c2.1-0.6,4.3-1.5,6.6-2.8l-5.8,19h-45.9c-6.5,0-10.9-2.1-13-6.4c-2.1-4.2-2.4-10.2-1-17.8l5.7-29.7 c1.4-7.5,4-13.3,7.5-17.3c4-4.5,9.2-6.8,15.7-6.8h46.1l-1.1,19.4c-1.7-2.7-6.1-4.1-13.1-4.1h-17c-4.5,0-7.3,2.6-8.3,7.9L520.3,83z M578.4,17.9l-13.6,70.5c-0.7,3.8-1.5,6.9-2.4,9.4c-0.9,2.5-2.3,5.3-4.3,8.5h36.2c-0.7-2.8-1-5-1.1-6.5c-0.1-2.7,0.3-6.5,1.3-11.4 l17-88.3h-32.9c0.7,2.8,1.1,5,1.1,6.5C579.8,9.2,579.4,13,578.4,17.9 M659.6,106.2l0.6-8.1c-1.5,2.6-2.8,4.4-3.9,5.5 c-1.7,1.7-3.5,2.6-5.5,2.6h-24c-6.8,0-11.3-2.5-13.5-7.4c-2.2-4.9-2.4-11.9-0.7-21l6.1-31.7c0.9-4.9,1.4-8.7,1.3-11.4 c-0.1-1.5-0.4-3.6-1.1-6.5h32.9l-10.8,56.3c-0.5,2.5-0.5,4.2,0.1,5.1c0.5,0.9,1.7,1.4,3.5,1.4h10.8c1.9,0,3.3-0.5,4.2-1.4 c0.9-0.9,1.6-2.6,2-5.1l7.4-38.4c0.9-4.9,1.4-8.7,1.3-11.4c-0.1-1.5-0.4-3.6-1.1-6.5H702l-11.6,60.1c-0.9,4.9-1.4,8.7-1.3,11.4 c0.1,1.5,0.4,3.6,1.1,6.5H659.6z M700.1,106.2h29.6l3.5-8.3c0.6,3.2,1.2,5.4,1.8,6.5c0.7,1.2,1.8,1.8,3.3,1.8h25 c6.5,0,11.7-2.3,15.7-6.8c3.6-4.1,6.1-9.8,7.5-17.3l5.7-29.7c1.5-7.6,1.2-13.5-0.8-17.5c-2.2-4.4-6.6-6.6-13.1-6.6h-23.2 c-2.5,0-4.5,0.9-6.2,2.6c-0.9,1-2,2.6-3.2,5L752.7,0h-32.2c0.5,2,0.8,4,0.8,6s-0.4,4.9-1.1,8.6l-14.8,77.1c-0.7,3.7-1.5,6.6-2.4,8.8 C702.2,102.6,701.2,104.5,700.1,106.2 M736.3,85l6.9-35.6c0.8-3.9,2.5-5.9,5.3-5.9h11.8c2.7,0,3.7,2,3,5.9L756.4,85 c-0.8,3.9-2.5,5.9-5.2,5.9h-11.8C736.6,90.9,735.6,89,736.3,85"
        />
      </svg>
    </div>
  )
}

// SpinWheelFrame SVG with Curved Banner Title
function SpinWheelFrameHeader({ className = '' }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 246 127"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
      className={className}
    >
      <g transform="matrix(1,0,0,1,-517.706334,-81.396972)">
        <g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M467.417,86.202C466.547,87.038 466.104,88.166 466.106,89.283C466.104,90.346 466.505,91.422 467.301,92.248C468.341,93.33 469.742,93.88 471.132,93.878C472.454,93.88 473.79,93.382 474.818,92.393C476.187,91.076 476.881,89.307 476.88,87.547C476.881,85.874 476.253,84.186 475.001,82.886C474.18,82.033 473.268,81.355 472.273,80.893C471.28,80.429 470.206,80.187 469.106,80.188C467.051,80.188 464.961,81.013 462.925,82.548L462.927,82.547L443.261,97.324L443.259,97.325C439.52,100.14 436.023,101.407 432.875,101.406C431.178,101.405 429.566,101.043 428.016,100.322C426.466,99.602 424.977,98.516 423.568,97.053C421.72,95.131 420.806,92.668 420.805,90.197C420.806,87.597 421.817,85.014 423.837,83.07C425.192,81.766 426.925,81.124 428.667,81.122C430.5,81.124 432.318,81.835 433.689,83.259C434.589,84.195 435.031,85.388 435.032,86.591C435.031,87.857 434.541,89.109 433.558,90.056C432.932,90.658 432.138,90.952 431.333,90.953C430.486,90.951 429.653,90.626 429.02,89.969C428.513,89.442 427.675,89.426 427.148,89.933C426.621,90.44 426.605,91.278 427.112,91.805C428.258,92.997 429.801,93.603 431.333,93.601C432.79,93.602 434.262,93.055 435.394,91.964C436.912,90.504 437.682,88.543 437.68,86.591C437.681,84.735 436.986,82.865 435.597,81.423C433.713,79.464 431.185,78.473 428.667,78.474C426.272,78.473 423.862,79.369 422.001,81.162C419.446,83.619 418.155,86.912 418.157,90.197C418.155,93.32 419.322,96.46 421.66,98.889C423.261,100.552 425.014,101.846 426.898,102.723C428.781,103.601 430.796,104.055 432.875,104.054C436.75,104.053 440.795,102.497 444.852,99.44L444.851,99.441L464.517,84.664L464.518,84.663C466.237,83.37 467.778,82.835 469.106,82.836C469.824,82.837 470.496,82.987 471.156,83.293C471.815,83.6 472.464,84.069 473.093,84.722C473.856,85.516 474.23,86.526 474.232,87.547C474.23,88.621 473.816,89.681 472.982,90.485C472.461,90.985 471.802,91.229 471.132,91.23C470.427,91.229 469.736,90.959 469.209,90.412C468.902,90.093 468.755,89.694 468.754,89.283C468.755,88.852 468.918,88.433 469.253,88.11C469.78,87.603 469.796,86.764 469.289,86.238C468.782,85.711 467.944,85.695 467.417,86.202Z"
              fill="#f3c032"
            />
          </g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M330.74,88.11C331.075,88.433 331.238,88.851 331.24,89.283C331.238,89.694 331.091,90.093 330.785,90.412C330.258,90.959 329.566,91.229 328.861,91.23C328.191,91.229 327.532,90.985 327.011,90.485C326.177,89.681 325.763,88.621 325.762,87.547C325.763,86.526 326.137,85.516 326.9,84.722C327.529,84.069 328.178,83.6 328.837,83.293C329.498,82.987 330.169,82.837 330.887,82.836C332.215,82.835 333.756,83.37 335.475,84.663L335.476,84.664L355.142,99.441L355.141,99.44C359.198,102.497 363.243,104.053 367.118,104.054C369.197,104.055 371.212,103.601 373.095,102.723C374.98,101.846 376.732,100.552 378.333,98.889C380.671,96.46 381.838,93.32 381.837,90.197C381.838,86.912 380.547,83.619 377.993,81.162C376.131,79.369 373.721,78.473 371.326,78.474C368.808,78.473 366.281,79.464 364.396,81.423C363.007,82.865 362.312,84.735 362.313,86.591C362.312,88.543 363.081,90.504 364.599,91.964C365.732,93.055 367.203,93.602 368.66,93.601C370.192,93.603 371.735,92.997 372.882,91.805C373.389,91.278 373.372,90.44 372.846,89.933C372.319,89.426 371.481,89.442 370.974,89.969C370.34,90.626 369.507,90.951 368.66,90.953C367.855,90.952 367.061,90.658 366.435,90.056C365.452,89.109 364.963,87.857 364.961,86.591C364.963,85.388 365.405,84.195 366.304,83.259C367.675,81.835 369.493,81.124 371.326,81.122C373.069,81.124 374.801,81.766 376.157,83.07C378.176,85.014 379.187,87.597 379.189,90.197C379.187,92.668 378.274,95.131 376.425,97.053C375.017,98.516 373.527,99.602 371.978,100.322C370.427,101.043 368.815,101.405 367.118,101.406C363.97,101.407 360.473,100.14 356.734,97.325L356.733,97.324L337.067,82.547L337.068,82.548C335.032,81.013 332.942,80.188 330.887,80.188C329.787,80.187 328.713,80.429 327.72,80.893C326.725,81.355 325.813,82.033 324.992,82.886C323.74,84.186 323.112,85.874 323.114,87.547C323.112,89.307 323.806,91.076 325.175,92.393C326.203,93.382 327.539,93.88 328.861,93.878C330.252,93.88 331.652,93.33 332.693,92.248C333.488,91.422 333.889,90.346 333.888,89.283C333.889,88.166 333.446,87.038 332.577,86.202C332.05,85.695 331.211,85.711 330.704,86.238C330.197,86.764 330.214,87.603 330.74,88.11Z"
              fill="#f3c032"
            />
          </g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M521.283,139.822C520.786,139.555 515.87,136.419 504.959,112.255C499.923,101.102 492.35,95.908 481.125,95.908C475.073,95.908 468.355,97.325 461.243,98.827C453.069,100.55 443.806,102.505 434.222,102.505C405.585,102.505 402.247,81.637 402.12,80.757C401.969,79.646 401.069,78.825 400.007,78.82L399.999,78.82C398.941,78.82 398.039,79.642 397.88,80.749C397.752,81.637 394.415,102.505 365.778,102.505C356.195,102.505 346.931,100.55 338.757,98.827C331.645,97.326 324.927,95.908 318.875,95.908C307.65,95.908 300.076,101.102 295.04,112.254C284.128,136.418 279.213,139.555 278.716,139.822C277.816,140.102 277.18,140.98 277.18,141.996C277.18,143.01 277.816,143.889 278.716,144.169C279.213,144.435 284.126,147.571 295.04,171.737C300.076,182.89 307.65,188.084 318.875,188.084C324.927,188.084 331.645,186.667 338.757,185.166C346.93,183.441 356.194,181.486 365.778,181.486C394.375,181.486 397.743,202.296 397.879,203.239C398.033,204.348 398.932,205.167 399.992,205.172L400,205.172C401.059,205.172 401.959,204.35 402.119,203.243C402.247,202.355 405.585,181.486 434.222,181.486C443.805,181.486 453.069,183.441 461.243,185.166C468.355,186.666 475.073,188.084 481.125,188.084L481.126,188.084C492.349,188.084 499.923,182.889 504.959,171.737C515.87,147.575 520.786,144.436 521.283,144.169C522.184,143.889 522.82,143.01 522.82,141.996C522.82,140.98 522.182,140.102 521.283,139.822Z"
              fill="#f3c032"
            />
          </g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M365.778,174.705C383.449,174.705 392.953,182.033 397.814,188.18C398.642,189.228 399.367,190.274 400,191.297C400.633,190.274 401.357,189.228 402.186,188.18C407.047,182.033 416.551,174.705 434.222,174.705C444.444,174.705 454.041,176.73 462.508,178.517C469.299,179.95 475.711,181.303 481.125,181.303C489.919,181.303 495.139,177.688 499.141,168.825C504.977,155.901 509.978,146.932 514.089,141.996C509.978,137.06 504.977,128.09 499.141,115.166C495.139,106.304 489.919,102.689 481.125,102.689C475.711,102.689 469.299,104.042 462.509,105.475C454.042,107.261 444.445,109.286 434.222,109.286C416.551,109.286 407.047,101.959 402.186,95.812C401.357,94.764 400.633,93.718 400,92.695C399.367,93.718 398.642,94.764 397.814,95.812C392.953,101.959 383.449,109.286 365.778,109.286C355.555,109.286 345.959,107.261 337.491,105.475C330.701,104.042 324.288,102.689 318.875,102.689C310.08,102.689 304.861,106.304 300.859,115.166C295.022,128.09 290.021,137.06 285.909,141.996C290.021,146.932 295.022,155.901 300.858,168.825C304.861,177.688 310.08,181.303 318.875,181.303C324.288,181.303 330.701,179.95 337.491,178.517C345.957,176.73 355.555,174.705 365.778,174.705Z"
              fill="#e4383d"
            />
          </g>
        </g>
      </g>

      <defs>
        <path id="sim-luckydip-curve" d="M 25, 75 Q 123, 55 221, 75" fill="transparent" />
        <path id="sim-spinwheel-curve" d="M 60, 88 Q 123, 73 186, 88" fill="transparent" />
        <filter id="sim-text-shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="#991b1b" floodOpacity="1" />
        </filter>
      </defs>
      <text
        fill="#ffffff"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="-1"
        filter="url(#sim-text-shadow)"
      >
        <textPath href="#sim-luckydip-curve" startOffset="50%" textAnchor="middle">
          LUCKYDIP
        </textPath>
      </text>
      <text
        fill="#ffffff"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="13"
        letterSpacing="1"
        filter="url(#sim-text-shadow)"
      >
        <textPath href="#sim-spinwheel-curve" startOffset="50%" textAnchor="middle">
          SPIN WHEEL
        </textPath>
      </text>
    </svg>
  )
}

export default function WatchClubSimulator() {
  // Store state
  const [selectedStoreId, setSelectedStoreId] = useState('APJ')
  const [storeStocks, setStoreStocks] = useState(INITIAL_STORE_STOCKS)
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false)
  const [storeSearch, setStoreSearch] = useState('')

  // Customer form inputs
  const [customerName, setCustomerName] = useState('Budi Santoso')
  const [customerPhone, setCustomerPhone] = useState('081234567890')
  const [isLocked, setIsLocked] = useState(false)

  // Wheel animation states
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState(null)
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false)

  // Canvas refs and animation physics
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const animFrameRef = useRef(null)
  const audioContextRef = useRef(null)
  const lastSliceIndexRef = useRef(-1)
  const lastTickTimeRef = useRef(0)

  // Current store object & current stocks
  const currentStore = STORES_LIST.find((s) => s.id === selectedStoreId) || STORES_LIST[0]
  const currentStockMap = storeStocks[selectedStoreId] || INITIAL_STORE_STOCKS.APJ

  // Total available stock in selected store
  const totalAvailableStock = Object.values(currentStockMap).reduce((a, b) => a + b, 0)

  // Build active wheel slices based on available stock
  const slices = React.useMemo(() => {
    const raw = []
    PRIZES_CATALOG.forEach((prize) => {
      const stock = currentStockMap[prize.id] || 0
      for (let i = 0; i < stock; i++) {
        raw.push({
          id: `${prize.id}_${i}`,
          prizeId: prize.id,
          text: prize.text,
          displayText: prize.displayText,
          isGrandPrize: prize.isGrandPrize,
        })
      }
    })

    if (raw.length === 0) {
      return [
        {
          id: 'empty',
          prizeId: 'none',
          text: 'STOK KOSONG',
          displayText: 'STOK KOSONG',
          isGrandPrize: false,
        },
      ]
    }

    // Interleave dispersion so identical prizes are distributed around the rim
    const groups = {}
    raw.forEach((s) => {
      if (!groups[s.prizeId]) groups[s.prizeId] = []
      groups[s.prizeId].push(s)
    })
    const keys = Object.keys(groups)
    const interleaved = []
    let added = true
    let idx = 0
    while (added) {
      added = false
      for (const k of keys) {
        if (groups[k][idx]) {
          interleaved.push(groups[k][idx])
          added = true
        }
      }
      idx++
    }
    return interleaved
  }, [currentStockMap])

  // Realistic mechanical click synthesized with Web Audio API
  const playTickSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx()
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
      if (!audioContextRef.current) return

      const ctx = audioContextRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(650, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {
      // Audio fallback silent
    }
  }, [])

  // Draw wheel on canvas
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const radius = width / 2

    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.translate(radius, radius)
    ctx.rotate(angleRef.current)

    const totalSlices = slices.length
    const arc = (2 * Math.PI) / totalSlices
    const carnivalColors = ['#d82b2b', '#1e3a8a', '#f4b924']

    for (let i = 0; i < totalSlices; i++) {
      const slice = slices[i]

      // Slice sector
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius - 20, i * arc, (i + 1) * arc)
      ctx.fillStyle = carnivalColors[i % 3]
      ctx.fill()

      // Slice boundary stroke
      ctx.strokeStyle = '#f4b924'
      ctx.lineWidth = 2
      ctx.stroke()

      // Text inside slice
      ctx.save()
      ctx.rotate(i * arc + arc / 2)
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'

      const isYellow = i % 3 === 2
      ctx.fillStyle = isYellow ? '#1e3a8a' : '#ffffff'

      let fontSize = 28
      if (totalSlices > 12) fontSize = 22
      if (totalSlices > 24) fontSize = 16
      if (totalSlices > 45) fontSize = 12

      ctx.font = `bold ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`

      if (!isYellow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'
        ctx.shadowBlur = 4
      }

      let label = slice.displayText
      if (label.length > 20) {
        label = label.substring(0, 18) + '...'
      }
      ctx.fillText(label, radius - 45, 0)
      ctx.restore()
    }

    // Outer wheel border ring (Royal Blue with gold trim)
    ctx.beginPath()
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI)
    ctx.strokeStyle = '#1e3a8a'
    ctx.lineWidth = 20
    ctx.stroke()

    // Outer gold trim
    ctx.beginPath()
    ctx.arc(0, 0, radius - 2, 0, 2 * Math.PI)
    ctx.strokeStyle = '#f4b924'
    ctx.lineWidth = 4
    ctx.stroke()

    // Inner gold trim
    ctx.beginPath()
    ctx.arc(0, 0, radius - 20, 0, 2 * Math.PI)
    ctx.strokeStyle = '#f4b924'
    ctx.lineWidth = 4
    ctx.stroke()

    // Draw 24 golden 5-point stars around the outer ring
    const numStars = 24
    for (let j = 0; j < numStars; j++) {
      const starAngle = (j * (Math.PI * 2)) / numStars
      ctx.save()
      ctx.rotate(starAngle)
      ctx.translate(radius - 10, 0)

      ctx.beginPath()
      for (let k = 0; k < 5; k++) {
        ctx.lineTo(
          Math.cos(((18 + k * 72) * Math.PI) / 180) * 4,
          -Math.sin(((18 + k * 72) * Math.PI) / 180) * 4
        )
        ctx.lineTo(
          Math.cos(((54 + k * 72) * Math.PI) / 180) * 2,
          -Math.sin(((54 + k * 72) * Math.PI) / 180) * 2
        )
      }
      ctx.closePath()
      ctx.fillStyle = '#f4b924'
      ctx.fill()
      ctx.restore()
    }

    ctx.restore()
  }, [slices])

  useEffect(() => {
    drawWheel()
  }, [drawWheel, slices])

  // Easing function
  const easeOutCubic = (t, b, c, d) => {
    t /= d
    t--
    return c * (t * t * t + 1) + b
  }

  // Handle spin execution
  const handleSpin = () => {
    if (!isLocked || isSpinning || slices.length === 0 || slices[0].prizeId === 'none') {
      return
    }

    setIsSpinning(true)

    // Weighted random selection based on current remaining stock
    const availableSlices = slices.filter((s) => s.prizeId !== 'none')
    const randIdx = Math.floor(Math.random() * availableSlices.length)
    const selectedSlice = availableSlices[randIdx]
    const winningIndex = slices.indexOf(selectedSlice)

    const totalSlices = slices.length
    const arc = (2 * Math.PI) / totalSlices
    const targetSliceCenter = winningIndex * arc + arc / 2
    const pointerAngle = 1.5 * Math.PI

    let targetWheelAngle = pointerAngle - targetSliceCenter
    while (targetWheelAngle < 0) targetWheelAngle += 2 * Math.PI

    const startAngle = angleRef.current
    const duration = 5200 // 5.2 seconds
    const startTime = Date.now()
    const extraSpins = Math.PI * 2 * 4 // 4 full rotations
    const targetNormalized = targetWheelAngle % (Math.PI * 2)

    let currentNormalized = startAngle % (Math.PI * 2)
    if (currentNormalized < 0) currentNormalized += Math.PI * 2

    let angleToTravel = targetNormalized - currentNormalized
    if (angleToTravel <= 0) angleToTravel += Math.PI * 2

    const finalTargetAngle = startAngle + extraSpins + angleToTravel

    const animate = () => {
      const now = Date.now()
      const progress = now - startTime

      if (progress < duration) {
        const newAngle = easeOutCubic(progress, startAngle, finalTargetAngle - startAngle, duration)
        angleRef.current = newAngle

        // Tick audio synchronization
        let normalized = newAngle % (2 * Math.PI)
        if (normalized < 0) normalized += 2 * Math.PI
        const currentSlice = Math.floor(((pointerAngle - normalized + 2 * Math.PI) % (2 * Math.PI)) / arc)

        if (currentSlice !== lastSliceIndexRef.current && now - lastTickTimeRef.current > 35) {
          playTickSound()
          lastSliceIndexRef.current = currentSlice
          lastTickTimeRef.current = now
        }

        drawWheel()
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        angleRef.current = finalTargetAngle % (Math.PI * 2)
        drawWheel()
        setIsSpinning(false)

        // Decrement local inventory
        setStoreStocks((prev) => {
          const storeStock = { ...(prev[selectedStoreId] || INITIAL_STORE_STOCKS[selectedStoreId]) }
          if (storeStock[selectedSlice.prizeId] > 0) {
            storeStock[selectedSlice.prizeId] -= 1
          }
          return {
            ...prev,
            [selectedStoreId]: storeStock,
          }
        })

        // Generate synthetic SKU
        const randomNum = Math.floor(1000 + Math.random() * 9000)
        const assignedSku = `WC-${selectedStoreId}-${randomNum}`

        // Trigger celebratory confetti
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#f4b924', '#d82b2b', '#1e3a8a', '#10b981', '#ffffff'],
        })

        // Set result & display modal
        setSpinResult({
          prize: {
            id: selectedSlice.prizeId,
            name: selectedSlice.text,
            displayText: selectedSlice.displayText,
            assignedSku,
          },
          customer: {
            name: customerName,
            phone: customerPhone,
            store: currentStore.name,
          },
        })
        setIsWinnerModalOpen(true)
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  // Fast reset feature to restore full stock and try again
  const handleResetDemo = () => {
    setStoreStocks(INITIAL_STORE_STOCKS)
    setIsLocked(false)
    setIsSpinning(false)
    setIsWinnerModalOpen(false)
    setSpinResult(null)
    setCustomerName('Aditya Pratama')
    setCustomerPhone('081298765432')
  }

  // Filtered stores for modal
  const filteredStores = STORES_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      s.city.toLowerCase().includes(storeSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(storeSearch.toLowerCase())
  )

  return (
    // ROOT VIEWPORT HP: Kunci dengan relative & overflow-hidden penuh
    <div className="relative w-full h-full bg-[#0c3875] carnival-bg text-white overflow-hidden select-none">
      
      {/* LAYER 1: SCROLLABLE CONTENT (Terisolasi dari Lenis) */}
      <div
        data-lenis-prevent
        className="w-full h-full overflow-y-auto overflow-x-hidden overscroll-contain p-3 sm:p-4 flex flex-col justify-between"
      >
        {/* 1. App Topbar */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <WatchClubLogo className="w-20 sm:w-24" />
            <span className="text-[9px] font-mono font-bold bg-[#f4b924] text-red-900 px-1.5 py-0.5 rounded shadow-sm">
              SIMULATOR
            </span>
          </div>

          {/* Quick Reset Button */}
          <button
            type="button"
            onClick={handleResetDemo}
            title="Reset Stok & Form"
            className="flex items-center gap-1 text-[10px] font-mono font-bold bg-white/10 hover:bg-white/20 text-white/90 px-2 py-1 rounded-md transition border border-white/20 active:scale-95"
          >
            <RotateCcw className="w-3 h-3 text-[#f4b924]" />
            <span>Reset</span>
          </button>
        </div>

        {/* 2. Store Active Badge Pill */}
        <div className="mt-2.5 flex items-center justify-between bg-black/30 backdrop-blur-md rounded-xl px-2.5 py-1.5 border border-white/15">
          <div className="flex items-center gap-1.5 truncate">
            <StoreIcon className="w-3.5 h-3.5 text-[#f4b924] shrink-0" />
            <span className="text-[11px] font-bold text-white truncate max-w-[170px] sm:max-w-[210px]">
              {currentStore.name}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsStoreModalOpen(true)}
            disabled={isLocked || isSpinning}
            className="text-[10px] font-mono font-bold text-[#f4b924] hover:text-yellow-300 underline underline-offset-2 shrink-0 disabled:opacity-40"
          >
            Ganti
          </button>
        </div>

        {/* 3. Curved Lucky Dip Header SVG */}
        <div className="mt-2 mb-1 w-full max-w-[220px] sm:max-w-[240px] mx-auto drop-shadow-lg">
          <SpinWheelFrameHeader className="w-full h-auto" />
        </div>

        {/* 4. Canvas Spin Wheel Area */}
        <div className="relative w-full max-w-[270px] sm:max-w-[290px] mx-auto flex items-center justify-center my-2">
          <canvas
            ref={canvasRef}
            width={880}
            height={880}
            className="rounded-full z-10 w-full h-auto aspect-square block mx-auto touch-none shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-4 border-[#f4b924]"
          />

          {/* Pointer Arrow Top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            <div className="bg-[#f4b924] w-8 h-8 rounded-full border-2 border-[#d82b2b] flex items-center justify-center shadow-lg -translate-y-1">
              <Star className="w-4 h-4 text-[#d82b2b] fill-[#d82b2b]" />
            </div>
            <svg width="32" height="22" viewBox="0 0 24 20" fill="none" className="w-6 h-4 mx-auto -mt-2">
              <path d="M12 20L24 0H0L12 20Z" fill="#f4b924" />
            </svg>
          </div>

          {/* Center Hub with Spin Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#f4b924] rounded-full z-20 border-[4px] border-[#d82b2b] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)]">
            <button
              type="button"
              onClick={handleSpin}
              disabled={!isLocked || isSpinning || totalAvailableStock === 0}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fefce8] to-[#f4b924] hover:from-white hover:to-[#fcd34d] flex items-center justify-center cursor-pointer shadow-[inset_0_2px_6px_rgba(255,255,255,0.7)] transform active:scale-95 disabled:cursor-not-allowed transition border border-white/50"
            >
              {isSpinning ? (
                <RotateCw className="w-5 h-5 animate-spin text-[#d82b2b]" />
              ) : (
                <Star className="w-5 h-5 text-[#d82b2b] fill-[#d82b2b]" />
              )}
            </button>
          </div>
        </div>

        {/* 5. Customer Input Form (Carnival Ticket Style) */}
        <div className="bg-[#fdf6e3] rounded-2xl p-4 shadow-xl relative border-[3px] border-[#d82b2b] carnival-ticket mt-4 mb-2 text-[#1e3a8a]">
          
          {/* Floating Ticket Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-[#d82b2b] px-3.5 py-1 rounded-full border-2 border-[#f4b924] shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#f4b924]" />
              <span className="text-white font-black text-[10px] tracking-wide uppercase whitespace-nowrap">
                Buy Once, Win Twice
              </span>
            </div>
          </div>

          {/* Inner dotted outline */}
          <div className="absolute inset-1.5 border-2 border-dotted border-[#f4b924] rounded-xl opacity-60 pointer-events-none" />

          <div className="relative z-10 pt-1 space-y-2.5">
            {/* Customer Name */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#1e3a8a]/80 mb-1">
                Nama Customer
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1e3a8a]/50" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={isLocked}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-[#fefce8] border border-[#f4b924] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#1e3a8a] font-bold focus:outline-none focus:border-[#1e3a8a] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Customer WhatsApp */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#1e3a8a]/80 mb-1">
                Nomor WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1e3a8a]/50" />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  disabled={isLocked}
                  placeholder="081234567890"
                  className="w-full bg-[#fefce8] border border-[#f4b924] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#1e3a8a] font-bold focus:outline-none focus:border-[#1e3a8a] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Lock / Spin Trigger */}
            {!isLocked ? (
              <button
                type="button"
                onClick={() => {
                  if (customerName.trim() && customerPhone.trim()) {
                    setIsLocked(true)
                  }
                }}
                disabled={!customerName.trim() || !customerPhone.trim() || totalAvailableStock === 0}
                className="w-full mt-1 py-2.5 bg-[#f4b924] hover:bg-[#eab308] text-red-900 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 transform active:scale-95 disabled:opacity-40"
              >
                <Lock className="w-3.5 h-3.5 fill-current" />
                <span>KUNCI DATA & PUTAR</span>
              </button>
            ) : (
              <div className="space-y-1.5 mt-1">
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={isSpinning || totalAvailableStock === 0}
                  className="w-full py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs rounded-xl shadow-[0_3px_12px_rgba(220,38,38,0.5)] border-2 border-[#f4b924] transition flex items-center justify-center gap-1.5 transform active:scale-95 disabled:opacity-50"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>{isSpinning ? 'SEDANG MEMUTAR...' : 'PUTAR RODA SEKARANG'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLocked(false)}
                  disabled={isSpinning}
                  className="w-full py-1 text-[10px] font-bold text-red-700 hover:text-red-900 flex items-center justify-center gap-1"
                >
                  <Unlock className="w-3 h-3" />
                  <span>Batal & Edit Data</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 6. Live Store Stock Summary Quota */}
        <div className="bg-black/35 rounded-xl p-2.5 border border-white/10 mt-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/70 mb-1.5">
            <span className="flex items-center gap-1 font-bold text-[#f4b924]">
              <Package className="w-3 h-3" /> Stok Hadiah Aktif:
            </span>
            <span className="font-bold text-white">{totalAvailableStock} items</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
            {PRIZES_CATALOG.map((p) => {
              const stock = currentStockMap[p.id] || 0
              return (
                <div
                  key={p.id}
                  className={`p-1 rounded text-center border ${
                    stock > 0
                      ? 'bg-white/5 border-white/10 text-white/80'
                      : 'bg-red-950/40 border-red-800/40 text-red-400'
                  }`}
                >
                  <div className="truncate font-semibold">{p.displayText}</div>
                  <div className="font-black text-[10px] text-[#f4b924]">{stock}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* LAYER 2: MODAL OVERLAY (Sibling dari Layer 1, menempel rapat ke viewport HP) */}

      {/* 7. Store Selection Modal Pop-Up */}
      {isStoreModalOpen && (
        <div
          data-lenis-prevent
          className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex flex-col p-3 animate-fadeIn overscroll-contain"
        >
          <div className="bg-[#fdf6e3] rounded-2xl flex flex-col max-h-full border-2 border-[#d82b2b] shadow-2xl overflow-hidden text-[#1e3a8a]">
            {/* Modal Header */}
            <div className="p-3 bg-[#d82b2b] flex items-center justify-between text-white">
              <h4 className="font-extrabold text-xs flex items-center gap-1.5">
                <StoreIcon className="w-4 h-4 text-[#f4b924]" />
                Pilih Cabang Toko
              </h4>
              <button
                type="button"
                onClick={() => setIsStoreModalOpen(false)}
                className="p-1 hover:bg-black/20 rounded-md transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-2 border-b border-[#d82b2b]/20 bg-[#fefce8]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  placeholder="Cari toko atau kota..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-7 pr-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#d82b2b]"
                />
              </div>
            </div>

            {/* Store List */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-[300px] overscroll-contain"
            >
              {filteredStores.map((st) => {
                const isSelected = st.id === selectedStoreId
                const stStock = storeStocks[st.id] || INITIAL_STORE_STOCKS[st.id]
                const totalSt = Object.values(stStock).reduce((a, b) => a + b, 0)
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setSelectedStoreId(st.id)
                      setIsStoreModalOpen(false)
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#d82b2b] text-white border-[#d82b2b]'
                        : 'bg-[#fefce8] hover:bg-yellow-50 text-[#1e3a8a] border-[#f4b924]/60'
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs">{st.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                        {st.city} ({st.id})
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#1e3a8a] text-[#f4b924]'
                        }`}
                      >
                        {totalSt} item
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 8. Winner Modal Pop-Up */}
      {isWinnerModalOpen && spinResult && (
        <div
          data-lenis-prevent
          className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-fadeIn overscroll-contain"
        >
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 text-center border-[4px] border-[#d82b2b] shadow-2xl text-[#1e3a8a] relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-[#d82b2b] border-2 border-[#f4b924] mx-auto flex items-center justify-center shadow-lg mb-3 animate-bounce">
              <Gift className="w-7 h-7 text-[#f4b924]" />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e3a8a] text-white text-[9px] font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3 h-3" /> Pemenang Terverifikasi
            </div>

            <h4 className="text-[11px] font-black uppercase text-slate-600">
              Selamat! Anda Mendapatkan:
            </h4>

            <p
              className="text-lg sm:text-xl font-black text-[#d82b2b] my-2 leading-tight"
              style={{
                textShadow: '1px 1px 0px #f4b924, -1px -1px 0 #f4b924, 1px -1px 0 #f4b924, -1px 1px 0 #f4b924',
              }}
            >
              {spinResult.prize.name}
            </p>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1e3a8a] text-white font-mono text-[10px] font-bold mb-3">
              <Tag className="w-3 h-3 text-[#f4b924]" />
              <span>SKU: {spinResult.prize.assignedSku}</span>
            </div>

            {/* Customer Details Box */}
            <div className="bg-[#fffbeb] rounded-xl p-2.5 mb-3 border border-[#fde68a] text-left text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-[#1e3a8a]">{spinResult.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="font-mono font-bold text-slate-700">{spinResult.customer.phone}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-amber-200">
                <span className="text-slate-500">Toko:</span>
                <span className="font-black text-[#d82b2b] truncate max-w-[130px]">
                  {spinResult.customer.store}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={() => {
                setIsWinnerModalOpen(false)
                setIsLocked(false)
              }}
              className="w-full py-2.5 bg-[#1e3a8a] hover:bg-[#172554] text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 uppercase tracking-wide cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Klaim & Main Lagi</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
