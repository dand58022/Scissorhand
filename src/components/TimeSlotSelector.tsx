import { groupTimeSlotsByDayPart } from '@/lib/salonModel';
import type { TimeSlotOption } from '@/lib/types';

interface TimeSlotSelectorProps {
  contextText: string;
  selectedTime: string;
  showSlots: boolean;
  slots: TimeSlotOption[];
  onSelect: (time: string) => void;
}

export function TimeSlotSelector({
  contextText,
  selectedTime,
  showSlots,
  slots,
  onSelect
}: TimeSlotSelectorProps) {
  const groupedSlots = groupTimeSlotsByDayPart(slots);

  return (
    <section className="field-group booking-step booking-step--times">
      <div className="field-label-row">
        <label>Available time slots</label>
        <span>{contextText}</span>
      </div>

      {!showSlots ? (
        <p className="availability-helper">Choose a service to view available times</p>
      ) : (
        <>
          {slots.length === 0 ? (
            <p className="availability-helper">No openings match this combination. Try another barber or date.</p>
          ) : (
            <div className="time-slot-groups">
              <TimeSlotGroup title="Morning" slots={groupedSlots.morning} selectedTime={selectedTime} onSelect={onSelect} />
              <TimeSlotGroup title="Afternoon" slots={groupedSlots.afternoon} selectedTime={selectedTime} onSelect={onSelect} />
            </div>
          )}
        </>
      )}
    </section>
  );
}

interface TimeSlotGroupProps {
  title: string;
  slots: TimeSlotOption[];
  selectedTime: string;
  onSelect: (time: string) => void;
}

function TimeSlotGroup({ title, slots, selectedTime, onSelect }: TimeSlotGroupProps) {
  if (slots.length === 0) {
    return null;
  }

  return (
    <div className="time-slot-group">
      <h3>{title}</h3>
      <div className="time-slot-grid">
        {slots.map((slot) => (
          <button
            key={`${slot.intervalMinutes}-${slot.time}`}
            type="button"
            disabled={slot.disabled}
            className={`time-slot ${selectedTime === slot.time ? 'is-selected' : ''}`}
            onClick={() => onSelect(slot.time)}
          >
            <span>{slot.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
