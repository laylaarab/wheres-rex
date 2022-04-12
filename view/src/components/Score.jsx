import Chip from '@mui/material/Chip'

export default function Score({ score }) {
    return (
        <Chip label={`You scored ${score} points last round.`} id='chip-score' color={'success'} />
    );
}
