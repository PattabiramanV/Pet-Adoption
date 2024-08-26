// TimeSlotCheckbox.jsx
import React from 'react';

const TimeSlotCheckbox = ({ slot, isChecked, isDisabled, onChange }) => (
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      disabled={isDisabled}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded mr-2"
    />
    <label className="text-gray-700 text-sm font-medium">
      {slot}
    </label>
  </div>
);

export default TimeSlotCheckbox;
