import Button, { ButtonSize, ButtonType } from "../../components/Button/button"
import './ButtonExample.scss'

const ButtonExample: React.FC<any> = (Prop) => {
    return (
        <>
            <div className='button-demo-wrapper'>
                <div className='button-demo-title'>按钮类型</div>
                <Button>Default Button</Button>
                <Button btnType={ButtonType.Primary}>Primary Button</Button>
                <Button btnType={ButtonType.Danger}>Danger Button</Button>
                <Button btnType={ButtonType.Link}>Link Button</Button>
            </div>
            <div className='button-demo-wrapper'>
                <div className='button-demo-title'>按钮大小</div>
                <Button size={ButtonSize.Small}>Small Button</Button>
                <Button>Default Button</Button>
                <Button size={ButtonSize.Large}>Large Button</Button>
            </div>
            <div className='button-demo-wrapper'>
                <div className='button-demo-title'>按钮不可用</div>
                <Button disabled>Default Button</Button>
                <Button btnType={ButtonType.Primary} disabled>Primary Button</Button>
                <Button btnType={ButtonType.Danger} disabled>Danger Button</Button>
                <Button btnType={ButtonType.Link} disabled>Link Button</Button>
            </div>
        </>
    )
}

export default ButtonExample