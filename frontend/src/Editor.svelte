<script lang="ts">
  import debounce from 'lodash.debounce'

  import { code } from './store'

  function updateCode(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement
    code.set(target.value)
  }

  const inputHandler = debounce(updateCode, 200)
</script>

<div class="column is-half">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Table description</p>
    </header>
    <div class="card-content">
      <textarea
        class="textarea"
        placeholder="Enter code..."
        value={$code}
        on:input={inputHandler}
      />
    </div>
  </div>
</div>
