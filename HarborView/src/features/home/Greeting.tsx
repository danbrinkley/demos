import { formatLongDate } from '../../data/demoDate';
import './Greeting.css';

interface GreetingProps {
  firstName: string;
  today: string;
}

export function Greeting({ firstName, today }: GreetingProps) {
  return (
    <div className="hv-greeting">
      <h1 className="hv-greeting__heading">Good morning, {firstName}</h1>
      <p className="hv-greeting__date">{formatLongDate(today)}</p>
    </div>
  );
}
