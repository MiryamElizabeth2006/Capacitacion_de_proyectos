import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('products')
export class Product { 
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column('numeric', {precision: 10, scale: 2})
    price:number

    @Column()
    description: string
    
    @Column ({default: true})
    isActive: boolean
}
