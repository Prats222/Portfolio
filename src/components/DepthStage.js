export default function DepthStage({ className, children }) {
  function aim(event) {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty('--pointer-yaw', (x * 15).toFixed(2) + 'deg');
    stage.style.setProperty('--pointer-pitch', (-y * 12).toFixed(2) + 'deg');
  }

  function reset(event) {
    event.currentTarget.style.removeProperty('--pointer-yaw');
    event.currentTarget.style.removeProperty('--pointer-pitch');
  }

  return <div className={'depth-stage ' + className} onPointerMove={aim} onPointerLeave={reset}>{children}</div>;
}
