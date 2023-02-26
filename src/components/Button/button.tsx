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
        href = '',
        children,
        ...restProps
    } = Props

    const classes = classNames('btn', className, {
        'disabled'        : disabled,
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]   : size,
    })

    const ButtonBtn = (
        <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
    
    const LinkBtn = (
        <a className={classes} href={href} {...restProps}>{children}</a>
    )

    const DisabledLinkBtn = (
        <span className={classes} {...restProps}>{children}</span>
    )

    if ( btnType === ButtonType.Link ) {
        return disabled ? DisabledLinkBtn : LinkBtn
    } else {
        return ButtonBtn
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button