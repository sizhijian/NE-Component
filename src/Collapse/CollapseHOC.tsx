/**
 * Created by kisnows on 2017/9/4.
 */

import React, { Component } from 'react'
import getDisplayName from '../_utils/getComponentName'

export interface WrapPropTypes {
  onChange: (id: WrapPropTypes['id'], nextStatus: boolean) => void;
  id: number | string;
  isActive: boolean;
}

export default function (options?: object) {
  return function (WrapComponent): object {
    class HOC extends Component<WrapPropTypes, any> {

      static displayName = `HOC(${getDisplayName(WrapComponent)})`

      static defaultProps = {
        isActive: false,
        ...options
      }
      handleClick = () => {
        this.toggle()
      }
      toggle = (isActive?: boolean) => {
        const id = this.props.id
        const nextStatus = isActive || !this.state.isActive
        this.props.onChange(id, nextStatus)
        this.setState({
          isActive: nextStatus
        })
      }

      constructor (props) {
        super(props)
        this.state = {
          isActive: this.props.isActive || false
        }
      }

      componentWillReceiveProps (nextProps: WrapPropTypes) {
        if (nextProps.isActive !== this.state.isActive) {
          this.setState({
            isActive: nextProps.isActive
          })
        }
      }

      render () {
        return (
          <WrapComponent onClick={this.handleClick} isActive={this.state.isActive}  {...this.props} />
        )
      }
    }

    return HOC
  }
}
