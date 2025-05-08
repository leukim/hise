<script lang="ts">
    import { GeoJSONSource, LineLayer, MapLibre, Marker, Popup } from "svelte-maplibre-gl";
    import { createGeoJSONCircle } from "$lib/circle";
    import { wgsToCoords} from "$lib/converters";
    import linies_metro from '$lib/data/linies_metro.json';
    import estacions_metro from '$lib/data/estacions_metro.json';
    import accessos_metro from '$lib/data/accessos_metro.json';
    import districtes from "$lib/data/districtes.json";
    import barris from "$lib/data/barris.json";

    let layers = $state({
        metro: false,
        districtes: false,
        barris: true
    });

    let selected_metro_station = $state("");
</script>

<h1>HISE test</h1>

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

<div class="container">
    <MapLibre
            center={[2.15,41.40]}
            zoom={11}
            class="map"
            style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
        {#if layers.metro}
            {#each estacions_metro.features as estacio}
                <Marker lnglat={[estacio.geometry.coordinates[0], estacio.geometry.coordinates[1]]}>
                    {#snippet content()}
                        <img src="metro.svg" alt="metro" class="metro_logo"/>
                    {/snippet}
                    <Popup onopen={() => {selected_metro_station = estacio.properties.NOM_ESTACIO }}>
                        <div>{estacio.properties.NOM_ESTACIO}</div>
                    </Popup>
                </Marker>
                <GeoJSONSource data={{type: "Polygon", coordinates:createGeoJSONCircle(estacio.geometry.coordinates, 0.4)}}>
                    <LineLayer paint={{'line-color': "red", 'line-opacity': .5}} />
                </GeoJSONSource>
            {/each}
            {#each accessos_metro.features as acces}
                {#if selected_metro_station === acces.properties.NOM_ESTACIO}
                    <Marker lnglat={[acces.geometry.coordinates[0], acces.geometry.coordinates[1]]}>
                        {#snippet content()}
                            <svg class="acces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
                        {/snippet}
                        <Popup>
                            <h2>{acces.properties.NOM_ESTACIO}</h2>
                            <p>{acces.properties.NOM_ACCES}</p>
                        </Popup>
                    </Marker>
                {/if}
            {/each}
            {#each linies_metro.features as linia_metro}
                <GeoJSONSource data={linia_metro.geometry}>
                    <LineLayer paint={{'line-color': "#" + linia_metro.properties.COLOR_LINIA, 'line-width': 3}} />
                </GeoJSONSource>
            {/each}
        {/if}
        {#if layers.districtes}
            {#each districtes as districte}
                <GeoJSONSource data={{type:"Polygon", coordinates:wgsToCoords(districte.geometria_wgs84)}}>
                    <LineLayer paint={{'line-color': 'blue', 'line-width': 2}} />
                </GeoJSONSource>
            {/each}
        {/if}
        {#if layers.barris}
            {#each barris as barri}
                <GeoJSONSource data={{type:"Polygon", coordinates:wgsToCoords(barri.geometria_wgs84)}}>
                    <LineLayer paint={{'line-color': 'green'}} />
                </GeoJSONSource>
            {/each}
        {/if}
    </MapLibre>
</div>

<style>
    :global(.map) {
        height: 90vh;
    }

    .metro_logo {
        height: 15px;
    }

    .acces {
        height: 10px;
    }
</style>