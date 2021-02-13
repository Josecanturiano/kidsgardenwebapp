export interface Student {
	id?: string;
	firstName?: string;
	lastName?: string;
	status?: boolean | string;
	gradeLevel?: string;
	dateBorn?: string | Date;
	address?: string;
	period?: Date | string;
	class?: string;
	teacher?: string;
	classes?: number;
	email?: string;
	enable?: boolean;
	phone?: string;
	cellphone?: string;
	gender?: string;
	createdBy?: string;
	createdAt?: Date | string;
	updatedBy?: string;
	updatedAt?: Date | string;
	photoUrl?: string;
	role?: string;
	schoolId?: number;
	type?: string;
}

export const ELEMENT_DATA: Student[] = [];