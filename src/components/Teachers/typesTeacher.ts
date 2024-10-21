

export interface FormDataTeacher {
   firstName: string
   lastName: string
    email: string;
    password: string;
    phone: string;
  }
  
  export interface Teacher {
    _id: string;
    firstName: string
    lastName: string
    email: string;
    password: string;
    phone: string;
    image?: string; 
    
  }


  export interface TeacherResponse {
    teachers: Teacher[];
    admin: Teacher;
    image: string;
  }