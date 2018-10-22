declare namespace _types {
  export interface Clue {
    id: string
    hint: string
    text: string
  }

  export interface Party {
    id: string
    displayName: string
    text: string
    location: string
    time: string
    otherNotes: string
  }

  export interface Character {
    id: string
    displayName: string
    attire: string
    relationships: string
    previewText?: string
    text: string
    uid: string
  }

  export interface Instruction {
    id: string
    isOptional?: boolean
    text: string
  }

  export interface Round {
    id: string
    roundText?: string
    text?: string
    order: number
    instructions?: Instruction[]
    clues?: Clue[]
  }
}
