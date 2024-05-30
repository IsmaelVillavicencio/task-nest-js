import { format } from "date-fns";
import { ValueTransformer } from "typeorm";


export const transformDateFromEntity: ValueTransformer = {
	to: (entityValue: Date) => entityValue,
  	from: (databaseValue: Date) => format(databaseValue, 'yyyy-MM-dd HH:mm:ss'),
};

export const transformDate = (date: Date): string => {
	return format(date, 'yyyy-MM-dd HH:mm:ss');
}