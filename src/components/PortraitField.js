const strands = [
  'M 16,345 C 125,454 239,367 286,247 S 430,47 591,163',
  'M 21,359 C 136,469 242,386 297,260 S 443,60 600,179',
  'M 26,374 C 144,482 256,404 309,277 S 455,78 604,195',
  'M 35,390 C 157,495 269,417 320,293 S 471,90 606,211',
  'M 46,406 C 167,510 281,433 333,308 S 488,112 609,229',
  'M 60,421 C 182,518 293,447 347,326 S 503,134 611,249',
  'M 75,436 C 195,526 306,464 363,343 S 515,149 613,275',
  'M 92,450 C 214,533 322,473 378,358 S 530,168 612,297',
];

export default function PortraitField() {
  return (
    <div className="portrait-field" aria-hidden="true">
      <div className="portrait-glow" />
      <svg className="portrait-flow" viewBox="0 0 630 540" fill="none">
        <defs>
          <linearGradient id="flow-ink" x1="12" x2="616" y1="450" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--flow-cool)" stopOpacity="0" />
            <stop offset=".23" stopColor="var(--flow-cool)" stopOpacity=".88" />
            <stop offset=".53" stopColor="var(--flow-cool)" stopOpacity=".55" />
            <stop offset=".79" stopColor="var(--flow-warm)" stopOpacity=".9" />
            <stop offset="1" stopColor="var(--flow-warm)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pulse-ink" x1="25" x2="610" y1="420" y2="152" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--flow-cool)" />
            <stop offset=".66" stopColor="var(--flow-bright)" />
            <stop offset="1" stopColor="var(--flow-warm)" />
          </linearGradient>
        </defs>
        <g stroke="url(#flow-ink)" strokeWidth="1.2">
          {strands.map(path => <path key={path} d={path} />)}
        </g>
        <g className="portrait-pulse" stroke="url(#pulse-ink)" strokeLinecap="round" strokeWidth="2.4">
          {[0, 3, 6].map(i => <path key={i} pathLength="100" d={strands[i]} />)}
        </g>
        <g fill="var(--flow-bright)">
          <circle cx="145" cy="208" r="2.2" /><circle cx="501" cy="111" r="2.6" /><circle cx="230" cy="135" r="1.4" />
          <circle cx="102" cy="324" r="1.4" /><circle cx="539" cy="364" r="1.9" /><circle cx="389" cy="454" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
