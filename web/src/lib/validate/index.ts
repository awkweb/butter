interface Validators {
    [name: string]: Function;
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
    initialValue: any;
    validation: Validation;
    validators: Validators;

    constructor(value: any, validators: Validators) {
        this.initialValue = value;
        this.validators = validators;
        this.validation = this.validate(value);
    }

    validate(value: any): Validation {
        const results: { [id: string]: boolean } = {};
        Object.keys(this.validators).forEach(
            key => (results[key] = this.validators[key](value))
        );
        const valid = Object.values(results).reduce(
            (accumulator, currentValue) => accumulator && currentValue
        );
        return {
            ...results,
            valid,
            dirty: this.initialValue !== value
        };
    }
}

export function validateAll(...validations: Array<Validation>) {
    return {
        dirty: validations
            .map(validation => validation.dirty)
            .reduce((accumulator, currentValue) => accumulator || currentValue),
        valid: validations
            .map(validation => validation.valid)
            .reduce((accumulator, currentValue) => accumulator && currentValue)
    };
}
