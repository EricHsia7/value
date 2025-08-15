import { lfGetItem, lfListItemKeys, lfRemoveItem, lfSetItem } from '../storage/index';
import { generateIdentifier } from '../tools/generate-identifier';
import { deleteVariable, hasVariable, Variable } from '../variable/index';

export interface Symbol {
  type: 'symbol';
  name: string;
  description: string;
  variables: Array<Variable['id']>;
  id: string;
}

const Symbols: {
  [id: Symbol['id']]: Symbol;
} = {};

export async function initializeSymbols() {
  const keys = await lfListItemKeys(0);
  for (const key of keys) {
    const thisSymbolJSON = await lfGetItem(0, key);
    if (thisSymbolJSON) {
      const thisSymbolObject = JSON.parse(thisSymbolJSON) as Symbol;
      Symbols[thisSymbolObject.id] = thisSymbolObject;
    }
  }
}

export async function createSymbol(): Promise<Symbol['id']> {
  const identifier = generateIdentifier();
  const object: Symbol = {
    type: 'symbol',
    name: 'Unnamed Symbol',
    description: '',
    variables: [],
    id: identifier
  };

  Symbols[identifier] = object;

  await lfSetItem(0, identifier, JSON.stringify(object));

  return identifier;
}

export function hasSymbol(SymbolID: Symbol['id']): boolean {
  return Symbols.hasOwnProperty(SymbolID);
}

export function getSymbol(SymbolID: Symbol['id']): Symbol | undefined {
  if (hasSymbol(SymbolID)) {
    return Symbols[SymbolID];
  } else {
    return undefined;
  }
}

export async function deleteSymbol(SymbolID: Symbol['id']): Promise<boolean> {
  if (hasSymbol(SymbolID)) {
    delete Symbols[SymbolID];
    await lfRemoveItem(0, SymbolID);
    return true;
  } else {
    return false;
  }
}

export async function addVariableToSymbol(SymbolID: Symbol['id'], VariableID: Variable['id']): Promise<number> {
  if (!hasSymbol(SymbolID)) return -1;
  if (!hasVariable(VariableID)) return -1;
  const thisSymbolObject = Symbols[SymbolID];
  const existingIndex = thisSymbolObject.variables.indexOf(VariableID);
  if (existingIndex === -1) {
    thisSymbolObject.variables.push(VariableID);
    Symbols[SymbolID] = thisSymbolObject;
    await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
    return thisSymbolObject.variables.length - 1;
  } else {
    return existingIndex;
  }
}

export async function removeVariableFromSymbol(SymbolID: Symbol['id'], VariableID: Variable['id']): Promise<boolean> {
  if (!hasSymbol(SymbolID)) return false;
  if (!hasVariable(VariableID)) return false;
  const thisSymbolObject = Symbols[SymbolID];
  const existingIndex = thisSymbolObject.variables.indexOf(VariableID);
  if (existingIndex === -1) {
    return false;
  } else {
    thisSymbolObject.variables.splice(existingIndex, 1);
    Symbols[SymbolID] = thisSymbolObject;
    await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
    await deleteVariable(VariableID);
    return true;
  }
}

export async function moveVariableInSymbol(SymbolID: Symbol['id'], VariableID: Variable['id'], offset: number): Promise<boolean> {
  if (!hasSymbol(SymbolID)) return false;
  if (!hasVariable(VariableID)) return false;
  const thisSymbolObject = Symbols[SymbolID];
  const existingIndex = thisSymbolObject.variables.indexOf(VariableID);
  if (existingIndex === -1) {
    return false;
  } else {
    thisSymbolObject.variables.splice(existingIndex, 1);
    thisSymbolObject.variables.splice(existingIndex + offset, 0, VariableID);
    Symbols[SymbolID] = thisSymbolObject;
    await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
    return true;
  }
}
