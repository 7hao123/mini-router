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
