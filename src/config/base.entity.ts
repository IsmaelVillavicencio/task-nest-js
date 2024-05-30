import { format } from 'date-fns';
import { transformDateFromEntity } from 'src/utils/date-transformer';
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';


export abstract class BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn({
		default: () => 'CURRENT_TIMESTAMP',
		type: 'timestamp',
		onUpdate: 'CURRENT_TIMESTAMP',
		name: 'created_at',
		transformer: transformDateFromEntity,
	})
	createdAt: Date;

	@UpdateDateColumn({
		default: () => 'CURRENT_TIMESTAMP',
		type: 'timestamp',
		onUpdate: 'CURRENT_TIMESTAMP',
		name: 'updated_at',
		transformer: transformDateFromEntity,
	})
	updatedAt: Date;
}
