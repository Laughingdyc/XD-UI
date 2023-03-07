import React, { FunctionComponentElement, useContext, useState } from "react"
import classNames from 'classnames'
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem"

export interface SubMenuProps {
    index    ?: string
    title     : string
    className?: string
    disabled ?: boolean
    children  : React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (Props) => {
    const { 
        index,
        title,
        className,
        disabled,
        children
    } = Props

    // 是否自动展开垂直的submenu
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false

    // 控制下拉框的显示
    const [ menuOpen, setMenuOpen ] = useState(isOpened)

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen( !menuOpen )
    }

    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()

        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }

    
    const clickEvent = context.mode === 'vertical' ? { onClick: handleClick } : {}

    const hoverEvent = context.mode !== 'vertical' ? { 
        onMouseEnter: (e: React.MouseEvent) => { handleMouse( e, true ) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse( e, false ) }
    } : {}

    const subMenuHandleClick = () => {
        context.onSelect && !disabled && typeof index === 'string' && context.onSelect(index)
    }

    const classes = classNames('XD-menu-item submenu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index || context.index.split('-')[0] === index
    })

    const renderChildren = () => {
        const subClasses = classNames('XD-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map( children, ( child, subIndex ) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if ( childElement.type.displayName === 'MenuItem' ) {
                return React.cloneElement( childElement, { index: `${index}-${subIndex}` } )
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subClasses}>{childrenComponent}</ul>
        )
    }

    return (
        <li key={index} className={classes} onClick={subMenuHandleClick} { ...hoverEvent } >
            <div className="submenu-title" { ...clickEvent }>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu