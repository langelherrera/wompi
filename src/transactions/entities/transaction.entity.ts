import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true })
    reference:string;

    @Column()
    description:string;

    @Column()
    status:string;

    @Column('float')
    amount:number;

    @Column()
    secretIntegrity:string

    @Column({ nullable: true })
    dateExpiration:string;

    @ManyToOne(()=>Product, (product)=>product.transaction)
    product: Product;

    @BeforeInsert()
    geneteUUID() {
      if (!this.reference) {
        this.reference = uuidv4(); 
      }
    }
}


