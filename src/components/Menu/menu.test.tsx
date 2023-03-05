import React from "react";
import { fireEvent, render, RenderResult, cleanup } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
    onSelect: jest.fn(),
    className: 'testClass'
}

const testVerProps: MenuProps = {
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu { ...props }>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                default
            </MenuItem>
        </Menu>
    )
}

let wrapper        : RenderResult
let menuElement    : HTMLElement
let activeElement  : HTMLElement
let disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper         = render(generateMenu(testProps))
        menuElement     = wrapper.getByTestId('XD-menu')
        activeElement   = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem base on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass( ...[ 'XD-menu', 'testClass' ] )
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass( ...[ 'XD-menu-item', 'is-active' ] )
        expect(disabledElement).toHaveClass( ...[ 'XD-menu-item', 'is-disabled' ] )
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('default')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass( ...[ 'is-active' ] )
        expect(activeElement).not.toHaveClass( ...[ 'is-active' ] )
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass( ...[ 'is-active' ] )
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper: RenderResult = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('XD-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
})