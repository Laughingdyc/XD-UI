import React, { useState, createContext } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menuItem"

type MenuMode = 'horizontal' | 'vertical'
type onSelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    defaultIndex?: string
    className   ?: string
    mode        ?: MenuMode
    style       ?: React.CSSProperties
    onSelect    ?: onSelectCallback
}

interface IMenuContext {
    index    : string
    onSelect?: onSelectCallback
    mode    ?: MenuMode
}

type IChildren = {
    children: React.ReactNode
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps & IChildren> = (Props) => {
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
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: string) => {
        setCurrentActive(index)
        onSelect && onSelect(index)
    }

    const passedContext: IMenuContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode: mode
    }

    const renderChildren = () => {
        // 不直接用 children.map
        // 是因为 children 可以为 React.ReactNode 中的任意类型
        //
        // 用 React.Children.map 代替
        return React.Children.map( children, ( child, index ) => {
                // child 可以为任意类型，所以要类型断言一下
                const childElement = child as React.FunctionComponentElement<MenuItemProps>
                const { displayName } = childElement.type
                if ( displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu' ) {
                    // 把属性混入到示例 child 中
                    return React.cloneElement( childElement, { index: index.toString() } )
                } else {
                    console.error("Warning: Menu has a child which is not a MenuItem component", displayName)
                }
            }
        )
    }

    return (
        <ul className={classes} style={style} data-testid="XD-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
}

export default Menu