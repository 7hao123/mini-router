function createCurrentLocation(base) {
  const { pathname, search, hash } = window.location;

  if (base.includes("#")) {
    // 取的是hash路径
    return hash.slice(1) || "/";
  }

  return pathname + search + hash;
}

function buildState(
  back,
  current,
  forward,
  replaced = false,
  scroll = null,
  position = window.history.length - 1,
) {
  return {
    back,
    current,
    forward,
    replaced,
    scroll,
    position,
  };
}

function useHistoryStateNavigation(base) {
  const { history } = window;
  const currentLocation = {
    value: createCurrentLocation(base),
  };
  const historyState = {
    value: history.state,
  };

  function changeLocation(to, state, replace = false) {
    const url = base.includes("#") ? `${base}${to}` : to;

    // 修改路由地址和historyState
    history[replace ? "replaceState" : "pushState"](state, "", url);
    currentLocation.value = to;
    historyState.value = state;
  }

  if (!historyState.value) {
    const initialState = buildState(
      null,
      currentLocation.value,
      null,
      true,
      null,
      history.length - 1,
    );

    changeLocation(currentLocation.value, initialState, true);
  } else if (historyState.value.current) {
    currentLocation.value = historyState.value.current;
  }

  function push(to, data = {}) {
    const fromState = historyState.value;
    const currentState = {
      ...fromState,
      forward: to,
      scroll: {
        x: window.pageXOffset,
        y: window.pageYOffset,
      },
    };

    // 先修改旧的路由state,否则会不知道forward是谁
    changeLocation(fromState.current, currentState, true);

    const nextState = {
      ...data,
      ...buildState(
        fromState.current,
        to,
        null,
        false,
        null,
        fromState.position + 1,
      ),
    };

    changeLocation(to, nextState);
  }

  function replace(to, data = {}) {
    const fromState = historyState.value;
    const nextState = {
      ...data,
      ...buildState(
        fromState.back,
        to,
        fromState.forward,
        true,
        fromState.scroll ?? null,
        fromState.position,
      ),
    };

    changeLocation(to, nextState, true);
  }

  return {
    location: currentLocation,
    state: historyState,
    push,
    replace,
  };
}

// 监听浏览器的前进和后退，并且把变化通知给路由系统
// 用户如果手动操作浏览器前进和后退，会触发popstate，来通知路由系统
function useHistoryListeners({ location, state: historyState }, base) {
  const listeners = [];

  // 发布订阅者模式，有人来订阅了，就放到队列里面，路由发生变化，把所有都执行
  function listen(callback) {
    listeners.push(callback);

    // 这一步是取消监听的
    return function unlisten() {
      const index = listeners.indexOf(callback);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  window.addEventListener("popstate", ({ state }) => {
    const to = createCurrentLocation(base);
    const from = location.value;
    const fromState = historyState.value;
    const nextState =
      state ??
      buildState(
        null,
        to,
        null,
        true,
        null,
        fromState ? fromState.position : window.history.length - 1,
      );
    const delta = fromState ? nextState.position - fromState.position : 0;

    location.value = to;
    historyState.value = nextState;

    listeners.forEach((callback) =>
      callback(to, from, {
        delta,
        type: "pop",
        direction: delta === 0 ? "" : delta > 0 ? "forward" : "back",
      }),
    );
  });

  return {
    listen,
  };
}

export function createWebHistory(base = "") {
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(historyNavigation, base);

  return {
    ...historyNavigation,
    ...historyListeners,
  };
}

export function createWebHashHistory() {
  return createWebHistory("#");
}
