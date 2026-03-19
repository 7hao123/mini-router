import { h, inject } from "vue";

export const RouterLink = {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const router = inject("router");

    function navigate(event) {
      event.preventDefault();
      router.push(props.to);
    }
    // 接收一个props是to,改造成a标签，阻止浏览器默认跳转
    return () =>
      h(
        "a",
        {
          href: props.to,
          onClick: navigate,
        },
        slots.default?.(),
      );
  },
};
