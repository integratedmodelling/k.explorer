import { CUSTOM_EVENTS } from 'shared/Constants';
import { eventBus } from 'plugins/initApp';
import { SelectCommand, MoveCommand } from 'sprotty/lib';

const inversify = require('inversify');


/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handle", "initialize"] }] */
class KlabActionHandler {
  handle(action) {
    switch (action.kind) {
      case SelectCommand.KIND:
        eventBus.$emit(CUSTOM_EVENTS.GRAPH_NODE_SELECTED, action);
        break;
      case MoveCommand.KIND:
        console.warn(`MOVE -> ${JSON.stringify(action, null, 4)}`);
        break;
      default:
        console.warn(`Unknow action: ${action.kind}`);
        break;
    }
  }

  initialize(registry) {
    registry.register(SelectCommand.KIND, this);
    registry.register(MoveCommand.KIND, this);
  }
}

inversify.decorate(inversify.injectable(), KlabActionHandler);

// eslint-disable-next-line import/prefer-default-export
export { KlabActionHandler };
