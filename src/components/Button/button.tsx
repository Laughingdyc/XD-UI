import classNames from "classnames";
import React from "react";

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger  = 'danger',
    Link    = 'link'
}

interface BaseButtonProps{
    className?: string,
    disabled ?: boolean,
    size     ?: ButtonSize,
    btnType  ?: ButtonType,
    href     ?: string,
    children  : React.ReactNode
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (Props) => {
    const {
        disabled,
        className,
        size,
        btnType,
        href,
        children,
        ...restProps
    } = Props

    const classes = classNames('btn', className, {
        // 'disabled'        : ( btnType === ButtonType.Link ) && disabled,
        'disabled'        : disabled,
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]   : size,
    })

    if ( btnType === ButtonType.Link && href ) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button