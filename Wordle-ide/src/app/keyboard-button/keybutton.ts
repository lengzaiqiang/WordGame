
export enum BackGroundColor {
    Default = 0,
    BothCorrect,
    LetterCorrect,
    NotCorrect,
}
export interface IKeyButton
{
    value : string;
    column: number;
    row: number;
    bkColor: BackGroundColor;
}

