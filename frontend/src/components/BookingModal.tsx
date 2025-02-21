import { FC } from 'react';
import { useFormik } from 'formik';
import { format, parseISO } from 'date-fns';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { useCreateAppointmentMutation } from '../services/api';
import { BookingFormValues } from '../interfaces/interfaces';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  slot: string;
  date: Date;
  doctorId: string;
}

const BookingModal: FC<BookingModalProps> = ({
  open,
  onClose,
  slot,
  date,
  doctorId
}) => {
  const [createAppointment] = useCreateAppointmentMutation();

  const formik = useFormik<BookingFormValues>({
    initialValues: {
      patientName: '',
      appointmentType: '',
      notes: ''
    },
    onSubmit: async (values, { resetForm }) => {
        try {
          const appointmentDate = parseISO(`${format(date, 'yyyy-MM-dd')}T${slot}`);
          await createAppointment({
            ...values,
            doctorId,
            date: appointmentDate.toISOString(),
            duration: 30
          }).unwrap();
          
          resetForm();  // Clear form values
          onClose();    // Close modal
        } catch (error) {
          console.error('Appointment creation failed:', error);
        }
      }
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
      }}>
        <Typography variant="h6" gutterBottom>
          Book Appointment
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="patientName"
            name="patientName"
            label="Patient Name"
            value={formik.values.patientName}
            onChange={formik.handleChange}
            margin="normal"
            required
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Appointment Type</InputLabel>
            <Select
              id="appointmentType"
              name="appointmentType"
              value={formik.values.appointmentType}
              onChange={formik.handleChange}
              label="Appointment Type"
            >
              <MenuItem value="Checkup">Checkup</MenuItem>
              <MenuItem value="Ultrasound">Ultrasound</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="notes"
            name="notes"
            label="Notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Confirm Booking
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingModal;