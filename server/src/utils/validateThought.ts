import Joi from 'joi';

import { Mood } from '../enums/Mood';
import { IThought } from '../interfaces/IThought';

const maxCharacters = 400;

export function validateThought(data: unknown): data is IThought {
  const schema = Joi.object<IThought>().keys({
    title: Joi.string().min(3).max(maxCharacters).required(),
    description: Joi.string().min(3).max(maxCharacters).required(),
    mood: Joi.valid(...Object.values(Mood))
  });

  const validationResult = schema.validate(data);
  return validationResult.error === undefined;
}
