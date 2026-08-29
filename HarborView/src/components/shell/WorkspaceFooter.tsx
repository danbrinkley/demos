import { NavLink } from 'react-router-dom';
import { HarborMark } from './HarborMark';
import './WorkspaceFooter.css';

export function WorkspaceFooter() {
  return (
    <footer className="hv-footer">
      <div className="hv-footer__inner">
        <div className="hv-footer__identity">
          <HarborMark />
          <div>
            <p className="hv-footer__name">Harbor View</p>
            <p className="hv-footer__line">One calm place to see the work and move it forward.</p>
          </div>
        </div>
        <nav className="hv-footer__nav" aria-label="Footer">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/news">News</NavLink>
        </nav>
        <p className="hv-footer__meta">Harbor Community Services · 2026</p>
      </div>
    </footer>
  );
}
