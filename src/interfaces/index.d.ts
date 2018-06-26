declare namespace _types {
  export interface Clue {
    id: string
    hint: string
    text: string
  }

  export interface Party {
    displayName: string
    text: string
    location: string
    time: string
    otherNotes: string
  }

  export interface Character {
    displayName: string
    attire: string
    relationships: string
    text: string
    uid: string
  }

  export interface Instruction {
    isOptional?: boolean
    text: string
  }

  export interface Round {
    roundText?: string
    text?: string
    instructions: InstructionList
    clues: ClueList
  }

  export type ClueList = { [key: string]: Clue }
  export type InstructionList = { [key: string]: Instruction }
}
