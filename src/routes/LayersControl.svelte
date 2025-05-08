<script lang="ts">
    const { layers } = $props();
</script>

<label>
    <input type="checkbox" bind:checked={layers.metro}>
    Metro
</label>

<label>
    <input type="checkbox" bind:checked={layers.districtes}>
    Districtes
</label>

<label>
    <input type="checkbox" bind:checked={layers.barris}>
    Barris
</label>