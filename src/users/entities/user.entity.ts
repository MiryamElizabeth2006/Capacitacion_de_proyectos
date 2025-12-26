import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    last:string

    @Column()
    telefono: string

    @Column()
    age: number

    @Column({default:true})
    isActive: boolean
}
