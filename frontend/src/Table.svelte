<script lang="ts">
  import { derived } from 'svelte/store'
  import { rows } from './store'
  import type { LRow } from '@ltable/runner'

  const header = derived(rows, (rows: LRow[]) => {
    if (rows.length === 0) return []
    const row = rows[0]
    const vars = row.varsOrder
    const aliases = Object.keys(row.aliases)
    const results = Object.keys(row.results)
    return [...vars, ...aliases, ...results]
  })

  const rowsMapped = derived(
    [rows, header],
    ([rows, names]: [LRow[], string[]]) => {
      return rows.map(row => {
        const all = { ...row.vars, ...row.aliases, ...row.results }
        return { data: names.map(name => all[name]), index: row.index }
      })
    },
  )
</script>

<div class="column is-half">
  <div class="card">
    <div class="card-content">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Number</th>
            {#each $header as name (name)}
              <th>{name}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each $rowsMapped as row (row.index)}
            <tr>
              <th>{row.index}</th>
              {#each row.data as value}
                <td>{value ? '1' : '0'}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
