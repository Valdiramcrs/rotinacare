export interface Exam {
  id: string;
  userId: string;
  name: string;
  type: string;
  date: Date;
  result?: string;
  notes?: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExamInput {
  name: string;
  type: string;
  date: Date;
  result?: string;
  notes?: string;
  fileUrl?: string;
}
