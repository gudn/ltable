<script lang="ts">
  import { code } from './store'

  code.subscribe(console.log)

  function updateCode(e) {
    const target = e.target as HTMLTextAreaElement
    code.set(target.value)
  }
</script>

<div class="column is-half">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Table description</p>
    </header>
    <div class="card-content">
      <textarea class="textarea" placeholder="Enter code..." value={$code} on:input={updateCode}></textarea>
    </div>
  </div>
</div>
