import { computed, reactive, shallowRef } from "vue";
import { RouterLink } from "./router-link";
import { RouterView } from "./router-view";

const START_LOCATION = {
  path: "/",
  matched: [],
};

export function createRouter(options) {
  const { history, routes } = options;
  const matcher = createRouterMatcher(routes);
  const currentLocation = shallowRef(START_LOCATION);
  let ready;

  function getTargetPath(to) {
    if (typeof to === "string") {
      return to;
    }

    if (to && typeof to === "object") {
      if ("path" in to) {
        return to.path;
      }

      if ("value" in to) {
        return to.value;
      }
    }

    return "/";
  }

  function markReady() {
    if (ready) {
      return;
    }
    ready = true;

    history.listen((to, from) => {
      to = matcher.resolve(getTargetPath(to));
      from = currentLocation.value;
      currentLocation.value = to;
    });
  }

  function finalNavigation(to, from) {
    if (from === START_LOCATION) {
      history.replace(to.path);
    } else {
      history.push(to.path);
    }
    currentLocation.value = to;
    markReady();
  }

  function pushWithRedirect(to) {
    const from = currentLocation.value;
    to = matcher.resolve(getTargetPath(to));

    // 路由跳转 + 监听
    finalNavigation(to, from);
  }

  function push(to) {
    return pushWithRedirect(to);
  }

  if (currentLocation.value === START_LOCATION) {
    // 说明这是第一次加载路由
    push(history.location);
  }

  const router = {
    push,
    install(app) {
      const reactiveObj = {};
      for (const key in START_LOCATION) {
        reactiveObj[key] = computed(() => currentLocation.value[key]);
      }

      // 注册两个组件
      app.provide("router", router);
      app.provide("location", reactive(reactiveObj));
      app.component("router-link", RouterLink);
      app.component("router-view", RouterView);
      // 让所有的子组件都可以获取到路由
    },
  };

  return router;
}

function normalize(record) {
  return {
    path: record.path,
    name: record.name,
    meta: record.meta || {},
    components: {
      default: record.component,
    },
    children: record.children || [],
    beforeEnter: record.beforeEnter,
  };
}

function createMatch(record, parent) {
  const matcher = {
    path: record.path,
    record,
    parent,
    children: [],
  };

  if (parent) {
    parent.children.push(matcher);
  }

  return matcher;
}

function joinPaths(parentPath, childPath) {
  if (childPath.startsWith("/")) {
    return childPath;
  }

  if (parentPath === "/") {
    return `/${childPath}`;
  }

  return `${parentPath}/${childPath}`;
}

function createRouterMatcher(routes) {
  const matchers = [];

  function addRoute(record, parent) {
    const normalizedRecord = normalize(record);

    if (parent) {
      normalizedRecord.path = joinPaths(parent.path, normalizedRecord.path);
    }

    const matcher = createMatch(normalizedRecord, parent);
    matchers.push(matcher);

    if (normalizedRecord.children.length > 0) {
      normalizedRecord.children.forEach((child) => addRoute(child, matcher));
    }
  }

  // 解析路径
  function resolve(to) {
    const matched = [];
    let matcher = matchers.find((item) => item.path === to);

    while (matcher) {
      matched.unshift(matcher.record);
      matcher = matcher.parent;
    }

    return {
      path: to,
      matched,
    };
  }

  routes.forEach((route) => addRoute(route));

  return {
    addRoute,
    resolve,
  };
}
