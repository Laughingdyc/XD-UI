import Menu from "../../components/Menu/menu"
import MenuItem from "../../components/Menu/menuItem"

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
            <Menu defaultIndex={0} onSelect={(index) => {console.log(index)}}>
                <MenuItem index={0}>
                    item-1
                </MenuItem>
                <MenuItem index={1}>
                    item-2
                </MenuItem>
                <MenuItem index={2}>
                    item-3
                </MenuItem>
            </Menu>
        </>
    )
}

export default MenuExample