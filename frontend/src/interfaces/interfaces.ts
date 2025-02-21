export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  workingHours: {
    start: string;
    end: string;
  };
}

export interface Appointment {
  _id: string;
  doctorId: string;
  date: string;
  duration: number;
  appointmentType: string;
  patientName: string;
  notes?: string;
}

export type BookingFormValues = {
  patientName: string;
  appointmentType: string;
  notes: string;
};