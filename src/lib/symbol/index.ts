import { ModelComponent } from '../component/component';

export interface Symbol {
  type: 'symbol';
  name: string;
  description: string;
  variables: Array<SymbolVariable['id']>;
  id: string;
}

export interface SymbolVariable {
  type: 'variable';
  name: string;
  template: ModelComponent<'template'>;
  id: string;
}
