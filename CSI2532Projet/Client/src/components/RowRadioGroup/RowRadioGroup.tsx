import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function RowRadioGroup(props: { getValue: (arg0: string) => void; }) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => props.getValue(e.target.value)} 
      >
        <FormControlLabel value="Employee" control={<Radio />} label="Employee" className='radio-label'/>
        <FormControlLabel value="Client" control={<Radio />} label="Client" className='radio-label' />
      </RadioGroup>
    </FormControl>
  );
}

export default RowRadioGroup