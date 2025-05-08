<script lang="ts">
    import { GeoJSONSource, LineLayer } from "svelte-maplibre-gl";
    import districtes from "$lib/data/districtes.json";
    import {wgsToCoords} from "$lib/converters";
</script>

{#each districtes as districte}
    <GeoJSONSource data={{type:"Polygon", coordinates:wgsToCoords(districte.geometria_wgs84)}}>
        <LineLayer paint={{'line-color': 'blue', 'line-width': 2}} />
    </GeoJSONSource>
{/each}