interface Validators {
    [name: string]: any;
}

export interface Validation {
    [name: string]: boolean;
    dirty: boolean;
    valid: boolean;
}

export interface Validations {
    [name: string]: Validation;
}

export class Validator {
    public initialValue: any;
    public validation: Validation;
    public validators: Validators;

    constructor(value: any, validators: Validators = {}) {
        this.initialValue = value;
        this.validators = validators;
        this.validation = this.validate(value);
    }

    public validate(value: any): Validation {
        const results: { [id: string]: boolean } = {};
        Object.keys(this.validators).forEach(
            key => (results[key] = this.validators[key](value))
        );
        const valid = Object.values(results).reduce(
            (accumulator, currentValue) => accumulator && currentValue,
            true
        );
        return {
            ...results,
            valid,
            dirty: this.initialValue !== value
        };
    }
}

export function validateAll(...validations: Validation[]) {
    return {
        dirty: validations
            .map(validation => validation.dirty)
            .reduce((accumulator, currentValue) => accumulator || currentValue),
        valid: validations
            .map(validation => validation.valid)
            .reduce((accumulator, currentValue) => accumulator && currentValue)
    };
}
