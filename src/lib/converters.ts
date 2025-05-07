const wgsToCoords = (wgs: string): number[][][] => {
    const coords: number[][] = [];

    const regex = new RegExp('^POLYGON \\(\\((.*)\\)\\)$');

    const data = wgs.match(regex);

    if (!data || data.length < 1) return [];

    const coord_strings = data[1].split(", ");
    for (const i in coord_strings) {
        const coord_string = coord_strings[i];
        const coord = coord_string.split(' ').map(parseFloat);
        coords.push(coord)
    }

    return [coords];
}

export { wgsToCoords };