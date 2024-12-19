

import SouthIcon from '@mui/icons-material/South';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';

import NorthIcon from '@mui/icons-material/North';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';


import EastIcon from '@mui/icons-material/East';

import WestIcon from '@mui/icons-material/West';


export default function GetDirectionIcon( {degrees, text}: {
    degrees: number,
    text: string,
}){

    //get correct direction from degrees supplied by stormglass. Return correct arrow based on the direction.
    const degreesToDirection = (degrees: number) => {
        const directions = [
            { name: 'N', min: 337.5, max: 22.5 },
            { name: 'NE', min: 22.5, max: 67.5 },
            { name: 'E', min: 67.5, max: 112.5 },
            { name: 'SE', min: 112.5, max: 157.5 },
            { name: 'S', min: 157.5, max: 202.5 },
            { name: 'SW', min: 202.5, max: 247.5 },
            { name: 'W', min: 247.5, max: 292.5 },
            { name: 'NW', min: 292.5, max: 337.5 }
        ];

        const normalizedDegrees = degrees % 360;

        return directions.find(dir =>
            normalizedDegrees >= dir.min || normalizedDegrees < dir.max
        )?.name || 'N';
    };

    const directionString = degreesToDirection(degrees)

    switch (directionString) {
        case 'N':
            return <div><NorthIcon/>{text}: North</div>;
        case 'NE':
            return <div><NorthEastIcon/>{text}: North East</div>;
        case 'NW':
            return <div><NorthWestIcon/>{text}: North West</div>;

        case 'E':
            return <div><EastIcon/>{text}: East</div>;
        case 'SE':
            return <div><SouthEastIcon/>{text}: South East</div>;
        case 'S':
            return <div><SouthIcon/>{text}: South</div>;
        case 'SW':
            return <div><SouthWestIcon/>{text}: South West</div>;
        case 'W':
            return <div><WestIcon/>{text}: West</div>;
        default:
            return <div><NorthIcon/>{text}</div>;

    }

}