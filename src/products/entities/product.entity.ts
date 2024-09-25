import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    description:string;
    @Column()
    stock:number;
    @Column('float')
    price:number;

    @Column({ nullable: true })
    image:string

    @OneToMany(()=> Transaction,(transaction)=>transaction.product)
    transaction: Transaction
}
