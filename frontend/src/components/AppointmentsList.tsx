import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import { useGetAppointmentsQuery, useDeleteAppointmentMutation } from '../services/api';
import { format } from 'date-fns';

export function AppointmentsList() {
  const { data: appointments } = useGetAppointmentsQuery();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  return (
    <Container>
      <Typography variant="h4">My Appointments</Typography>
      {appointments?.map((appt) => (
        <Card key={appt._id} sx={{ my: 2 }}>
          <CardContent>
            <Typography>{appt.patientName}</Typography>
            <Typography>{format(new Date(appt.date), 'MMM dd, yyyy HH:mm')}</Typography>
            <Typography>{appt.appointmentType}</Typography>
            <Button onClick={() => deleteAppointment(appt._id)}>Cancel</Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
