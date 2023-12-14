import type { Request } from "express";
import type { Entity } from "./entity.js";

interface UserInterface extends Entity {
    get id(): number;
    set id(id: number);
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
    hydrateFromRequest(entity: Entity, request: Request): Entity;
}

export type {UserInterface};