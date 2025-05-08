<script lang="ts">
    import { GeoJSONSource, LineLayer } from "svelte-maplibre-gl";
    import barris from "$lib/data/barris.json";
    import {wgsToCoords} from "$lib/converters";
</script>

{#each barris as barri}
    <GeoJSONSource data={{type:"Polygon", coordinates:wgsToCoords(barri.geometria_wgs84)}}>
        <LineLayer paint={{'line-color': 'green'}} />
    </GeoJSONSource>
{/each}