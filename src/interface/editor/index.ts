import { documentQuerySelector } from '../../lib/selector';

const editorField = documentQuerySelector('.css_editor_field');

export function openEditorField(symbolID: string): void {
  editorField.setAttribute('displayed', 'true');
}

export function closeEditorField(): void {
  editorField.setAttribute('displayed', 'false');
}
