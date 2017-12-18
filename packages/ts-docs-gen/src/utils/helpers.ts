export namespace Helpers {
    export function Flatten(arr: any[][]): any[] {
        return arr.reduce((flat, toFlatten) =>
            flat.concat(Array.isArray(toFlatten) ? Flatten(toFlatten) : toFlatten), []);
    }

    // TODO: Move this to @simplrjs/markdown package.
    export function HeadingToAnchor(heading: string): string {
        return heading.trim().toLowerCase().replace(/[^\w\- ]+/g, "").replace(/\s/g, "-").replace(/\-+$/, "");
    }
}