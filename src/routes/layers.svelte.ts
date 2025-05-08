const layers : LayersState = $state({
    metro: {
        visible: true,
        details: {
            visible: [],
            invisible: [],
        }
    },
    districtes: false,
    barris: false
});

type LayersState = {
    metro: {
        visible: boolean,
        details: {
            visible: string[],
            invisible: string[],
        }
    },
    districtes: boolean,
    barris: boolean,
}

const toggleMetroVisibility = (id: string) => {
    const visible_i = layers.metro.details.visible.indexOf(id);
    if (visible_i > -1) {
        // Make invisible
        layers.metro.details.visible.splice(visible_i, 1);
        layers.metro.details.invisible.push(id);
    } else {
        // Make visible
        const invisible_i = layers.metro.details.invisible.indexOf(id);
        layers.metro.details.invisible.splice(invisible_i, 1);
        layers.metro.details.visible.push(id);
    }
};

export {layers, toggleMetroVisibility};