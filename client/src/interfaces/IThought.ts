import { Mood } from '../enums/Mood';

export interface IThought {
  id?: string;
  title: string;
  description: string;
  mood: Mood;
  createdAt: string;
}
