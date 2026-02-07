import * as path from "path";

export function assetPath(filename: string): string {
    return path.join(__dirname, "../../assets", filename);
}
