import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PaidIcon from '@mui/icons-material/Paid';

const Status: React.FC = () => {

    return (
        <div className="flex bg-amber-800 text-white font-bold">
            <div><InsertEmoticonIcon></InsertEmoticonIcon> 100</div>
            <div><PaidIcon></PaidIcon> 1000</div>
        </div>
    )

}

export default Status;