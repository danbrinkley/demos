import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Clock3, CreditCard, FileText, Inbox, X } from 'lucide-react';
import { entryArea, entryType, filterQueue, queueDate, selectQueue } from '../../data/myWork';
import type { QueueEntry, WorkSort, WorkTab } from '../../data/myWork';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import './MyWorkPage.css';

const tabs: { id: WorkTab; label: string }[] = [
  { id: 'needs-me', label: 'Needs me' },
  { id: 'waiting', label: 'Waiting on others' },
  { id: 'completed', label: 'Completed' },
];

function EntryIcon({ entry }: { entry: QueueEntry }) {
  const Icon = entry.category === 'request' ? Inbox : entry.record.kind === 'payment' ? CreditCard : entry.record.kind === 'volunteer_hours' ? Clock3 : FileText;
  return <span className="hv-work__icon"><Icon aria-hidden="true" /></span>;
}

export function MyWorkPage() {
  const { workItems, requests, completeWorkItem } = useWorkspaceData();
  const [tab, setTab] = useState<WorkTab>('needs-me');
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [sort, setSort] = useState<WorkSort>('due');
  const [selectedId, setSelectedId] = useState<string | null>('expense-mileage-outreach');
  const [notice, setNotice] = useState('');
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const entries = selectQueue(workItems, requests, tab);
  const visible = filterQueue(entries, type, area, sort);
  const selected = visible.find((entry) => entry.record.id === selectedId);
  const counts = Object.fromEntries(tabs.map(({ id }) => [id, selectQueue(workItems, requests, id).length]));
  const title = tabs.find(({ id }) => id === tab)!.label;

  function changeTab(next: WorkTab) {
    setTab(next); setType(''); setArea(''); setSelectedId(null); setNotice('');
  }

  function openEntry(entry: QueueEntry) {
    setSelectedId(entry.record.id); setNotice('');
    requestAnimationFrame(() => detailHeading.current?.focus());
  }

  function closeDetail() {
    const id = selectedId;
    setSelectedId(null); setNotice('');
    requestAnimationFrame(() => document.getElementById(`queue-${id}`)?.focus());
  }

  function completeSelected() {
    if (!selected || selected.category !== 'work') return;
    completeWorkItem(selected.record.id);
    setTab('completed'); setType(''); setArea(''); setNotice('');
    requestAnimationFrame(() => detailHeading.current?.focus());
  }

  return (
    <div className="hv-work">
      <div className="hv-work__intro">
        <p className="hv-work__eyebrow">Your workspace</p>
        <h1>My Work</h1>
        <p>What needs you. What you’re waiting on. Where to pick up.</p>
      </div>

      <div className="hv-work__tabs" role="tablist" aria-label="Work status">
        {tabs.map(({ id, label }, index) => (
          <button key={id} ref={(node) => { tabButtons.current[index] = node; }} type="button"
            role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls="work-tabpanel" tabIndex={tab === id ? 0 : -1}
            onClick={() => changeTab(id)} onKeyDown={(event) => {
              const target = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
              if (target === null) return;
              event.preventDefault(); changeTab(tabs[target].id); tabButtons.current[target]?.focus();
            }}>
            {label}{' '}<span>{counts[id]}</span>
          </button>
        ))}
      </div>

      <section id="work-tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <div className="hv-work__filters">
          <label><span className="hv-visually-hidden">Work type</span><select value={type} onChange={(e) => { setType(e.target.value); setNotice(''); }}>
            <option value="">All types</option>{[...new Set(entries.map(entryType))].sort().map((label) => <option key={label}>{label}</option>)}
          </select></label>
          <label><span className="hv-visually-hidden">Project or area</span><select value={area} onChange={(e) => { setArea(e.target.value); setNotice(''); }}>
            <option value="">All projects / areas</option>{[...new Set(entries.map(entryArea))].sort().map((label) => <option key={label}>{label}</option>)}
          </select></label>
          <label className="hv-work__sort"><span className="hv-visually-hidden">Sort work</span><select value={sort} onChange={(e) => setSort(e.target.value as WorkSort)}>
            <option value="due">{tab === 'waiting' ? 'Submitted date ↑' : 'Due date ↑'}</option><option value="title">Title A–Z</option>
          </select></label>
          <span className="hv-work__sort-note">{sort === 'title' ? 'Alphabetical' : tab === 'waiting' ? 'Oldest first' : 'Undated items last'}</span>
        </div>

        <div className="hv-work__surface">
          <section className="hv-work__list" aria-label={`${title} work items`}>
            <div className="hv-work__list-heading"><h2>{title}</h2><span>{visible.length} {tab === 'needs-me' ? 'open' : 'items'}</span></div>
            {visible.length ? <ul>{visible.map((entry) => (
              <li key={entry.record.id}>
                <button id={`queue-${entry.record.id}`} type="button" className={`hv-work__row${entry.record.id === selected?.record.id ? ' hv-work__row--selected' : ''}`}
                  aria-label={`${entry.record.title}, ${entryArea(entry)}, ${entry.record.statusLabel}, ${queueDate(entry)}`}
                  aria-expanded={entry.record.id === selected?.record.id} aria-controls="work-detail" onClick={() => openEntry(entry)}>
                  <EntryIcon entry={entry} />
                  <span className="hv-work__row-title"><strong>{entry.record.title}</strong><span>{entryArea(entry)}</span></span>
                  <span className="hv-work__row-status">{entry.record.statusLabel}</span>
                  <span className="hv-work__row-date">{queueDate(entry)}</span>
                  <ChevronRight className="hv-work__chevron" aria-hidden="true" />
                </button>
              </li>
            ))}</ul> : <div className="hv-work__empty"><Inbox aria-hidden="true" /><h3>{type || area ? 'No matching items' : tab === 'completed' ? 'Nothing completed yet' : 'You’re all caught up'}</h3><p>{type || area ? 'Try another filter to find your work.' : tab === 'completed' ? 'Work you finish will appear here.' : 'There’s nothing in this queue right now.'}</p>{(type || area) && <button type="button" onClick={() => { setType(''); setArea(''); }}>Clear filters</button>}</div>}
            <p className="hv-work__list-meta">Showing {visible.length} of {entries.length} items</p>
          </section>

          <section className="hv-work__detail" id="work-detail" aria-label="Work item details" onKeyDown={(event) => { if (event.key === 'Escape' && selected) { event.preventDefault(); closeDetail(); } }}>
            {selected ? <>
              <button className="hv-work__close" type="button" aria-label="Close item details" onClick={closeDetail}><X aria-hidden="true" /></button>
              <div className="hv-work__detail-heading"><EntryIcon entry={selected} /><div><p className="hv-work__eyebrow">{entryType(selected)}</p><h2 ref={detailHeading} tabIndex={-1}>{selected.record.title}</h2>
                <span className={`hv-work__status${selected.category === 'work' && selected.record.completed ? ' hv-work__status--done' : ''}`}>{selected.record.statusLabel}</span>
                <p className="hv-work__context">{entryArea(selected)} · {queueDate(selected)}</p>
              </div></div>
              <div className="hv-work__detail-body">
                <h3>{selected.category === 'request' ? 'Where your request stands' : selected.record.completed ? 'Completed work' : 'What needs your review'}</h3>
                <p>{selected.category === 'work' ? selected.record.detail : `Submitted ${queueDate(selected).replace('Sent ', '')}. ${selected.record.statusLabel}. This request is waiting on another team; no action is required from you right now.`}</p>
                {selected.category === 'work' && selected.record.kind === 'expense' && <div className="hv-work__documents">{['Expense summary', 'Receipts'].map((label) => <button key={label} type="button" onClick={() => setNotice(`${label}: this is a demonstration. No live document is connected yet.`)}><FileText aria-hidden="true" />{label}<ArrowUpRight aria-hidden="true" /></button>)}</div>}
                <div className="hv-work__next"><h3>What happens next</h3><p>{selected.category === 'request' ? 'The receiving team will review and update the request. Live routing and notifications are not connected in this demo.' : selected.record.completed ? selected.record.completedStatusLabel : selected.record.kind === 'expense' ? 'Once approved, Finance can process the reimbursement.' : 'Continue in the source workflow to finish this item. Live source systems are not connected in this demo.'}</p></div>
                <div className="hv-work__actions">
                  {selected.category === 'work' && selected.record.detailActionLabel && !selected.record.completed && <button className="hv-work__primary" type="button" onClick={completeSelected}>{selected.record.kind === 'expense' ? 'Approve expense' : selected.record.detailActionLabel}</button>}
                  {selected.category === 'work' && selected.record.completed && <span className="hv-work__completion"><CheckCircle2 aria-hidden="true" />Completed</span>}
                  <button className="hv-work__secondary" type="button" onClick={() => setNotice('Demo only: no live source record is connected. Your work stays in this workspace for this session.')}>Open source record</button>
                </div>
                <p className="hv-work__hint">{selected.category === 'work' && selected.record.detailActionLabel ? 'Demo approval updates Home and My Work for this session.' : 'Sample work for the Harbor View demonstration.'}</p>
                <p className="hv-work__notice" role="status">{notice}</p>
              </div>
            </> : <div className="hv-work__empty hv-work__empty--detail"><FileText aria-hidden="true" /><h2>Select an item</h2><p>See its context and next step without leaving your work list.</p></div>}
          </section>
        </div>
      </section>
    </div>
  );
}
