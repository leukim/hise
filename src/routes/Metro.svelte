<script lang="ts">
    import { GeoJSONSource, LineLayer, Marker, Popup, SymbolLayer } from "svelte-maplibre-gl";
    import linies_metro from '$lib/data/linies_metro.json';
    import estacions_metro from '$lib/data/estacions_metro.json';
    import accessos_metro from '$lib/data/accessos_metro.json';
    import {createGeoJSONCircle} from "$lib/circle";

    import {layers} from "./layers.svelte";

    estacions_metro.features.forEach((e) => layers.metro.details.invisible.push(e.id));
</script>

{#each estacions_metro.features as estacio}
    <Marker lnglat={[estacio.geometry.coordinates[0], estacio.geometry.coordinates[1]]}>
        {#snippet content()}
            <div>
                <img src="metro.svg" alt="metro" class="metro_logo" id={estacio.id}/>
            </div>
        {/snippet}
    </Marker>
    {#if layers.metro.details.visible.indexOf(estacio.id) > -1}
        <GeoJSONSource data={{type: 'Point', coordinates: estacio.geometry.coordinates}}>
            <SymbolLayer minzoom={13} layout={{'symbol-placement': 'point', 'text-field': "\n\n"+estacio.properties.NOM_ESTACIO}} />
        </GeoJSONSource>
        <GeoJSONSource data={{type: "Polygon", coordinates:createGeoJSONCircle(estacio.geometry.coordinates, 0.4)}}>
            <LineLayer paint={{'line-color': "red", 'line-opacity': .5}} />
        </GeoJSONSource>
    {/if}
{/each}
{#each accessos_metro.features as acces}
    {#if layers.metro.details.visible.indexOf("ESTACIONS."+acces.properties.ID_ESTACIO) > -1}
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

<style>
    .metro_logo {
        height: 15px;
    }

    .acces {
        height: 10px;
    }
</style>