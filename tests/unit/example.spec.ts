import { shallowMount } from '@vue/test-utils'
import WelcomePage from '@/components/WelcomePage.vue'

describe('WelcomePage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(WelcomePage, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
