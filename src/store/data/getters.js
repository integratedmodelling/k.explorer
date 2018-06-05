export default {
  tree: state => state.tree,
  hasTree: state => state.tree.length > 0,
  viewerLayout: state => state.viewerLayout,
  mainViewer: state => state.viewerLayout
    .find(viewer => viewer.main),
  thumbViewers: state => state.viewerLayout
    .filter(viewer => !viewer.main),
  // status: state => state.status,
  leafSelected: state => state.leafSelected,
  session: state => state.session,
};

