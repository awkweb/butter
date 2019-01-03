const stack: any[] = [];

// exported for tests
export let target: object | null = null;

export function pushParams() {
    if (target !== null) {
        stack.push(target);
    }
    target = {};
}

export function popParams() {
    const lastTarget = target;
    const newTarget = (target = stack.pop() || null);
    if (newTarget) {
        if (!Array.isArray(newTarget.$sub)) {
            newTarget.$sub = [];
        }
        newTarget.$sub.push(lastTarget);
    }
    return lastTarget;
}

function addParams(params: object) {
    if (typeof params === "object" && !Array.isArray(params)) {
        target = { ...target, ...params };
    } else {
        throw new Error("params must be an object");
    }
}

function withParamsDirect(params: object, validator: Function) {
    return withParamsClosure((add: Function) => {
        return function(this: any, ...args: any[]) {
            add(params);
            return validator.apply(this, args);
        };
    });
}

function withParamsClosure(closure: Function) {
    const validator = closure(addParams);
    return function(this: any, ...args: any[]) {
        pushParams();
        try {
            return validator.apply(this, args);
        } finally {
            popParams();
        }
    };
}

export function withParams(
    paramsOrClosure: object | Function,
    maybeValidator: Function
) {
    if (typeof paramsOrClosure === "object" && maybeValidator !== undefined) {
        return withParamsDirect(paramsOrClosure, maybeValidator);
    }
    return withParamsClosure(paramsOrClosure as Function);
}
