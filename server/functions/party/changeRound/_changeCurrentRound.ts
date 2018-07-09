import { fromEvent, FunctionEvent } from 'graphcool-lib'

interface EventData {
  id: string
}

interface Party {
  id: string
  currentRound: number
}

interface Narrative {
  id: string
  rounds: Array<{ id: string }>
}

interface PartyNarrative {
  id: string,
  narrative: Narrative
}

const QUERY_CURRENT_ROUND = `
query GetCurrentRound($partyId: ID!) {
  Party(id: $partyId) {
    id
    currentRound
  }
}
`;

const QUERY_TOTAL_ROUNDS = `
query GetTotalRounds($partyId: ID!) {
  Party(id: $partyId) {
    id

    narrative {
      id
      rounds {
        id
      }
    }
  }
}
`;

const MUTATION_CHANGE_CURRENT_ROUND = `
mutation ChangeCurrentRound($partyId: ID!, $changedRoundNumber: Int!) {
  updateParty(id: $partyId, currentRound: $changedRoundNumber) {
    id
    currentRound
  }
}
`;

export default async function(event: FunctionEvent<EventData>, shouldIncrement=true) {
  const graphcool = fromEvent(event);
  const api = graphcool.api('simple/v1');
  const partyId = event.data.id;

  try {
    const currentRound = await api.request<{ Party }>(QUERY_CURRENT_ROUND, { partyId }).then(data => data.Party.currentRound);
    const maxRound = await api.request<{ Party: PartyNarrative }>(QUERY_TOTAL_ROUNDS, { partyId }).then(data => data.Party.narrative.rounds.length - 1);

    const changedRoundNumber = shouldIncrement ? currentRound + 1 : currentRound - 1;

    if (changedRoundNumber < 0) {
      return { error: `The party hasn't even started` };
    }

    if (changedRoundNumber > maxRound) {
      return { error: `This is the last round` };
    }

    const resp = await api.request<{ updateParty: Party }>(MUTATION_CHANGE_CURRENT_ROUND, { partyId, changedRoundNumber }).then(data => data.updateParty);

    return { data: resp }
  } catch (e) {
    console.log(e)
    return { error: 'Unexpected error while changing round' }
  }
}
