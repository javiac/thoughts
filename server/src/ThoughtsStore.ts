import { v4 as uuidv4 } from 'uuid';

import { Mood } from './enums/Mood';
import { IThought } from './interfaces/IThought';

export class ThoughsStore {
  private thoughts: IThought[];

  constructor() {
    this.thoughts = [
      {
        id: uuidv4(),
        title: 'I need to think more what the other person is feeling',
        description: 'Yes, Bill was very rude to me',
        mood: Mood.rain,
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'test 2',
        description: 'test 2 description',
        mood: Mood.rain,
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'test 3',
        description: 'test 3 description',
        mood: Mood.rain,
        createdAt: new Date()
      }
    ];
  }

  public getThoughts(): IThought[] {
    return this.thoughts;
  }

  public getThoughtById(id: string): IThought | undefined {
    return this.thoughts.find((thought) => thought.id === id);
  }

  public createThought(data: IThought): IThought {
    const newThought = {
      ...data,
      id: uuidv4(),
      date: new Date()
    };

    this.thoughts.push(newThought);
    return newThought;
  }
}
