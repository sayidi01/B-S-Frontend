



export interface FormDataStudent {
    firstName: string
    lastName: string
     email: string;
     password: string;
     phone: string;
     accountExpiryDate?: string
   }
   
   export interface Student {
     _id: string;
     firstName: string
     lastName: string
     email: string;
     password: string;
     phone: string;
     image?: string; 
     accountExpiryDate?: string
   }
 
 
   export interface StudentResponse {
     students: Student[];
     student: Student;
     image: string;
   }