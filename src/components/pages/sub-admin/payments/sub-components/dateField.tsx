import calendarIcon from '../../../../../assets/images/calendar.svg';

interface IDateField {
  placeholder: string;
};

const dateField = ({ placeholder } : IDateField) => {
  return (
    <div className='inline-display'>
      <input className='date-field-input' placeholder={placeholder} />
      <img className='calendar-icon' src={calendarIcon} alt='' />
    </div>
  );
};

export default dateField;
