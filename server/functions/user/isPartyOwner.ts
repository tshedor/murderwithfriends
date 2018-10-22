import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface User {
  id: string
}

interface Party {
  owner: {
    id: string
  }
}

interface EventData {
  partyId: string
}

export default async (event: FunctionEvent<EventData>) => {
  try {
    // no logged in user
    if (!event.context.auth || !event.context.auth.nodeId) {
      return { data: null }
    }

    const { partyId } = event.data;

    const userId = event.context.auth.nodeId
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    // get user by id
    const user: User = await getUser(api, userId)
      .then(r => r.User)

    // no logged in user
    if (!user || !user.id) {
      return { data: null }
    }

    const party: Party = await getParty(api, partyId)
      .then(r => r.Party)

    // no party
    if (!party || !party.owner || !party.owner.id) {
      return { data: null }
    }

    return { data: { isOwner: user.id === party.owner.id } }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured during authentication.' }
  }
}

async function getUser(api: GraphQLClient, id: string): Promise<{ User }> {
  const query = `
    query getUser($id: ID!) {
      User(id: $id) {
        id
      }
    }
  `

  return api.request<{ User }>(query, { id })
}

async function getParty(api: GraphQLClient, id: string): Promise<{ Party }> {
  const query = `
    query getParty($id: ID!) {
      Party(id: $id) {
        owner {
          id
        }
      }
    }
  `

  return api.request<{ Party }>(query, { id })
}
