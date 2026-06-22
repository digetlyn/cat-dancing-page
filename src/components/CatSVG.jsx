const EXPR = {
  slow:   { eyeRy: 5,  eyeRx: 10, pupilR: 4, eyeColor: '#2E8B57', eyeOffsetY: 2  },
  normal: { eyeRy: 11, eyeRx: 9,  pupilR: 5, eyeColor: '#2E8B57', eyeOffsetY: 0  },
  fast:   { eyeRy: 13, eyeRx: 11, pupilR: 7, eyeColor: '#FF4500', eyeOffsetY: -2 },
};

export default function CatSVG({ expression = 'normal', style }) {
  const e = EXPR[expression] ?? EXPR.normal;
  const ley = 78 + e.eyeOffsetY;
  const lpy = 80 + e.eyeOffsetY;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" width="200" height="220" style={style}>
      <ellipse cx="100" cy="150" rx="55" ry="50" fill="#F4A460"/>
      <circle cx="100" cy="85" r="45" fill="#F4A460"/>
      <polygon points="62,48 50,15 82,38" fill="#F4A460"/>
      <polygon points="64,46 54,22 80,40" fill="#FFB6C1"/>
      <polygon points="138,48 150,15 118,38" fill="#F4A460"/>
      <polygon points="136,46 146,22 120,40" fill="#FFB6C1"/>
      <ellipse cx="100" cy="90" rx="28" ry="24" fill="#FFF0DC"/>

      {/* Eyes */}
      <ellipse cx="85"  cy={ley} rx={e.eyeRx} ry={e.eyeRy} fill={e.eyeColor}/>
      <ellipse cx="115" cy={ley} rx={e.eyeRx} ry={e.eyeRy} fill={e.eyeColor}/>
      <circle cx="85"  cy={lpy} r={e.pupilR} fill="#1a1a1a"/>
      <circle cx="115" cy={lpy} r={e.pupilR} fill="#1a1a1a"/>
      <circle cx="87"  cy={ley - 3} r="2" fill="white"/>
      <circle cx="117" cy={ley - 3} r="2" fill="white"/>

      <polygon points="100,92 96,97 104,97" fill="#FF69B4"/>

      {/* Mouth by expression */}
      {expression === 'fast' ? (
        <ellipse cx="100" cy="103" rx="8" ry="6" fill="#6B2D0E"/>
      ) : expression === 'slow' ? (
        <path d="M97,98 Q100,101 103,98" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
      ) : (
        <>
          <path d="M96,97 Q100,103 104,97" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
          <path d="M96,97 Q90,103 86,100"  stroke="#8B4513" strokeWidth="1.5" fill="none"/>
          <path d="M104,97 Q110,103 114,100" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
        </>
      )}

      <line x1="60" y1="93" x2="93" y2="96" stroke="#8B4513" strokeWidth="1.5"/>
      <line x1="58" y1="99" x2="92" y2="99" stroke="#8B4513" strokeWidth="1.5"/>
      <line x1="60" y1="105" x2="93" y2="102" stroke="#8B4513" strokeWidth="1.5"/>
      <line x1="140" y1="93" x2="107" y2="96" stroke="#8B4513" strokeWidth="1.5"/>
      <line x1="142" y1="99" x2="108" y2="99" stroke="#8B4513" strokeWidth="1.5"/>
      <line x1="140" y1="105" x2="107" y2="102" stroke="#8B4513" strokeWidth="1.5"/>

      <ellipse cx="52"  cy="155" rx="14" ry="22" fill="#F4A460" transform="rotate(-20 52 155)"/>
      <ellipse cx="148" cy="155" rx="14" ry="22" fill="#F4A460" transform="rotate(20 148 155)"/>
      <ellipse cx="78"  cy="193" rx="14" ry="20" fill="#F4A460"/>
      <ellipse cx="78"  cy="210" rx="14" ry="8"  fill="#F4A460"/>
      <circle cx="70" cy="213" r="4" fill="#FFB6C1"/>
      <circle cx="78" cy="215" r="4" fill="#FFB6C1"/>
      <circle cx="86" cy="213" r="4" fill="#FFB6C1"/>
      <ellipse cx="122" cy="193" rx="14" ry="20" fill="#F4A460"/>
      <ellipse cx="122" cy="210" rx="14" ry="8"  fill="#F4A460"/>
      <circle cx="114" cy="213" r="4" fill="#FFB6C1"/>
      <circle cx="122" cy="215" r="4" fill="#FFB6C1"/>
      <circle cx="130" cy="213" r="4" fill="#FFB6C1"/>
      <path d="M155,170 Q185,140 175,110 Q165,85 155,100" stroke="#F4A460" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <ellipse cx="100" cy="155" rx="25" ry="20" fill="#FFF0DC" opacity="0.7"/>
      <ellipse cx="73"  cy="95"  rx="9"  ry="6"  fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="127" cy="95"  rx="9"  ry="6"  fill="#FFB6C1" opacity="0.5"/>
    </svg>
  );
}
