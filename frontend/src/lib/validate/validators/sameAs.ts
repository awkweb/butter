import { withParams } from "../withParams";

export default function(this: any, equalTo: any) {
    return withParams({ type: "sameAs", eq: equalTo }, (value: any) => {
        return value === this[equalTo];
    });
}
