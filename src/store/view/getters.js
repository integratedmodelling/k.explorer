export default {
  hasPalette: state => state.mainWin.paletteVisible,
  isOnIde: state => !state.mainWin.headerVisible && !state.mainWin.footerVisible
      && !state.mainWin.paletteVisible,
};
