import { shallowMount } from '@vue/test-utils'
import LineChart from '@/components/LineChart.vue'

describe('LineChart.vue', () => {
  it('displays line chart', () => {
    const wrapper = shallowMount(LineChart, {
      props: { data: [{ data: [10, 20, 30] }], xAxis: [1, 2, 3] },
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })
})
