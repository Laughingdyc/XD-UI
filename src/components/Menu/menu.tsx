import React from "react"
import classNames from "classnames"

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    defaultIndex?: number
    className   ?: string
    mode        ?: MenuMode
    style       ?: React.CSSProperties
    onSelect    ?: (selectedIndex: number) => void
    children     : React.ReactNode
}

const Menu: React.FC<MenuProps> = (Props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex
    } = Props

    const classes = classNames('XD-menu', className, {
        'menu-vertical': mode === 'vertical'
    })

    return (
        <ul className={classes} style={style}>
            {children}
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu