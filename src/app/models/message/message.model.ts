
export interface Message {
  id: number;
  content: string;
  date: string;
  read: boolean;
  isDeleted: boolean;
  employeeIds: number[];
}
