import Constants from 'shared/Constants';

export default {
  hasPalette: state => state.mainWin.paletteVisible,
  lastLogAction: state => (type) => {
    if (type === undefined) {
      type = Constants.TYPE_ALL;
    }
    if (state.logActions.length > 0) {
      return (type === Constants.TYPE_ALL) ?
        state.logActions[state.logActions.length - 1] :
        [...state.logActions].reverse().find(logAction => logAction.type === type);
    }
    return null;
  },
  /*
  isOnIde: state => !state.mainWin.headerVisible && !state.mainWin.footerVisible
      && !state.mainWin.paletteVisible,
  */
};
