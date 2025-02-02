type SidebarArrowLeftProps = {
    color:string
}

const SidebarArrowLeft = ({ color }:SidebarArrowLeftProps) => {
    return (
        <svg fill={color} width="10px" height="10px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="m1394.006 0 92.299 92.168-867.636 867.767 867.636 867.636-92.299 92.429-959.935-960.065z" fill-rule="evenodd"/>
        </svg>
    )
}

export default SidebarArrowLeft;