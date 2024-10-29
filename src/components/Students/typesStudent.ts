



export interface FormDataStudent {
    firstName: string
    lastName: string
     email: string;
     password: string;
     phone: string;
   }
   
   export interface Student {
     _id: string;
     firstName: string
     lastName: string
     email: string;
     password: string;
     phone: string;
     image?: string; 
     title?: string
     
   }
 
 
   export interface StudentResponse {
     students: Student[];
     student: Student;
     image: string;
   }