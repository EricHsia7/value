import { Component, NumberComponent, StringComponent, stringifyComponent } from './component';

export function evaluate(component: Component): Component | undefined {
  if (component.type === 'string') {
    return component;
  } else if (component.type === 'number') {
    switch (component.unit) {
      // percentage
      case '%': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number / 100,
          unit: ''
        };
        return result;
      }

      // angle
      case 'deg': {
        const result: NumberComponent = {
          type: 'number',
          number: (component.number * Math.PI) / 180,
          unit: ''
        };
        return result;
      }

      case 'rad': {
        return component;
      }

      // time
      case 'ms': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number,
          unit: ''
        };
        return result;
      }

      case 'sec': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number * 1000,
          unit: ''
        };
        return result;
      }

      case 'min': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number * 60 * 1000,
          unit: ''
        };
        return result;
      }

      case 'hr': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number * 60 * 60 * 1000,
          unit: ''
        };
        return result;
      }

      case 'day': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number * 24 * 60 * 60 * 1000,
          unit: ''
        };
        return result;
      }

      case 'week': {
        const result: NumberComponent = {
          type: 'number',
          number: component.number * 7 * 24 * 60 * 60 * 1000,
          unit: ''
        };
        return result;
      }

      case 'rad': {
        return component;
      }

      default:
        return component;
    }
  } else if (component.type === 'model') {
    for (let i = component.components.length - 1; i >= 0; i--) {
      const subComponent = component.components[i];
      const evaluated = evaluate(subComponent);
      if (evaluated !== undefined) {
        component.components.splice(i, 1, evaluated);
      } else {
        component.components.splice(i, 1); // TODO: Throw an error
      }
    }
    switch (component.model) {
      case 'add': {
        const [a, b] = component.components;
        if (a.type !== 'number' || b.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: a.number + b.number,
          unit: ''
        };
        return result;
      }

      case 'substract': {
        const [a, b] = component.components;
        if (a.type !== 'number' || b.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: a.number - b.number,
          unit: ''
        };
        return result;
      }

      case 'multiply': {
        const [a, b] = component.components;
        if (a.type !== 'number' || b.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: a.number * b.number,
          unit: ''
        };
        return result;
      }

      case 'divide': {
        const [a, b] = component.components;
        if (a.type !== 'number' || b.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: a.number / b.number,
          unit: ''
        };
        return result;
      }

      case 'mod': {
        const [a, b] = component.components;
        if (a.type !== 'number' || b.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: a.number % b.number,
          unit: ''
        };
        return result;
      }

      case 'sum': {
        if (component.components.some((e) => e.type !== 'number')) return undefined;

        let total = 0;
        for (let i = component.components.length - 1; i >= 0; i--) {
          const subComponent = component.components[i] as NumberComponent;
          total += subComponent.number;
        }
        const result: NumberComponent = {
          type: 'number',
          number: total,
          unit: ''
        };
        return result;
      }

      case 'sqrt': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.sqrt(a.number),
          unit: ''
        };
        return result;
      }

      case 'pow': {
        const [a, b] = component.components;
        if (a.type !== 'number' || b.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.pow(a.number, b.number),
          unit: ''
        };
        return result;
      }

      case 'sin': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.sin(a.number),
          unit: ''
        };
        return result;
      }

      case 'cos': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.cos(a.number),
          unit: ''
        };
        return result;
      }

      case 'tan': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.tan(a.number),
          unit: ''
        };
        return result;
      }

      case 'log': {
        const [a, b] = component.components;
        if (a.type !== 'number') return undefined;
        if (b !== undefined && b.type === 'number') {
          const result: NumberComponent = {
            type: 'number',
            number: Math.log(a.number) / Math.log(b.number),
            unit: ''
          };
          return result;
        } else {
          const result: NumberComponent = {
            type: 'number',
            number: Math.log(a.number),
            unit: ''
          };
          return result;
        }
      }

      case 'floor': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.floor(a.number),
          unit: ''
        };
        return result;
      }

      case 'ceil': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.ceil(a.number),
          unit: ''
        };
        return result;
      }

      case 'round': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.round(a.number),
          unit: ''
        };
        return result;
      }

      case 'abs': {
        const [a] = component.components;
        if (a.type !== 'number') return undefined;

        const result: NumberComponent = {
          type: 'number',
          number: Math.abs(a.number),
          unit: ''
        };
        return result;
      }

      case 'pi': {
        const result: NumberComponent = {
          type: 'number',
          number: Math.PI,
          unit: ''
        };
        return result;
      }

      case 'var': {
        // TODO: resolve variables
        break;
      }

      case 'now': {
        const result: NumberComponent = {
          type: 'number',
          number: new Date().getTime(),
          unit: ''
        };
        return result;
        break;
      }

      case 'dateString': {
        const [miliseconds, format] = component.components;
        if (miliseconds.type !== 'number') return undefined;

        const date = new Date(miliseconds.number);

        if (format !== undefined && format.type === 'string') {
          const string = format.string
            .replaceAll(/Y{2,}/g, date.getFullYear().toString())
            .replaceAll(/M{2}/g, (date.getMonth() + 1).toString().padStart(2, '0'))
            .replaceAll(/M{1}/g, (date.getMonth() + 1).toString())
            .replaceAll(/D{2}/g, date.getDate().toString().padStart(2, '0'))
            .replaceAll(/D{1}/g, date.getDate().toString())
            .replaceAll(/h{2}/g, date.getHours().toString().padStart(2, '0'))
            .replaceAll(/h{1}/g, date.getHours().toString())
            .replaceAll(/m{2}/g, date.getMinutes().toString().padStart(2, '0'))
            .replaceAll(/m{1}/g, date.getMinutes().toString())
            .replaceAll(/s{3}/g, date.getMilliseconds().toString())
            .replaceAll(/s{2}/g, date.getSeconds().toString().padStart(2, '0'))
            .replaceAll(/s{1}/g, date.getSeconds().toString());

          const result: StringComponent = {
            type: 'string',
            string: string
          };
          return result;
        }
      }

      case 'template': {
        const arr: Array<string> = [];
        for (let i = component.components.length - 1; i >= 0; i--) {
          const subComponent = component.components[i];
          arr.unshift(stringifyComponent(subComponent));
        }
        const result: StringComponent = {
          type: 'string',
          string: arr.join(' ')
        };
        return result;
      }

      default:
        return undefined;
        break;
    }
  }
}
