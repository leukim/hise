<script lang="ts">
    import {  MapLibre } from "svelte-maplibre-gl";
    import Metro from "./Metro.svelte";
    import Districtes from "./Districtes.svelte";
    import Barris from "./Barris.svelte";
    import LayersControl from "./LayersControl.svelte";

    let layers = $state({
        metro: true,
        districtes: false,
        barris: false
    });
</script>

<h1>HISE test</h1>

<LayersControl {layers} />

<div class="container">
    <MapLibre
            center={[2.15,41.40]}
            zoom={11}
            class="map"
            style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
        {#if layers.metro}
            <Metro />
        {/if}
        {#if layers.districtes}
            <Districtes />
        {/if}
        {#if layers.barris}
            <Barris />
        {/if}
    </MapLibre>
</div>

<style>
    :global(.map) {
        height: 90vh;
    }
</style>