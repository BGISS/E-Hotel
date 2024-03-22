import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function RowRadioGroup() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Customer" control={<Radio />} label="Customer" className='radio-label'/>
        <FormControlLabel value="Client" control={<Radio />} label="Client" className='radio-label' />
      </RadioGroup>
    </FormControl>
  );
}

export default RowRadioGroup