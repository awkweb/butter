import { withParams } from "../withParams";

export default withParams(
    { type: "positive" },
    (value: any) => !Number.isNaN(value)
);
