export default {
  tree: state => state.tree,
  hasTree: state => state.tree.length > 0,
  saved: state => state.saved,
  hasSaved: state => state.saved.length > 0,
  // status: state => state.status,
  leafSelected: state => state.leafSelected,
  session: state => state.session,
};

