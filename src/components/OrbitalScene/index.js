import { useEffect, useRef, useState } from 'react';

export default function OrbitalScene() {
  const stage = useRef(null);
  const running = useRef(true);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = stage.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let destroy = () => {};
    if (!motion.matches) {
      import('./scene').then(({ createScene }) => {
        if (cancelled) return;
        destroy = createScene(node, running, motion, setReady);
      }).catch(() => {});
    }
    return () => {
      cancelled = true;
      destroy();
    };
  }, []);

  return (
    <div className={'orbital-scene' + (ready ? ' is-live' : '')}>
      <svg className="scene-fallback" aria-hidden="true" viewBox="0 0 480 480" fill="none">
        <defs>
          <linearGradient id="thread-fallback" x1="108" y1="92" x2="380" y2="402" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e8d5ff" /><stop offset=".4" stopColor="#9b70ff" /><stop offset=".72" stopColor="#6654ce" /><stop offset="1" stopColor="#b5edff" />
          </linearGradient>
        </defs>
        <ellipse cx="240" cy="240" rx="201" ry="126" transform="rotate(-24 240 240)" stroke="#9382cf" strokeOpacity=".32" />
        <ellipse cx="240" cy="240" rx="164" ry="202" transform="rotate(36 240 240)" stroke="#9382cf" strokeOpacity=".24" strokeDasharray="3 8" />
        <path d="M104 239C112 138 224 91 300 150c71 56 81 169 6 210-68 38-163-16-178-96-14-78 63-144 145-132 88 12 123 106 73 167-49 59-151 68-211 9-42-42-43-93 3-133 45-41 137-20 169 32 38 61-8 126-74 135-72 9-149-48-129-103Z"
          stroke="url(#thread-fallback)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="408" cy="177" r="4" fill="#d2b4ff" /><circle cx="118" cy="347" r="3" fill="#a1e5ff" />
      </svg>
      <div className="scene-canvas" ref={stage} aria-hidden="true" />
      {ready && <button className="motion-button" type="button" onClick={() => {
        running.current = paused;
        setPaused(!paused);
      }}>{paused ? 'Resume motion' : 'Pause motion'}</button>}
    </div>
  );
}
