export default {
  tree: state => state.tree,
  hasTree: state => state.tree.length > 0,
  viewerLayout: state => state.viewerLayout,
  mainViewerId: state => state.viewerLayout
    .filter(viewer => viewer.x === 0 && viewer.y === 0)[0].index,
  // status: state => state.status,
  leafSelected: state => state.leafSelected,
  session: state => state.session,
};

