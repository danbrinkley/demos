import { HarborMark } from './HarborMark';

export function HarborLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`hv-harbor-logo${inverse ? ' hv-harbor-logo--inverse' : ''}`} aria-label="Harbor Community Services">
      <HarborMark />
      <span className="hv-harbor-logo__words" aria-hidden="true">
        <strong>Harbor</strong>
        <small>Community Services</small>
      </span>
    </span>
  );
}
