<script lang="ts">
    import {layers} from "./layers.svelte";

    const showAll = () => {
        layers.metro.details.invisible.forEach((e) => layers.metro.details.visible.push(e));
        layers.metro.details.invisible.splice(0, layers.metro.details.invisible.length);
    };

    const hideAll = () => {
        layers.metro.details.visible.forEach((e) => layers.metro.details.invisible.push(e));
        layers.metro.details.visible.splice(0, layers.metro.details.visible.length);
    };
</script>

<div>
    <label>
        <input type="checkbox" bind:checked={layers.metro.visible} />
        Metro
    </label>

    <label>
        <input type="checkbox" bind:checked={layers.districtes} />
        Districtes
    </label>

    <label>
        <input type="checkbox" bind:checked={layers.barris} />
        Barris
    </label>
</div>
{#if layers.metro}
    <div>
        Radius
        <button onclick={() => {showAll()}}>Show all</button>
        <button onclick={() => {hideAll()}}>Hide all</button>
    </div>
{/if}