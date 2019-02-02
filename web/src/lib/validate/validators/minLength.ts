import { withParams } from "../withParams";

import { len, req } from "./common";

export default (length: number) =>
    withParams(
        { type: "minLength", min: length },
        (value: string | any[]) => !req(value) || len(value) >= length
    );
