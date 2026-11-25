import { useEffect, useRef, useState } from 'react';

export default function WorkScene({ journey }) {
  const stage = useRef(null);
  const motion = useRef(true);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};
    let revision = 0;
    function syncMotion() {
      dispose();
      dispose = () => {};
      setReady(false);
      const current = ++revision;
      if (preference.matches) return;
      import('./scene').then(({ createWorkScene }) => {
        if (current !== revision) return;
        dispose = createWorkScene(stage.current, journey.current, motion, setReady);
      }).catch(() => {});
    }
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => {
      revision++;
      dispose();
      preference.removeEventListener('change', syncMotion);
    };
  }, [journey]);

  return (
    <figure className={'work-stage' + (ready ? ' scene-ready' : '')}>
      <div className="work-viewport">
        <div className="scene-fallback" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="scene-canvas" ref={stage} aria-hidden="true" />
      </div>
      <figcaption><span>{ready && !paused ? 'Scroll to explore the stack' : 'HP engineering stack'}</span>
        {ready && <button className="motion-button" type="button" onClick={() => {
          motion.current = paused;
          setPaused(!paused);
          if (paused) stage.current.dispatchEvent(new Event('scene-resume'));
        }}>{paused ? 'Resume 3D' : 'Pause 3D'}</button>}
      </figcaption>
    </figure>
  );
}
