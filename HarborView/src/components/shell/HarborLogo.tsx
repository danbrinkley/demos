import { HarborMark } from './HarborMark';
import './HarborLogo.css';

export function HarborLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`hv-harbor-logo${inverse ? ' hv-harbor-logo--inverse' : ''}`} role="img" aria-label="Harbor Community Services">
      <HarborMark />
      <span className="hv-harbor-logo__words" aria-hidden="true">
        <strong>Harbor</strong>
        <small>Community Services</small>
      </span>
    </span>
  );
}
