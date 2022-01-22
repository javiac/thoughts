import Joi from 'joi';
import { ComponentType, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { MoodIcon } from '../../components/MoodIcon/MoodIcon';
import { Question } from '../../components/Question/Question';
import { Mood } from '../../enums/Mood';
import { IThought } from '../../interfaces/IThought';

import styles from './ThoughtAdd.module.css';

const maxCharacters = 400;

interface IThoughtAddProps {
  onThoughtAdded: (thought: IThought) => void;
}
export const ThoughtAdd: ComponentType<IThoughtAddProps> = (props) => {
  const [thought, setThought] = useState<Partial<IThought>>({});
  const [validationErrors, setValidationErrors] = useState<Map<string, string>>(new Map());
  const [liveValidate, setLiveValidate] = useState<boolean>(false);

  useEffect(() => {
    if (thought && liveValidate) {
      validate();
    }
  }, [thought]);

  function validate() {
    const schema = Joi.object<IThought>().keys({
      mood: Joi.valid(...Object.values(Mood)).required(),
      title: Joi.string().min(3).max(maxCharacters).required(),
      description: Joi.string().min(3).max(maxCharacters).required()
    });

    const validationResult = schema.validate(thought);
    if (validationResult.error) {
      const validationErrorsUpdate = new Map();
      for (const error of validationResult.error.details) {
        validationErrorsUpdate.set(error.path[0] as string, error.message);
      }
      setValidationErrors(validationErrorsUpdate);
    } else if (validationResult.value) {
      setValidationErrors(new Map());
      return validationResult.value;
    }

    return undefined;
  }

  function handleSave() {
    const thoughtValidated = validate();
    if (thoughtValidated) {
      props.onThoughtAdded(thoughtValidated);
    } else {
      setLiveValidate(true);
    }
  }

  return (
    <div className={styles.thoughtAdd}>
      <div>
        <label> How are you feeling? </label>
        <div className={styles.moodsBar}>
          {[Mood.rain, Mood.cloud, Mood.cloudy, Mood.sun, Mood.happy].map((mood) => (
            <div key={mood} className={styles.moodOption} onClick={() => setThought({ ...thought, mood })}>
              <MoodIcon
                mood={mood}
                color={thought?.mood === mood ? 'orange' : 'gray'}
                selected={thought?.mood === mood}
              />
            </div>
          ))}
        </div>
        <ErrorMessage error={validationErrors.get('mood')} />
      </div>
      <Question
        maxCharacters={maxCharacters}
        onChange={(value) => {
          setThought({ ...thought, title: value });
        }}
        error={validationErrors.get('title')}
      >
        What is going through your head right now?
      </Question>
      <Question
        maxCharacters={maxCharacters}
        onChange={(value) => {
          setThought({ ...thought, description: value });
        }}
        error={validationErrors.get('description')}
      >
        Is there any evidence your thought is true?
      </Question>
      <button className={styles.doneButton} onClick={handleSave}>
        Done
      </button>
    </div>
  );
};
