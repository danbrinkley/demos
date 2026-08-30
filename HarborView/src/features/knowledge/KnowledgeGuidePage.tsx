import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ClipboardCheck, FileText, Info, ShieldCheck, Users } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getKnowledgeCatalog } from '../../data/adapters';
import { expenseSteps, knowledgeHref, knowledgeTopics } from '../../data/knowledge';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import './Knowledge.css';

function longDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}

export function ExpenseGuidePage() {
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const catalog = getKnowledgeCatalog();
  const guide = catalog.find((item) => item.id === 'expense-guide')!;
  const tools = ['expense-template', 'expense-example', 'expense-policy'].map((id) => catalog.find((item) => item.id === id)!);
  const icons = [FileText, ClipboardCheck, ShieldCheck];

  return <div className="hv-knowledge__container hv-guide">
    <nav className="hv-guide__breadcrumb" aria-label="Breadcrumb"><Link to="/knowledge">Knowledge</Link><span>/</span><Link to="/knowledge?topic=finance">Finance</Link><span>/</span><span aria-current="page">Expense reporting</span></nav>
    <div className="hv-guide__intro"><h1>Expense reporting</h1><p>{guide.summary}</p><div className="hv-guide__trust"><span><Check aria-hidden="true" />Reviewed</span><p>Owned by <Link to="/knowledge/help?team=finance">{guide.owner}</Link></p><p>Last reviewed <time dateTime={guide.reviewed}>{longDate(guide.reviewed)}</time></p></div></div>

    <div className="hv-guide__grid">
      <article className="hv-guide__article" aria-label="Expense reporting guidance">
        <section><h2>When to use this</h2><p>Use this guide when you’ve paid for approved work-related expenses and need reimbursement.</p><div className="hv-guide__callout"><Info aria-hidden="true" /><p>Not sure an expense qualifies? Check the <Link to="/knowledge/resource/expense-policy">policy</Link> or ask Finance before submitting.</p></div></section>
        <section><h2>How to submit</h2><ol className="hv-guide__steps">{expenseSteps.map((step, index) => <li key={step.title}><span aria-hidden="true">{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
        <section><h2>After you submit</h2><p>Track your submitted expense in My Work under Waiting on others.</p><Link className="hv-guide__text-link" to="/my-work?tab=waiting">Go to My Work <ArrowRight aria-hidden="true" /></Link></section>
      </article>

      <aside className="hv-guide__sidebar" aria-label="Resources and help">
        <section className="hv-guide__tools"><h2>Everything you need</h2><ul>{tools.map((item, index) => { const Icon = icons[index]; return <li key={item.id}><Link to={knowledgeHref(item)}><Icon aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.category}</small></span><ArrowUpRight aria-hidden="true" /></Link></li>; })}</ul><button className="hv-guide__primary" type="button" onClick={() => setShowDemoNotice(true)}>Start an expense report <ArrowRight aria-hidden="true" /></button><p className="hv-guide__demo-label">Demonstration workflow</p><div role="status">{showDemoNotice && <p className="hv-guide__notice">Live submission is not connected in this demo. <Link to="/knowledge/resource/expense-template">Open the template preview</Link> to see the information you would prepare. No report has been submitted.</p>}</div></section>
        <section className="hv-guide__contact"><h2>Questions?</h2><h3><Users aria-hidden="true" />Finance team</h3><p>Ask about eligibility, missing receipts, or a returned report.</p><Link className="hv-guide__text-link" to="/knowledge/help?team=finance">Contact Finance <ArrowRight aria-hidden="true" /></Link></section>
        <section className="hv-guide__about"><h2>About this guide</h2><dl><div><dt>Content owner</dt><dd>{guide.owner}</dd></div><div><dt>Next review</dt><dd><time dateTime={guide.nextReview}>{longDate(guide.nextReview!)}</time></dd></div></dl></section>
      </aside>
    </div>
    <p className="hv-guide__disclaimer">Sample guidance for the Harbor View demo. Review dates and ownership are illustrative.</p>
  </div>;
}

export function KnowledgeResourcePage() {
  const { resourceId } = useParams();
  const { resources } = useWorkspaceData();
  const resource = resources.find((item) => item.id === resourceId);
  const detail = getKnowledgeCatalog().find((item) => item.id === resourceId);
  const topic = knowledgeTopics.find((item) => item.id === detail?.topic);

  return <div className="hv-knowledge__container hv-guide">
    <nav className="hv-guide__breadcrumb" aria-label="Breadcrumb"><Link to="/knowledge">Knowledge</Link>{topic && <><span>/</span><Link to={`/knowledge?topic=${topic.id}`}>{topic.label}</Link></>}</nav>
    <div className="hv-guide__intro"><p className="hv-knowledge__eyebrow">{resource?.category ?? 'Resource'} · Sample preview</p><h1>{resource?.title ?? 'Resource not found'}</h1>{detail && <><p>{detail.summary}</p><p className="hv-guide__preview-owner">Owned by {detail.owner} · Reviewed {longDate(detail.reviewed)}</p></>}</div>
    <article className="hv-guide__article hv-guide__preview">
      {detail ? <><h2>{detail.category === 'Template' ? 'What to include' : detail.category === 'Example' ? 'Completed example' : detail.category === 'Guide' ? 'Getting started' : 'Reference preview'}</h2><ul className="hv-guide__preview-list">{detail.preview.map((line) => <li key={line}>{line}</li>)}</ul></> : <p>{resource ? 'This resource is in the sample catalog, but a live document has not been connected yet.' : 'This link does not match a resource in the demo. Return to Knowledge to search the catalog.'}</p>}
      <p className="hv-guide__disclaimer">Illustrative content only. This is not a live document, official policy, or submission form.</p>
      {detail?.topic === 'finance' ? <Link className="hv-guide__text-link" to="/knowledge/expense-reporting">Back to expense reporting <ArrowRight aria-hidden="true" /></Link> : <Link className="hv-guide__text-link" to="/knowledge">Back to Knowledge <ArrowRight aria-hidden="true" /></Link>}
    </article>
  </div>;
}

export function KnowledgeHelpPage() {
  const [params] = useSearchParams();
  const selected = knowledgeTopics.find((topic) => topic.id === params.get('team'));
  const teams = selected ? [selected] : knowledgeTopics;
  return <div className="hv-knowledge__container hv-guide">
    <nav className="hv-guide__breadcrumb" aria-label="Breadcrumb"><Link to="/knowledge">Knowledge</Link><span>/</span><span>Help</span></nav>
    <div className="hv-guide__intro"><h1>{selected ? `Ask ${selected.label}` : 'Ask the right team'}</h1><p>Find the team that owns the guidance you need.</p></div>
    <div className="hv-knowledge__help-teams">{teams.map((topic) => <section className="hv-guide__contact" key={topic.id} id={`team-${topic.id}`}><h2>{topic.label}</h2><p>{topic.description}.</p><Link className="hv-guide__text-link" to={`/knowledge?topic=${topic.id}`}>Browse guidance <ArrowRight aria-hidden="true" /></Link><p className="hv-guide__disclaimer">Team contact details are not connected in this demo. No message will be sent.</p></section>)}</div>
    {selected && <Link className="hv-knowledge__clear" to="/knowledge/help">See all teams</Link>}
  </div>;
}
