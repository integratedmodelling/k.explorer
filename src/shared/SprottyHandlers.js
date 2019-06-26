import { CUSTOM_EVENTS } from 'shared/Constants';
import { eventBus } from 'plugins/initApp';
import { SelectCommand, ViewportCommand } from 'sprotty/lib';

const inversify = require('inversify');

let timer = 0;
const delay = 200;
let prevent = false;

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handle", "initialize"] }] */
class KlabActionHandler {
  handle(action) {
    switch (action.kind) {
      case SelectCommand.KIND:
        prevent = false;
        timer = setTimeout(() => {
          if (!prevent) {
            eventBus.$emit(CUSTOM_EVENTS.GRAPH_NODE_SELECTED, action);
          }
          prevent = false;
        }, delay);
        break;
      case ViewportCommand.KIND:
        clearTimeout(timer);
        prevent = true;
        break;
      default:
        console.warn(`Unknow action: ${action.kind}`);
        break;
    }
  }

  initialize(registry) {
    registry.register(SelectCommand.KIND, this);
    registry.register(ViewportCommand.KIND, this);
  }
}

inversify.decorate(inversify.injectable(), KlabActionHandler);

// eslint-disable-next-line import/prefer-default-export
export { KlabActionHandler };
