import { User } from "../entities/user.entity"
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByName(firstName: string, lastName: string) {
        console.log(firstName, lastName);
        return this.createQueryBuilder('user')
            .where('user.first_name = :firstName OR user.last_name = :lastName', { firstName, lastName })
            .getMany();
    }
}