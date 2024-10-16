import { shallowMount } from "@vue/test-utils";
import WindDirection from "../WindDirection.vue";

describe("WindDirection", () => {
  it("renders without crashing", (): void => {
    const wrapper = shallowMount(WindDirection, {
      props: {
        speed: 90,
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("renders the component with the correct computed styles", (): void => {
    const wrapper = shallowMount(WindDirection, {
      props: {
        speed: 100,
      },
    });
    const direction = wrapper.find(
      "[data-testid=winddescription-computedstyles]"
    );
    expect(direction.attributes("style")).toContain(
      "background-color: rgb(255, 99, 71); color: white;"
    );
  });
});
