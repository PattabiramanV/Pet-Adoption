import React from 'react';
import Checkbox from '@mui/material/Checkbox';

const TimeSlotForm = ({
  timeSlots,
  selectedSlots,
  handleCheckboxChange,
  disabledSlots,
  selectedDate,
  showErrors,
  error

}) => {
  return (
    <div className="form-group">
      <label className="block text-lg font-medium mb-2">Available Time Slots:</label>
      <div className="grid grid-cols-2 gap-4">
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              checked={selectedSlots.includes(slot)}
              onChange={() => handleCheckboxChange(slot)}
              disabled={disabledSlots[selectedDate]?.includes(slot)}
            />
            <label className="ml-2">{slot}</label>
          </div>
        ))}
      </div>
      {showErrors && error.selectedSlot && (
        <div className="error-message text-red-600 mt-2">{error.selectedSlot}</div>
      )}
    </div>
  );
};

export default TimeSlotForm;
