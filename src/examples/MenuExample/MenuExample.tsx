import Menu from "../../components/Menu/menu"
import MenuItem from "../../components/Menu/menuItem"
import SubMenu from "../../components/Menu/subMenu"

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
            <Menu onSelect={(index) => {console.log(index)}} mode="vertical">
                <MenuItem>item-1</MenuItem>
                <MenuItem disabled>item-2</MenuItem>
                <SubMenu title="dropdown">
                    <MenuItem>dropdown-1</MenuItem>
                    <MenuItem>dropdown-2</MenuItem>
                </SubMenu>
                <MenuItem>item-3</MenuItem>
            </Menu>
        </>
    )
}

export default MenuExample