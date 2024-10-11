
import Calendar from 'react-calendar';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function Mycalendar() {
    const [value, onChange] = useState<Value>(new Date());
  
    return (
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    );
  }


  