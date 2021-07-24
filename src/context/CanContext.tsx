import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { IAppAbility } from '../config/ability';

export const AbilityContext = createContext<IAppAbility>(undefined!); // To tell compiler expression cannot be null or undefined here

export const Can = createContextualCan(AbilityContext.Consumer);
