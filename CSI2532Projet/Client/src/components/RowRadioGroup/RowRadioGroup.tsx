import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function RowRadioGroup(props: { getValue: (arg0: string) => void; setLoggedIn : (arg0: boolean) => void; setError : (arg0: string) => void}) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => props.getValue(e.target.value)} 
        defaultValue="Employee"
      >
        <FormControlLabel value="Employee" control={<Radio />} label="Employee" className='radio-label' onClick={() => {props.setLoggedIn(false); props.setError('')}}/>
        <FormControlLabel value="Client" control={<Radio />} label="Client" className='radio-label' onClick={() => {props.setLoggedIn(false); props.setError('')}} />
      </RadioGroup>
    </FormControl>
  );
}

export default RowRadioGroup