import type { ReactNode } from 'react';
import { OrgAlertBanner } from '../../components/shell/OrgAlertBanner';
import { formatLongDate } from '../../data/demoDate';
import type { OrgAlert } from '../../data/types';
import harborReference from '../../../a_clean_modern_nonprofit_website_homepage_screens.png';
import './Greeting.css';

interface GreetingProps {
  firstName: string;
  today: string;
  alert: OrgAlert | null;
  children: ReactNode;
}

export function Greeting({ firstName, today, alert, children }: GreetingProps) {
  return (
    <section className="hv-greeting" aria-labelledby="hv-greeting-heading">
      <OrgAlertBanner alert={alert} />
      <div className="hv-greeting__copy">
        <p className="hv-greeting__eyebrow">Harbor Community Services</p>
        <h1 id="hv-greeting-heading" className="hv-greeting__heading">
          Good morning, {firstName}
        </h1>
        <p className="hv-greeting__date">{formatLongDate(today)}</p>
        <p className="hv-greeting__orientation">A clear view of what needs you and what is ahead.</p>
        {children}
      </div>
      <div
        className="hv-greeting__visual"
        style={{ backgroundImage: `url(${harborReference})` }}
        aria-hidden="true"
      />
    </section>
  );
}
