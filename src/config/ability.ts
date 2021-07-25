import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';
import { ITodoItem } from '../interface';

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Todo' | ITodoItem | 'all';

export type IAppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<IAppAbility>;

export const defineRulesFor = (role: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (role === 'admin') {
    can('manage', 'all');
  } else {
    can(['read', 'create'], 'Todo');
    can(['update', 'delete'], 'Todo', { assignee: 'me' });
  }

  return rules;
};

export const buildAbilityFor = (role: string): IAppAbility => {
  return new AppAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object: any) => object!.type,
  });
};
