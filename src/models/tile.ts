export type TileState = "correct" | "present" | "absent";

export type Tile = {
    letter: string;
    state: TileState;
}