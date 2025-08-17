import { MaterialSymbols } from '../../interface/icons/material-symbols-type';
import { Component, stringifyComponent } from '../component/component';
import { evaluateComponent } from '../component/evaluate';
import { lfGetItem, lfListItemKeys, lfRemoveItem, lfSetItem } from '../storage/index';
import { generateIdentifier } from '../tools/generate-identifier';
import { deleteVariable, getVariable, hasVariable, Variable } from '../variable/index';

export interface Symbol {
  type: 'symbol';
  name: string;
  description: string;
  icon: MaterialSymbols;
  variables: Array<Variable['id']>;
  output: Variable['id'];
  id: string;
}

export interface EvaluatedSymbol {
  type: 'evaluated-symbol';
  name: string;
  description: string;
  icon: MaterialSymbols;
  value: string;
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

export async function createSymbol(name: Symbol['name'] = 'Unnamed Symbol'): Promise<Symbol['id']> {
  const SymbolID = generateIdentifier();
  const object: Symbol = {
    type: 'symbol',
    name: name,
    description: '',
    icon: 'glyphs',
    variables: [],
    output: '',
    id: SymbolID
  };

  Symbols[SymbolID] = object;

  await lfSetItem(0, SymbolID, JSON.stringify(object));

  return SymbolID;
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

export async function setSymbolName(SymbolID: Symbol['id'], name: Symbol['name']): Promise<boolean> {
  if (!hasSymbol(SymbolID)) return false;
  const thisSymbolObject = Symbols[SymbolID];
  thisSymbolObject.name = name;
  Symbols[SymbolID] = thisSymbolObject;
  await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
  return true;
}

export async function setSymbolDescription(SymbolID: Symbol['id'], description: Symbol['description']): Promise<boolean> {
  if (!hasSymbol(SymbolID)) return false;
  const thisSymbolObject = Symbols[SymbolID];
  thisSymbolObject.description = description;
  Symbols[SymbolID] = thisSymbolObject;
  await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
  return true;
}

export async function setSymbolIcon(SymbolID: Symbol['id'], icon: Symbol['icon']): Promise<boolean> {
  if (!hasSymbol(SymbolID)) return false;
  // TODO: validate icon
  const thisSymbolObject = Symbols[SymbolID];
  thisSymbolObject.icon = icon;
  Symbols[SymbolID] = thisSymbolObject;
  await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
  return true;
}

export async function setSymbolOutput(SymbolID: Symbol['id'], output: Symbol['output']): Promise<boolean> {
  if (!hasSymbol(SymbolID)) return false;
  const thisSymbolObject = Symbols[SymbolID];
  thisSymbolObject.output = output;
  Symbols[SymbolID] = thisSymbolObject;
  await lfSetItem(0, SymbolID, JSON.stringify(thisSymbolObject));
  return true;
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

export async function evaluateSymbol(thisSymbol: Symbol): EvaluatedSymbol {
  const fallback: EvaluatedSymbol = {
    type: 'evaluated-symbol',
    name: thisSymbol.name,
    description: thisSymbol.description,
    icon: thisSymbol.icon,
    value: 'undefined',
    id: thisSymbol.id
  };

  const outputVariableID = thisSymbol.output;
  const outputVariable = getVariable(outputVariableID);
  if (outputVariable === undefined) return fallback;

  const evaluatedVariables: { [VariableName: Variable['name']]: Component } = {};
  const variableIDs = thisSymbol.variables;
  for (const variableID of variableIDs) {
    const thisVariable = getVariable(variableID);
    if (thisVariable === undefined) continue;
    if (thisVariable?.template === undefined) continue;
    const evaluatedVariableValue = evaluateComponent(thisVariable.template, evaluatedVariables);
    if (evaluatedVariableValue === undefined) continue;
    evaluatedVariables[thisVariable.name] = evaluatedVariableValue;
  }

  if (!evaluatedVariables.hasOwnProperty(outputVariable.name)) return fallback;

  return {
    type: 'evaluated-symbol',
    name: thisSymbol.name,
    description: thisSymbol.description,
    icon: thisSymbol.icon,
    value: stringifyComponent(evaluatedVariables[outputVariable.name]),
    id: thisSymbol.id
  };
}

export function listSymbols(): Array<Symbol> {
  const result: Array<Symbol> = [];

  for (const key in Symbols) {
    const thisSymbol = Symbols[key];
    result.push({
      type: 'symbol',
      name: thisSymbol.name,
      description: thisSymbol.description,
      variables: thisSymbol.variables,
      output: thisSymbol.output,
      id: thisSymbol.id
    });
  }

  return result;
}

export function listEvaluatedSymbols(): Array<EvaluatedSymbol> {
  const result: Array<EvaluatedSymbol> = [];
  for (const key in Symbols) {
    const thisSymbol = Symbols[key];
    result.push(evaluateSymbol(thisSymbol));
  }

  return result;
}
