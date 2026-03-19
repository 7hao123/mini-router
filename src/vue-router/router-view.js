import { computed, h, inject, provide } from "vue";

export const RouterView = {
  name: "RouterView",
  setup() {
    const currentLocation = inject("location");
    const depth = inject("depth", 0);

    provide("depth", depth + 1);

    const matchedComputed = computed(() => currentLocation.matched[depth]);

    return () => {
      const matchedRecord = matchedComputed.value;

      if (!matchedRecord) {
        return null;
      }

      const component = matchedRecord.components.default;
      return h(component);
    };
  },
};
