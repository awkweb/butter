import { len, req } from "./common";
import { withParams } from "../withParams";

export default (length: number) =>
    withParams(
        { type: "minLength", min: length },
        (value: string | Array<any>) => !req(value) || len(value) >= length
    );
