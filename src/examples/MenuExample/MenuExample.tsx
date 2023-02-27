import Menu from "../../components/Menu/menu"
import MenuItem from "../../components/Menu/menuItem"

const MenuExample: React.FC = () => {
    return (
        <>
            <Menu defaultIndex={0}>
                <MenuItem>
                    item-1
                </MenuItem>
                <MenuItem>
                    item-2
                </MenuItem>
                <MenuItem>
                    item-3
                </MenuItem>
            </Menu>
        </>
    )
}

export default MenuExample