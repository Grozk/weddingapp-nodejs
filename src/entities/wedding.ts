import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Message} from "./message";

@Entity("wedding")
@Index("id_public_index", ["idPublic"])
export class Wedding {

    @PrimaryGeneratedColumn({
        name: "wedding_id",
        type: "integer"
        })
    public weddingId: number;

    @Column("character varying", {
        length: 50,
        name: "partner1",
        nullable: false
        })
    public partner1: string;

    @Column("character varying", {
        length: 50,
        name: "partner2",
        nullable: false
        })
    public partner2: string;

    @Column("character varying", {
        length: 20,
        name: "number1",
        nullable: true
        })
    public number1: string | null;

    @Column("character varying", {
        length: 20,
        name: "number2",
        nullable: true
        })
    public number2: string | null;

    @Column("date", {
        name: "wedding_date",
        nullable: false
        })
    public weddingDate: string;

    @Column("character varying", {
        length: 10,
        name: "id_public",
        nullable: false
        })
    public idPublic: string;

    @Column("character varying", {
        length: 30,
        name: "mail_creator",
        nullable: true
        })
    public mailCreator: string | null;

    @OneToMany(() => Message, (message: { wedding: any; }) => message.wedding)
    public messages: Message[];
}
