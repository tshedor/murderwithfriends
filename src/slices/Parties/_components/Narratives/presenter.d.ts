import * as React from 'react'

interface NarrativeData {
  displayName: string;
  text: string;
}

interface NarrativeProps {
  narrative: NarrativeData,
  narrativeId: string
}

declare const Narrative: React.SFC<NarrativeProps>
declare const Presenter: React.ComponentType<{ narratives: object}>

export default Presenter;
