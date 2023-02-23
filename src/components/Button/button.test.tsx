import React, { ButtonHTMLAttributes } from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const linkProps: ButtonProps = {
    btnType: ButtonType.Link,
    href: 'https://www.baidu.com/'
}

const DisabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button { ...defaultProps }>Good</Button>)
        const elem = wrapper.getByText('Good') as HTMLButtonElement
        // elem True
        expect(elem).toBeInTheDocument()
        // tagName === 'BUTTON'
        expect(elem.tagName).toEqual('BUTTON')
        // NOT disabled
        expect(elem.disabled).toBeFalsy()
        // className include target classes
        expect(elem).toHaveClass('btn btn-default')
        // onClick have been called
        fireEvent.click(elem)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button { ...testProps }>Good</Button>)
        const elem = wrapper.getByText('Good')
        // elem True
        expect(elem).toBeInTheDocument()
        // className include target classes
        expect(elem).toHaveClass( ...[ 'btn-primary', 'btn-lg', 'klass' ] )
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button { ...linkProps }>Link</Button>)
        const elem = wrapper.getByText('Link')
        // elem True
        expect(elem).toBeInTheDocument()
        // tagName === 'BUTTON'
        expect(elem.tagName).toEqual('A')
        // className include target classes
        expect(elem).toHaveClass( ...[ 'btn-link' ] )
    })
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button { ...DisabledProps }>Disabled</Button>)
        const elem = wrapper.getByText('Disabled') as HTMLButtonElement
        // elem True
        expect(elem).toBeInTheDocument()
        // tagName === 'BUTTON'
        expect(elem.tagName).toEqual('BUTTON')
        // NOT disabled
        expect(elem.disabled).toBeTruthy()
        // className include target classes
        expect(elem).toHaveClass( ...[ 'disabled' ] )
        // onClick NOT have been called
        fireEvent.click(elem)
        expect(defaultProps.onClick).not.toBeCalled()
    })
})