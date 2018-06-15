export default {
  /**
   * The observations tree
   */
  tree: state => state.tree,

  /**
   * The actual checked leaf in tree
   * TODO: change to implement checkbox
   */
  leafSelected: state => state.leafSelected,

  /**
   * If no context, return null
   */
  hasContext: state => state.context !== null,

  contextLabel: (state) => {
    if (state.context !== null) {
      return state.context.label;
    }
    return null;
  },

  fullContext: state => state.context,

  /**
   * Created viewers
   */
  viewerLayout: state => state.viewerLayout,

  /**
   * The unique viewer with main: true
   */
  mainViewer: state => state.viewerLayout
    .find(viewer => viewer.main),

  /* now is not useful, but in the future?
  thumbViewers: state => state.viewerLayout
    .filter(viewer => !viewer.main),
  */

  /**
   * The session, very important accessing it using getter
   */
  session: state => state.session,

  lastViewerId: state => state.lastViewerId,
};

