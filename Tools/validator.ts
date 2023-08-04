interface ValidatorInterface {
    stringIsLongEnough(stringToCheck: string, length: number, propertyName: string): boolean;
    stringIsShortEnough(stringToCheck: string, length: number, propertyName: string): boolean;
}

module.exports = class Validator implements ValidatorInterface {
    public stringIsLongEnough(stringToCheck: string, length: number, propertyName: string): boolean {
        if (stringToCheck.length < length) {
            throw new Error("Property \"" + propertyName + "\" has to be at least " + length + " characters long");
        }

        return true;
    }

    public stringIsShortEnough(stringToCheck: string, length: number, propertyName: string): boolean {
        if (stringToCheck.length > length) {
            throw new Error("Property \"" + propertyName + "\" has to be less than " + length + " characters long");
        }

        return true;
    }
}