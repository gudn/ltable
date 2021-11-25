<script lang="ts">
  import debounce from 'lodash.debounce'

  import { code, error } from './store'

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
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Enter code..."
            value={$code}
            on:input={inputHandler}
          />
        </div>
        {#if $error}
          <p class="help is-danger">{$error}</p>
        {/if}
      </div>
    </div>
  </div>
</div>
