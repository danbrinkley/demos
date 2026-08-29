import { formatLongDate } from '../../data/demoDate';
import harborReference from '../../../a_clean_modern_nonprofit_website_homepage_screens.png';
import './Greeting.css';

interface GreetingProps {
  firstName: string;
  today: string;
}

export function Greeting({ firstName, today }: GreetingProps) {
  return (
    <section className="hv-greeting" aria-labelledby="hv-greeting-heading">
      <div className="hv-greeting__copy">
        <p className="hv-greeting__eyebrow">Harbor Community Services</p>
        <h1 id="hv-greeting-heading" className="hv-greeting__heading">
          Good morning, {firstName}
        </h1>
        <p className="hv-greeting__date">{formatLongDate(today)}</p>
        <p className="hv-greeting__orientation">A clear view of what needs you and what is ahead.</p>
      </div>
      <div
        className="hv-greeting__visual"
        style={{ backgroundImage: `url(${harborReference})` }}
        aria-hidden="true"
      />
    </section>
  );
}
