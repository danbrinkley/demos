import { useEffect } from 'react';
import { OrgAlertBanner } from '../../components/shell/OrgAlertBanner';
import { DEMO_TODAY } from '../../data/demoDate';
import { selectNeedsAttention, selectThisWeek, selectWhatNeedsYou } from '../../data/selectors';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import { AttentionListSection } from './AttentionListSection';
import { Greeting } from './Greeting';
import './HomePage.css';
import './homeShared.css';
import { ThisWeekSection } from './ThisWeekSection';
import { WhatNeedsYouSection } from './WhatNeedsYouSection';

export function HomePage() {
  const {
    currentUser,
    workItems,
    commitments,
    alert,
    completeWorkItem,
    expandedItemIds,
    toggleItemExpanded,
    pendingFocusItemId,
    clearItemFocus,
  } = useWorkspaceData();

  const whatNeedsYou = selectWhatNeedsYou(workItems);
  const needsAttention = selectNeedsAttention(workItems);
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

      <div className="hv-home__secondary-row">
        <AttentionListSection
          items={needsAttention}
          expandedIds={expandedItemIds}
          onToggle={toggleItemExpanded}
          onComplete={completeWorkItem}
        />
        <ThisWeekSection commitments={thisWeek} />
      </div>
    </div>
  );
}
