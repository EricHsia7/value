import { ModelComponent } from '../component/component';
import { generateIdentifier } from '../tools/generate-identifier';

export interface Variable {
  type: 'variable';
  name: string;
  template: ModelComponent<'template'> | undefined;
  id: string;
}

const Variables: {
  [id: Variable['id']]: Variable;
} = {};

export async function initializeVariables() {
  const keys = await lfListItemKeys(1);
  for (const key of keys) {
    const thisVariableJSON = await lfGetItem(1, key);
    if (thisVariableJSON) {
      const thisVariableObject = JSON.parse(thisVariableJSON) as Symbol;
      Variables[thisVariableObject.id] = thisVariableObject;
    }
  }
}

export async function createVariable(): Promise<Variable['id']> {
  const identifier = generateIdentifier();
  const object: Variable = {
    type: 'variable',
    name: identifier,
    template: undefined,
    id: identifier
  };

  Variables[identifier] = object;

  await lfSetItem(1, identifier, JSON.stringify(object));

  return identifier;
}

export function hasVariable(VariableID: Variable['id']): boolean {
  return Variables.hasOwnProperty(VariableID);
}

export function getVariable(VariableID: Variable['id']): Symbol | undefined {
  if (hasVariable(VariableID)) {
    return Variables[VariableID];
  } else {
    return undefined;
  }
}

export async function deleteVariable(VariableID: Variable['id']): Promise<boolean> {
  if (hasVariable(VariableID)) {
    delete Variables[VariableID];
    await lfRemoveItem(1, VariableID);
    return true;
  } else {
    return false;
  }
}
