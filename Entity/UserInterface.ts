interface UserInterface extends Entity {
    get username(): string;
    set username(username: string);
    get password(): string;
    set password(password: string);
    get firstName(): string;
    set firstName(firstName: string);
    get lastName(): string;
    set lastName(lastName: string);
    get email(): string;
    set email(email: string);
    computeFullName(): string;
    processAndHashPassword(password: string): string|false;
}

export type {UserInterface};