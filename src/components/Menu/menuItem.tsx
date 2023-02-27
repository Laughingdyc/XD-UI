import React from "react"
import classNames from "classnames"

export interface MenuItemProps {
    index    ?: number
    disabled ?: boolean
    className?: string
    style    ?: React.CSSProperties
    children  : React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (Props) => {
    const {
        index,
        disabled,
        className,
        style,
        children
    } = Props

    const classes = classNames('XD-menu-item', className, {
        'is-disabled': disabled
    })

    return (
        <li className={classes} style={style}>
            {children}
        </li>
    )
}

export default MenuItem