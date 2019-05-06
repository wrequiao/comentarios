import React from 'react'
import Comment from './Comment'
import { render } from 'enzyme'

const c = {
    comment: 'comentario de teste'
}

it('should render', () => {
    const wrapper = render(<Comment c={c} />)
    expect(wrapper.text()).toBe('comentario de teste')
})

it('should render empty', () => {
    const wrapper = render(<Comment />)
    expect(wrapper.text()).toBe('vazio')
})



