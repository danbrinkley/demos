import { useEffect, useRef } from 'react';
import { ArrowRight, CalendarDays, ChevronRight, FileText, Search, Users } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getKnowledgeCatalog } from '../../data/adapters';
import { formatShortDate } from '../../data/demoDate';
import { knowledgeHref, knowledgeTasks, knowledgeTopics, recentlyUpdated, searchKnowledge } from '../../data/knowledge';
import type { KnowledgeResource } from '../../data/knowledge';
import './Knowledge.css';

const icons = { expense: FileText, event: CalendarDays, people: Users, report: FileText };

export function ResourceRows({ resources, updates = false }: { resources: KnowledgeResource[]; updates?: boolean }) {
  return <ul className="hv-knowledge__resource-list">{resources.map((resource) => <li key={resource.id}>
    <Link to={knowledgeHref(resource)} className="hv-knowledge__resource-row">
      <FileText aria-hidden="true" />
      <strong>{resource.title}</strong>
      <span className="hv-knowledge__resource-summary">{updates ? resource.change : resource.summary}</span>
      <span className="hv-knowledge__type">{resource.category}</span>
      <span className="hv-knowledge__review">Reviewed <time dateTime={resource.reviewed}>{formatShortDate(resource.reviewed)}</time></span>
      <ArrowRight aria-hidden="true" />
    </Link>
  </li>)}</ul>;
}

export function KnowledgePage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const topic = params.get('topic') ?? '';
  const catalog = getKnowledgeCatalog();
  const active = Boolean(query || topic);
  const matches = searchKnowledge(catalog, query, topic);
  const selectedTopic = knowledgeTopics.find((item) => item.id === topic);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (query || topic) resultHeading.current?.focus(); }, [query, topic]);

  return <div className="hv-knowledge">
    <section className="hv-knowledge__hero" aria-labelledby="knowledge-title">
      <div className="hv-knowledge__container">
        <p className="hv-knowledge__eyebrow">Guidance for your work</p>
        <h1 id="knowledge-title">Knowledge</h1>
        <p>Find the guidance, tools, and people to move your work forward.</p>
        <form className="hv-knowledge__search" role="search" aria-label="Knowledge search" onSubmit={(event) => {
          event.preventDefault();
          const value = String(new FormData(event.currentTarget).get('query') ?? '').trim();
          setParams({ ...(value ? { q: value } : {}), ...(topic ? { topic } : {}) });
        }}>
          <Search aria-hidden="true" />
          <label className="hv-visually-hidden" htmlFor="knowledge-query">Search knowledge</label>
          <input id="knowledge-query" key={query} name="query" type="search" defaultValue={query} placeholder="What are you trying to do?" />
          <button type="submit">Search</button>
        </form>
        <p className="hv-knowledge__search-hint">Try “expense report”, “volunteer onboarding”, or “program templates”</p>
      </div>
    </section>

    <div className="hv-knowledge__container hv-knowledge__body">
      <div className="hv-knowledge__top-grid">
        <section aria-labelledby="knowledge-start-title">
          <p className="hv-knowledge__eyebrow">{active ? 'Your results' : 'Start here'}</p>
          <h2 id="knowledge-start-title" ref={resultHeading} tabIndex={-1}>{active ? query ? `Results for “${query}”` : selectedTopic?.label ?? 'Topic not found' : 'What do you need to do?'}</h2>
          <p className="hv-knowledge__section-intro">{active ? `${matches.length} ${matches.length === 1 ? 'resource' : 'resources'}${selectedTopic && query ? ` in ${selectedTopic.label}` : ''}` : 'Choose a task for the steps, tools, and examples.'}</p>
          {active ? <>
            <Link className="hv-knowledge__clear" to="/knowledge">Clear search and filters</Link>
            {matches.length ? <div className="hv-knowledge__results"><ResourceRows resources={matches} /></div> : <div className="hv-knowledge__empty"><Search aria-hidden="true" /><h3>No matching resources</h3><p>Try a shorter phrase or another topic. You can also ask the right team for help.</p><Link to="/knowledge/help">Find someone to ask <ArrowRight aria-hidden="true" /></Link></div>}
          </> : <div className="hv-knowledge__tasks">{knowledgeTasks.map((task) => {
            const Icon = icons[task.icon];
            const resource = catalog.find((item) => item.id === task.resourceId)!;
            return <Link to={knowledgeHref(resource)} key={task.resourceId} className="hv-knowledge__task" aria-label={`${task.title}: view guide`}>
              <span className="hv-knowledge__task-icon"><Icon aria-hidden="true" /></span>
              <div><h3>{task.title}</h3><p>{task.summary}</p></div>
              <span className="hv-knowledge__task-link">View guide <ArrowRight aria-hidden="true" /></span>
            </Link>;
          })}</div>}
        </section>

        <aside className="hv-knowledge__topics" aria-labelledby="knowledge-topics-title">
          <h2 id="knowledge-topics-title">Browse by topic</h2><p>Explore the full collection.</p>
          <nav aria-label="Knowledge topics"><ul>{knowledgeTopics.map((item) => <li key={item.id}>
            <Link to={`/knowledge?topic=${item.id}`} aria-current={topic === item.id ? 'page' : undefined}><span><strong>{item.label}</strong><span>{item.description}</span></span><ChevronRight aria-hidden="true" /></Link>
          </li>)}</ul></nav>
          <div className="hv-knowledge__help"><h3>Can’t find it?</h3><Link to="/knowledge/help">Ask the right person <ArrowRight aria-hidden="true" /></Link></div>
        </aside>
      </div>

      {!active && <section className="hv-knowledge__updates" aria-labelledby="knowledge-updates-title"><h2 id="knowledge-updates-title">Recently updated</h2><p className="hv-knowledge__section-intro">Guidance worth another look.</p><ResourceRows resources={recentlyUpdated(catalog)} updates /></section>}
    </div>
  </div>;
}
