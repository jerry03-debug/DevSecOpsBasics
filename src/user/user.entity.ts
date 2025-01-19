import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Nom de la table
export class User {
    @PrimaryGeneratedColumn() // Colonne auto-incrémentée
    id: number;

    @Column() // Colonne simple
    name: string;

    @Column({ unique: true }) // Colonne avec contrainte d'unicité
    email: string;

    @Column() // Colonne simple
    password: string;
}
