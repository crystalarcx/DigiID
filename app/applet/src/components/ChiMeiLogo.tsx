import React from 'react';

interface ChiMeiLogoProps {
  className?: string;
  color?: string;
  size?: number;
}

export default function ChiMeiLogo({ className = 'w-full h-full', color = '#008040', size }: ChiMeiLogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200" 
      width={size || '100%'} 
      height={size || '100%'}
      className={className}
    >
      <g fill={color} stroke={color}>
        {/* Top Left Character: 奇 */}
        <g transform="translate(48, 22)" stroke="none">
          <text 
            fontFamily="'Noto Serif TC', 'Songti TC', 'DFKai-SB', 'KaiTi', 'Biaukai', serif" 
            fontWeight="900" 
            fontSize="23" 
            textAnchor="middle" 
            dominantBaseline="central"
          >
            奇
          </text>
        </g>

        {/* Top Right Character: 美 */}
        <g transform="translate(152, 22)" stroke="none">
          <text 
            fontFamily="'Noto Serif TC', 'Songti TC', 'DFKai-SB', 'KaiTi', 'Biaukai', serif" 
            fontWeight="900" 
            fontSize="23" 
            textAnchor="middle" 
            dominantBaseline="central"
          >
            美
          </text>
        </g>

        {/* Center Top Chi Mei 'm' Emblem Box */}
        <g stroke="none">
          {/* Outer Box */}
          <rect x="85" y="14" width="30" height="28" rx="2" fill="none" stroke={color} strokeWidth="2.5" />
          {/* Chi Mei 'm' mark inside the box */}
          <path d="M 89 38 L 89 20 L 93 20 L 93 38 Z" fill={color} />
          <path d="M 97.5 38 L 97.5 24 C 97.5 21 102.5 21 102.5 24 L 102.5 38 Z" fill={color} />
          <path d="M 107 38 L 107 20 L 111 20 L 111 38 Z" fill={color} />
          <path d="M 89 20 L 111 20 L 111 23.5 L 89 23.5 Z" fill={color} />
        </g>

        {/* Center Staff (Caduceus Rod) */}
        <line x1="100" y1="42" x2="100" y2="152" stroke={color} strokeWidth="3" strokeLinecap="round" />
        
        {/* Bottom Ring of the Staff */}
        <circle cx="100" cy="154" r="3.5" fill="none" stroke={color} strokeWidth="2" />

        {/* Left Wing (6 Feathers) */}
        <g stroke="none">
          <path d="M 94 54 C 80 50, 48 35, 23 27 C 40 38, 62 48, 86 58 Z" />
          <path d="M 94 59 C 80 57, 50 48, 28 42 C 45 52, 66 61, 88 66 Z" />
          <path d="M 94 65 C 80 65, 54 58, 35 56 C 52 65, 71 73, 90 75 Z" />
          <path d="M 94 72 C 82 73, 60 70, 44 70 C 60 77, 76 83, 92 84 Z" />
          <path d="M 94 79 C 84 81, 67 82, 55 83 C 69 88, 82 91, 93 91 Z" />
          <path d="M 95 86 C 88 88, 77 91, 68 93 C 78 96, 88 97, 95 96 Z" />
          <path d="M 94 52 C 86 64, 82 82, 95 96 L 94 52 Z" />
        </g>

        {/* Right Wing (6 Feathers, Mirror Symmetrical) */}
        <g stroke="none">
          <path d="M 106 54 C 120 50, 152 35, 177 27 C 160 38, 138 48, 114 58 Z" />
          <path d="M 106 59 C 120 57, 150 48, 172 42 C 155 52, 134 61, 112 66 Z" />
          <path d="M 106 65 C 120 65, 146 58, 165 56 C 148 65, 129 73, 110 75 Z" />
          <path d="M 106 72 C 118 73, 140 70, 156 70 C 140 77, 124 83, 108 84 Z" />
          <path d="M 106 79 C 116 81, 133 82, 145 83 C 131 88, 118 91, 107 91 Z" />
          <path d="M 105 86 C 112 88, 123 91, 132 93 C 122 96, 112 97, 105 96 Z" />
          <path d="M 106 52 C 114 64, 118 82, 105 96 L 106 52 Z" />
        </g>

        {/* Left Snake Head */}
        <g stroke="none">
          <path d="M 87 106 C 85 103, 87 99, 93 100 C 96 100, 96 103, 94 105 C 93 106, 90 107, 87 106 Z" />
          <circle cx="92" cy="102" r="0.75" fill="#ffffff" />
        </g>

        {/* Right Snake Head */}
        <g stroke="none">
          <path d="M 113 106 C 115 103, 113 99, 107 100 C 104 100, 104 103, 106 105 C 107 106, 110 107, 113 106 Z" />
          <circle cx="108" cy="102" r="0.75" fill="#ffffff" />
        </g>

        {/* Serpents Coils */}
        <path 
          d="M 88 106 C 70 109, 64 121, 80 128 C 88 131, 95 130, 100 125 C 105 120, 112 119, 120 128 C 136 121, 130 109, 112 106" 
          fill="none" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 80 128 C 74 135, 78 143, 92 146 C 96 147, 98 147, 100 144 C 102 147, 104 147, 108 146 C 122 143, 126 135, 120 128" 
          fill="none" 
          stroke={color} 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 94 147 C 97 151, 100 152, 100 152 C 100 152, 103 151, 106 147" 
          fill="none" 
          stroke={color} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />

        {/* Bottom Text: TAIWAN */}
        <g stroke="none">
          <text 
            x="100" 
            y="174" 
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
            fontWeight="600" 
            fontSize="14.5" 
            letterSpacing="0.18em" 
            textAnchor="middle"
          >
            TAIWAN
          </text>
        </g>
      </g>
    </svg>
  );
}
