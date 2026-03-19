## 路由的模式
- 前端路由的特点是根据不同的url，渲染不同的组件
- hash(#) history(HTML5)
- hash无法做ssr,history可以做ssr (hash是前端的锚点，不会发送给后端)  history会向后端发送请求的（所以要后端配置，可以做seo优化）

- hash页面不会出现404  缺点丑，无法seo,优点兼容性好，监听hashChange


- history
- history.pushState(state, title, url);
- 优点：好看，用起来方便，js直接操作路由
- 刷新的话会向后端发请求，如果后端没有配置，会404
虽然用户访问的可能是 www.baidu.com/about -> 返回的还是首页的内容（找到/about渲染）



- hash模式如何实现路由的跳转和监控   window.location.hash   window.onhashChange
- history如何实现路由的监控和跳转 history.pushState  history.replaceState  history.popState()
- window.addEventListener('popstate',()=>console.log(location.pathname))
- 由于history的监听也能监听到hash变化，所以router底层都用history api


- 封装路由的时候要使用location和history
- location 包含的是当前路由的信息，比如pathname,href,hash,search等等
- history 则包含着历史信息,但是信息很少，所以我们要手动去封装这个state