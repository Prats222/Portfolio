import DepthStage from './DepthStage';

export default function PortraitShowcase() {
  return (
    <figure className="hero-portrait">
      <DepthStage className="portrait-scene">
        <div className="depth-entry portrait-entry">
          <div className="depth-rig portrait-rig">
            <div className="portrait-orbit" aria-hidden="true" />
            <div className="portrait-depth"><div className="portrait-crop"><img src="/HeroImage.jpg" alt="Prateek Mishra wearing a headset" /></div></div>
            <span className="portrait-token token-code" aria-hidden="true">{'</>'}</span>
            <span className="portrait-token token-spark" aria-hidden="true">✦</span>
            <div className="portrait-code" aria-hidden="true">
              <div className="code-top"><i /><i /><i /><span>Profile.cs</span></div>
              <pre><code><b>new Engineer</b>{'(\n  '}<em>"ASP.NET Core"</em>{',\n  '}<em>"React"</em>{'\n);'}</code></pre>
            </div>
            <dl className="portrait-stats">
              <div className="stat-card stat-agents"><dt>AI agents</dt><dd>120+</dd></div>
              <div className="stat-card stat-workflows"><dt>Workflows</dt><dd>130+</dd></div>
            </dl>
          </div>
        </div>
      </DepthStage>
      <figcaption><span>Associate Engineer · Ascendion</span><span>Bengaluru, India</span></figcaption>
    </figure>
  );
}
