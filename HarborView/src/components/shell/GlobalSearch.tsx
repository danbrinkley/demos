import { FileText, ListChecks, Search, Users, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchWorkspace } from '../../data/selectors';
import type { SearchResult, SearchResultType } from '../../data/types';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import './GlobalSearch.css';

const TYPE_LABEL: Record<SearchResultType, string> = {
  work_item: 'Work item',
  person: 'Person',
  resource: 'Resource',
};

const TYPE_ICON: Record<SearchResultType, typeof Search> = {
  work_item: ListChecks,
  person: Users,
  resource: FileText,
};

export function GlobalSearch() {
  const { workItems, staff, resources, requestItemFocus } = useWorkspaceData();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [placeholderMessage, setPlaceholderMessage] = useState<string | null>(null);
  const listboxId = useId();

  const results: SearchResult[] = query.trim()
    ? searchWorkspace(query, { workItems, staff, resources })
    : [];
  const isOpen = query.trim().length > 0;

  function reset() {
    setQuery('');
    setPlaceholderMessage(null);
  }

  function selectResult(result: SearchResult) {
    if (result.type === 'work_item') {
      requestItemFocus(result.id);
      navigate('/');
      reset();
      return;
    }
    if (result.type === 'person') {
      setPlaceholderMessage('Staff profiles are coming soon to Harbor View.');
      return;
    }
    setPlaceholderMessage('The Resources library opens on the Resources page.');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      reset();
      inputRef.current?.blur();
    }
  }

  return (
    <div className="hv-search">
      <div className="hv-search__field">
        <Search aria-hidden="true" className="hv-search__icon" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Search Harbor View"
          aria-controls={listboxId}
          placeholder="Search Harbor View"
          className="hv-search__input"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPlaceholderMessage(null);
          }}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button type="button" className="hv-search__clear" onClick={reset} aria-label="Clear search">
            <X aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {isOpen ? (
        <div className="hv-search__panel" id={listboxId} role="region" aria-label="Search suggestions">
          {placeholderMessage ? (
            <p className="hv-search__placeholder-message">{placeholderMessage}</p>
          ) : results.length > 0 ? (
            <ul className="hv-search__results">
              {results.map((result) => {
                const Icon = TYPE_ICON[result.type];
                return (
                  <li key={`${result.type}-${result.id}`}>
                    <button type="button" className="hv-search__result" onClick={() => selectResult(result)}>
                      <Icon aria-hidden="true" className="hv-search__result-icon" />
                      <span className="hv-search__result-text">
                        <span className="hv-search__result-label">{result.label}</span>
                        <span className="hv-search__result-meta">{result.meta}</span>
                      </span>
                      <span className="hv-search__result-type">{TYPE_LABEL[result.type]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="hv-search__placeholder-message">No matches in Harbor View for “{query.trim()}”.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
