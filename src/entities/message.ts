import {
    Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Wedding} from "./wedding";

@Entity("message")
export class Message {

    @PrimaryGeneratedColumn({
        name: "message_id",
        type: "integer"
        })
    public messageId: number;

    // tslint:disable-next-line: no-shadowed-variable
    @ManyToOne(() => Wedding, (wedding: { messages: any; }) => wedding.messages, {  nullable: false })
    @JoinColumn({ name: "wedding_id"})
    public wedding: Wedding | null;

    @Column("character varying", {
        length: 300,
        name: "message",
        nullable: false
        })
    public message: string;

    @Column("character varying", {
        length: 300,
        name: "image",
        nullable: true
        })
    public image: string | null;

    @Column("character varying", {
        length: 20,
        name: "number_sender",
        nullable: false
        })
    public numberSender: string;

    @Column("character varying", {
        length: 30,
        name: "name_sender",
        nullable: false
        })
    public nameSender: string;

    @Column("boolean", {
        default: () => "false",
        name: "message_sent",
        nullable: true
        })
    public messageSent: boolean | null;

}
