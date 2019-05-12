import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import Comments from './Comments'
import NewComment from './NewComment'
import { EventEmitter } from 'events'

describe('<App />', () => {  
  it('renders without crashing', () => {
    const database = {
      ref : jest.fn()
    }

    database.ref.mockReturnValue({
      on : jest.fn()
    })

    const wrapper = shallow(<App database={database} />)
    expect(wrapper.find(Comments).length).toBe(1)
    expect(wrapper.find(NewComment).length).toBe(1)
    expect(wrapper.find('p').length).toBe(1)
  })


  it('add a new Comment', () => {
    
    const database = {
      ref : jest.fn()
    }

    const child = jest.fn()
    const update = jest.fn()
    database.ref.mockReturnValue({
      on : jest.fn(),
      child,
      update
    })

    const push = jest.fn()
    child.mockReturnValue({
      push
    })

    push.mockReturnValue({
      key : 1
    })

    const wrapper = shallow(<App database={database} />)
    wrapper.instance().sendComment('new comment')
    expect(child).toBeCalledWith('comments')
    expect(update).toBeCalledWith({
      'comments/1' : {
        comment: 'new comment'
      }
    })

  })


  it('received comments from firebase', () => {
      const database = {
        ref : jest.fn()
      }
      const eventEmitter = new EventEmitter()
      database.ref.mockReturnValue(eventEmitter)
  
      const wrapper = shallow(<App database={database} />)
      expect(wrapper.find(Comments).length).toBe(1)
      expect(wrapper.find(NewComment).length).toBe(1)
      expect(wrapper.find('p').length).toBe(1)

      //recebendo o value
      const comments = {
        a : {comment : 'comentario 1'},
        b : {comment : 'comentario 2'}
      }
      const val = jest.fn()
      val.mockReturnValue(comments)
      eventEmitter.emit('value', {
        val
      })

      //atualizando o componente
      wrapper.update()

      //testando o valor recebido
      expect(wrapper.state().isLoading).toBeFalsy()
      expect(wrapper.state().comments).toBe(comments)

      expect(wrapper.find(Comments).get(0).props.comments).toBe(comments)
      expect(wrapper.find('p').length).toBe(0)
      expect(wrapper.find(NewComment).get(0).props.sendComment).toBe(wrapper.instance().sendComment)

  })  

})


