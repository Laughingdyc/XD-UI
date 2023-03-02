import React, { FunctionComponentElement, useContext } from "react"
import classNames from 'classnames'
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem"

export interface SubMenuProps {
    index    ?: number
    title     : string
    className?: string
    children  : React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (Props) => {
    const { 
        index,
        title,
        className,
        children
    } = Props

    const context = useContext(MenuContext)

    const classes = classNames('XD-menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const renderChildren = () => {
        const childrenComponent = React.Children.map( children, ( child, i ) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if ( childElement.type.displayName === 'MenuItem' ) {
                return childElement
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className="XD-submenu">{childrenComponent}</ul>
        )
    }

    return (
        <li key={index} className={classes}>
            <div className="submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu