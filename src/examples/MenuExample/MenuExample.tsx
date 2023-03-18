import Menu from "../../components/Menu/menu"
import MenuItem from "../../components/Menu/menuItem"
import SubMenu from "../../components/Menu/subMenu"
import './MenuExample.scss'

const MenuExample: React.FC = () => {
    return (
        <>
            {/* 
                1.触发 MenuItem onClick
                2.触发 MenuItem handleClick
                3.触发 Menu passedContext.onSelect
                4.触发 Menu handleClick
                5.触发 Menu onSelect
            */}
            <div className="Menu-demo-wrapper">
                <Menu 
                    onSelect={(index) => {console.log(index)}} 
                    mode="vertical"
                    defaultOpenSubMenus={['2']}
                >
                    <MenuItem>item-1</MenuItem>
                    <MenuItem disabled>item-2</MenuItem>
                    <SubMenu title="dropdown">
                        <MenuItem>dropdown-1</MenuItem>
                        <MenuItem>dropdown-2</MenuItem>
                    </SubMenu>
                    <MenuItem>item-3</MenuItem>
                </Menu>
            </div>
        </>
    )
}

export default MenuExample