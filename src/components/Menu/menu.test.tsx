import React from "react";
import { fireEvent, render, RenderResult, cleanup, waitFor } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

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
            <SubMenu title="dropdown">
                <MenuItem>dropdown-1</MenuItem>
                <MenuItem>dropdown-2</MenuItem>
            </SubMenu>
        </Menu>
    )
}

let wrapper        : RenderResult
let menuElement    : HTMLElement
let activeElement  : HTMLElement
let disabledElement: HTMLElement

const createStyleFile = () => {
    const cssFile: string = `
        .XD-submenu{
            display: none;
        }
        .XD-submenu.menu-opened{
            display: block;
        }
    `
    const style = document.createElement('style')
    style.innerHTML = cssFile
    return style
}

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper         = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement     = wrapper.getByTestId('XD-menu')
        activeElement   = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem base on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass( ...[ 'XD-menu', 'testClass' ] )
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
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
        expect(menuElement).toHaveClass( ...[ 'menu-vertical' ] )
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('dropdown-1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('dropdown-1')).toBeVisible()
        })
        fireEvent.click(dropdownElement)
        expect(wrapper.queryByText('dropdown-1')).toBeVisible()
        fireEvent.click(wrapper.getByText('dropdown-1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    })
})