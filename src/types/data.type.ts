
export interface Task {
    id:number,
    date: Date,
    named: string,
    completed: boolean,
    priority: string,
    time: {
        hours: number,
        minutes: number
    }
  }
  