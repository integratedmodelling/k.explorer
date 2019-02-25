/**
 * Code from https://github.com/IsraelZablianov/draggable-vue-directive
 * Change the compiled typescript to ha
 */
/* eslint-disable */
var ChangePositionType;
(function (ChangePositionType) {
  ChangePositionType[ChangePositionType["Start"] = 1] = "Start";
  ChangePositionType[ChangePositionType["End"] = 2] = "End";
  ChangePositionType[ChangePositionType["Move"] = 3] = "Move";
})(ChangePositionType || (ChangePositionType = {}));

function extractHandle(handle) {
  return handle && (handle.$el || handle);
}
function getPosWithBoundaries(elementRect, boundingRect, left, top, boundingRectMargin) {
  if (boundingRectMargin === void 0) { boundingRectMargin = {}; }
  const adjustedPos = { left: left, top: top };
  const height = elementRect.height, width = elementRect.width;
  const topRect = top, bottomRect = top + height, leftRect = left, rightRect = left + width;
  const marginTop = boundingRectMargin.top || 0, marginBottom = boundingRectMargin.bottom || 0, marginLeft = boundingRectMargin.left || 0, marginRight = boundingRectMargin.right || 0;
  const topBoundary = boundingRect.top + marginTop, bottomBoundary = boundingRect.bottom - marginBottom, leftBoundary = boundingRect.left + marginLeft, rightBoundary = boundingRect.right - marginRight;
  if (topRect < topBoundary) {
    adjustedPos.top = topBoundary;
  }
  else if (bottomRect > bottomBoundary) {
    adjustedPos.top = bottomBoundary - height;
  }
  if (leftRect < leftBoundary) {
    adjustedPos.left = leftBoundary;
  }
  else if (rightRect > rightBoundary) {
    adjustedPos.left = rightBoundary - width;
  }
  return adjustedPos;
}
// eslint-disable-next-line import/prefer-default-export
export const Draggable = {
  bind: function (el, binding, vnode, oldVnode) {
    Draggable.update(el, binding, vnode, oldVnode);
  },
  update: function (el, binding, vnode, oldVnode) {
    if (binding.value && binding.value.stopDragging) {
      return;
    }
    var handler = (binding.value && binding.value.handle && extractHandle(binding.value.handle)) || el;
    if (binding && binding.value && binding.value.resetInitialPos) {
      initializeState();
      handlePositionChanged();
    }
    if (!handler.getAttribute("draggable")) {
      el.removeEventListener("touchstart", el.listener);
      el.removeEventListener("mousedown", el.listener);
      handler.addEventListener("mousedown", eventDown);
      handler.addEventListener("touchstart", eventDown, { passive: false });
      handler.setAttribute("draggable", "true");
      el.listener = eventDown;
      initializeState();
      handlePositionChanged();
    }
    function getBoundingRect() {
      if (!binding.value) {
        return;
      }
      return binding.value.boundingRect
        || binding.value.boundingElement
        && binding.value.boundingElement.getBoundingClientRect();
    }
    function updateElementStyle() {
      var state = getState();
      if (!state.currentDragPosition) {
        return;
      }
      el.style.position = "fixed";
      el.style.left = state.currentDragPosition.left + "px";
      el.style.top = state.currentDragPosition.top + "px";
    }
    function transformTouchEvent(event) {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
      return event;
    }
    function eventDown(event) {
      if (event instanceof TouchEvent) {
        if (event.targetTouches.length < binding.value.fingers)
          return;
        transformTouchEvent(event);
      }
      setState({ intialPos: getInitialPosition(event) });
      handlePositionChanged(event, ChangePositionType.Start);
      document.addEventListener("touchmove", eventMove, { passive: false });
      document.addEventListener("mousemove", eventMove);
      document.addEventListener("touchend", eventUp, { passive: false });
      document.addEventListener("mouseup", eventUp);
    }
    function eventMove(event) {
      event.preventDefault();
      if (event instanceof TouchEvent) {
        transformTouchEvent(event);
      }
      var stopDragging = binding.value && binding.value.stopDragging;
      if (stopDragging) {
        return;
      }
      var state = getState();
      if (!state.startDragPosition || !state.intialPos) {
        initializeState(event);
        state = getState();
      }
      var dx = event.clientX - state.intialPos.left;
      var dy = event.clientY - state.intialPos.top;
      var currentDragPosition = {
        left: state.startDragPosition.left + dx,
        top: state.startDragPosition.top + dy
      };
      var boundingRect = getBoundingRect();
      var elementRect = el.getBoundingClientRect();
      if (boundingRect && elementRect) {
        currentDragPosition = getPosWithBoundaries(elementRect, boundingRect, currentDragPosition.left, currentDragPosition.top, binding.value.boundingRectMargin);
      }
      setState({ currentDragPosition: currentDragPosition });
      updateElementStyle();
      handlePositionChanged(event);
    }
    function eventUp(event) {
      event.preventDefault();
      var currentRectPosition = getRectPosition();
      setState({
        intialPos: undefined,
        startDragPosition: currentRectPosition,
        currentDragPosition: currentRectPosition
      });
      document.removeEventListener("mousemove", eventMove);
      document.removeEventListener("touchmove", eventMove);
      document.removeEventListener("mouseup", eventUp);
      document.removeEventListener("touchend", eventUp);
      handlePositionChanged(event, ChangePositionType.End);
    }
    function getInitialPosition(event) {
      return event && {
        left: event.clientX,
        top: event.clientY
      };
    }
    function getRectPosition() {
      var clientRect = el.getBoundingClientRect();
      if (!clientRect.height || !clientRect.width) {
        return;
      }
      return { left: clientRect.left, top: clientRect.top };
    }
    function initializeState(event) {
      var state = getState();
      var initialRectPositionFromBinding = binding && binding.value && binding.value.initialPosition;
      var initialRectPositionFromState = state.initialPosition;
      var startingDragPosition = getRectPosition();
      var initialPosition = initialRectPositionFromBinding || initialRectPositionFromState || startingDragPosition;
      if (!(binding && binding.value && binding.value.fingers)){
        binding.value.fingers = 2
      }
      setState({
        initialPosition: initialPosition,
        startDragPosition: initialPosition,
        currentDragPosition: initialPosition,
        intialPos: getInitialPosition(event)
      });
      updateElementStyle();
    }
    function setState(partialState) {
      var prevState = getState();
      var state = Object.assign({}, prevState, partialState);
      handler.setAttribute("draggable-state", JSON.stringify(state));
    }
    function handlePositionChanged(event, changePositionType) {
      var state = getState();
      var posDiff = { x: 0, y: 0 };
      if (state.currentDragPosition && state.startDragPosition) {
        posDiff.x = state.currentDragPosition.left - state.startDragPosition.left;
        posDiff.y = state.currentDragPosition.top - state.startDragPosition.top;
      }
      var currentPosition = state.currentDragPosition && Object.assign({}, state.currentDragPosition);
      if (changePositionType === ChangePositionType.End) {
        binding.value && binding.value.onDragEnd && state && binding.value.onDragEnd(posDiff, currentPosition, event);
      }
      else if (changePositionType === ChangePositionType.Start) {
        binding.value && binding.value.onDragStart && state && binding.value.onDragStart(posDiff, currentPosition, event);
      }
      else {
        binding.value && binding.value.onPositionChange && state && binding.value.onPositionChange(posDiff, currentPosition, event);
      }
    }
    function getState() {
      return JSON.parse(handler.getAttribute("draggable-state")) || {};
    }
  }
};


