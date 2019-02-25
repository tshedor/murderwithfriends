declare namespace _types {
  export interface Clue {
    hint: string
    text: string
  }

  export interface Party {
    id: string
    displayName: string
    text: string
    location: string
    time: string
    currentRound: number
    otherNotes: string
  }

  export interface Player {
    id: string
    promptAnswers: string[]
  }

  export interface Character {
    displayName: string
    attire: string
    relationships: string
    previewText: string
    text: string
  }

  export interface Instruction {
    isOptional?: boolean
    text: string
  }

  export interface Round {
    roundText?: string
    text?: string
    order: number
    instructions?: Instruction[]
    clues?: Clue[]
  }
}
