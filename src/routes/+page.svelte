<script lang="ts">
    import {  MapLibre } from "svelte-maplibre-gl";
    import Metro from "./Metro.svelte";
    import Districtes from "./Districtes.svelte";
    import Barris from "./Barris.svelte";
    import LayersControl from "./LayersControl.svelte";

    import {layers, toggleMetroVisibility} from "./layers.svelte";

    const handleMapClick = (event: any) => {
        const id = event?.originalEvent?.originalTarget?.id;
        if (id) {
            toggleMetroVisibility(id);
        }
    };
</script>

<h1>HISE test</h1>

<LayersControl />

<div class="container">
    <MapLibre
            center={[2.15,41.40]}
            zoom={11}
            class="map"
            style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            onclick={handleMapClick}
    >
        {#if layers.metro.visible}
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