export interface Task {
  id?: string; 
  title: string;
  description?: string;
  dueDate: string; 
  priority: 'Urgent' | 'Medium' | 'Low';
  category: 'User Story' | 'Technical Task' | string; 

  assignedTo: string[]; 
  subtasks: string[]; 

  status: 'Backlog' | 'To Do' | 'In Progress' | 'Done';

  createdAt?: number;
  updatedAt?: number;
}