import { useEffect } from 'react';
import { OrgAlertBanner } from '../../components/shell/OrgAlertBanner';
import { DEMO_TODAY } from '../../data/demoDate';
import { selectMyTasks, selectThisWeek, selectWhatNeedsYou } from '../../data/selectors';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import { AttentionListSection } from './AttentionListSection';
import { Greeting } from './Greeting';
import './HomePage.css';
import './homeShared.css';
import { ThisWeekSection } from './ThisWeekSection';
import { WhatNeedsYouSection } from './WhatNeedsYouSection';
import { ActiveProjectsSection } from './ActiveProjectsSection';
import { MyRequestsSection } from './MyRequestsSection';

export function HomePage() {
  const {
    currentUser,
    workItems,
    commitments,
    requests,
    projects,
    alert,
    completeWorkItem,
    expandedItemIds,
    toggleItemExpanded,
    pendingFocusItemId,
    clearItemFocus,
  } = useWorkspaceData();

  const whatNeedsYou = selectWhatNeedsYou(workItems);
  const myTasks = selectMyTasks(workItems);
  const thisWeek = selectThisWeek(commitments);

  // When search asks Home to open a specific item (already expanded by
  // requestItemFocus), move focus there so keyboard and screen-reader users
  // land on the right content instead of just the URL changing underneath them.
  useEffect(() => {
    if (!pendingFocusItemId) return;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(`work-item-${pendingFocusItemId}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target?.focus({ preventScroll: true });
      clearItemFocus();
    });

    return () => cancelAnimationFrame(frame);
  }, [pendingFocusItemId, clearItemFocus]);

  return (
    <div className="hv-home">
      <OrgAlertBanner alert={alert} />

      <Greeting firstName={currentUser.firstName} today={DEMO_TODAY} />

      <WhatNeedsYouSection
        items={whatNeedsYou}
        expandedIds={expandedItemIds}
        onToggle={toggleItemExpanded}
        onComplete={completeWorkItem}
      />

      <div className="hv-home__work-grid">
        <div className="hv-home__work-column">
          <AttentionListSection
            items={myTasks}
            expandedIds={expandedItemIds}
            onToggle={toggleItemExpanded}
            onComplete={completeWorkItem}
          />
          <ActiveProjectsSection projects={projects} />
        </div>
        <aside className="hv-home__context-column" aria-label="Requests and upcoming commitments">
          <MyRequestsSection requests={requests} />
          <ThisWeekSection commitments={thisWeek} />
        </aside>
      </div>
    </div>
  );
}
