import { derived, writable, Readable } from 'svelte/store'

import { run, LRow } from '@ltable/runner'

export const code = writable('')

const runResult: Readable<{
  rows: LRow[]
  error: string | null
}> = derived(code, c => {
  try {
    const rows = run(c + '\n')
    return { rows, error: null }
  } catch (e) {
    return { error: e, rows: [] }
  }
})

export const error: Readable<string | null> = derived(
  runResult,
  ({ error }) => error,
)

export const rows = derived(runResult, ({ rows }) => rows)
