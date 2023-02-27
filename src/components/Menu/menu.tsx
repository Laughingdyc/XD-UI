import React, { useState, createContext } from "react"
import classNames from "classnames"

type MenuMode = 'horizontal' | 'vertical'
type onSelectCallback = (selectedIndex: number) => void

export interface MenuProps {
    defaultIndex?: number
    className   ?: string
    mode        ?: MenuMode
    style       ?: React.CSSProperties
    onSelect    ?: onSelectCallback
    children     : React.ReactNode
}

interface IMenuContext {
    index    : number
    onSelect?: onSelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (Props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect
    } = Props

    const [ currentActive, setCurrentActive ] = useState(defaultIndex)

    const classes = classNames('XD-menu', className, {
        'menu-vertical': mode === 'vertical'
    })

    const handleClick = (index: number) => {
        setCurrentActive(index)
        onSelect && onSelect(index)
    }

    const passedContext: IMenuContext = {
        index: currentActive || 0,
        onSelect: handleClick
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu