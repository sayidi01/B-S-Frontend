
export interface ILesson {
    _id: string;
    id: string;
    title: string;
    description: string;
    chapterId: string;
    courseID: string;
    content?: string
    quizId?: { 
        _id: string;
        name: string;
    } | null;
    

}