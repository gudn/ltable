export interface LRow {
  vars: {
    [key: string]: boolean
  }
  varsOrder: string[]
  aliases: {
    [key: string]: boolean
  }
  results: {
    [key: string]: boolean
  }
  index: number
}

export function run(code: string): LRow[]
