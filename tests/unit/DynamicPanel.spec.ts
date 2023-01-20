import { mount } from '@vue/test-utils'
import DynamicPanel from '@/components/DynamicPanel.vue'

describe('DynamicPanel.vue', () => {
  it.skip('displays line chart', () => {
    const wrapper = mount(DynamicPanel, {
      props: { data: [{ data: [10, 20, 30] }], xAxis: [1, 2, 3] },
    })
    expect(wrapper.html()).toBe('<>')
  })
})
