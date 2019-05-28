import { CUSTOM_EVENTS } from 'shared/Constants';
import { eventBus } from 'boot/initApp';
import { SelectAction, SelectCommand } from 'sprotty/lib';

const inversify = require('inversify');

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handle", "initialize"] }] */
class SelectActionHandler {
  handle(action) {
    if (action instanceof SelectAction) {
      eventBus.$emit(CUSTOM_EVENTS.GRAPH_NODE_SELECTED, action);
    }
  }
}
class SelectHandlerInitializer {
  initialize(registry) {
    registry.register(SelectCommand.KIND, new SelectActionHandler());
  }
}

inversify.decorate(inversify.injectable(), SelectHandlerInitializer);

// eslint-disable-next-line import/prefer-default-export
export { SelectHandlerInitializer };
