import React, { FunctionComponentElement, useContext, useState } from "react"
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

    // 控制下拉框的显示
    const [ menuOpen, setMenuOpen ] = useState(false)

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

    const context = useContext(MenuContext)
    
    const clickEvent = context.mode === 'vertical' ? { onClick: handleClick } : {}

    const hoverEvent = context.mode !== 'vertical' ? { 
        onMouseEnter: (e: React.MouseEvent) => { handleMouse( e, true ) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse( e, false ) }
    } : {}

    const classes = classNames('XD-menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const renderChildren = () => {
        const subClasses = classNames('XD-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map( children, ( child, i ) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if ( childElement.type.displayName === 'MenuItem' ) {
                return childElement
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subClasses}>{childrenComponent}</ul>
        )
    }

    return (
        <li key={index} className={classes} { ...hoverEvent } >
            <div className="submenu-title" { ...clickEvent }>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu