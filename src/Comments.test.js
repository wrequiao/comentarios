import React from 'react'
import {shallow} from 'enzyme'
import Comments from './comments'
import Comment from './Comment'

describe('<Comments />', () =>{
    it('should render Comments', () => {
        const comments = [
            {id: 'a', comment: 'Comment 1'},
            {id: 'b', comment: 'Comment 2'},
            {id: 'c', comment: 'Comment 3'}
        ]
 
        const wrapper = shallow(<Comments comments = {comments} />)
        expect(wrapper.find(Comment).length).toBe(3)
    })
})