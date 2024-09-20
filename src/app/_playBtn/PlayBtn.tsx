import { Button } from "@nextui-org/react";




const PlayBtn: React.FC = () => {

    return (
        <div>
            <Button type="button" color="primary" radius="none">건설</Button>
            <Button type="button" color="secondary" radius="none">병력</Button>
            <Button type="button" color="success" radius="none">외교</Button>
            <Button type="button" color="warning" radius="none">내정</Button>
        </div>
    )

}

export default PlayBtn;