import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, addDays, isSameDay } from 'date-fns';
import BookingModal from './BookingModal';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import { useGetSlotsQuery } from '../services/api';

const DoctorCalendar: FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { data: slots } = useGetSlotsQuery({
    doctorId: doctorId!,
    date: format(selectedDate, 'yyyy-MM-dd')
  });

  const dates = Array.from({ length: 7 }).map((_, i) =>
    addDays(new Date(), i)
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Select Date & Time</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, my: 4, overflowX: 'auto', justifyContent :'center' , alignItems: 'center' }}>
        {dates.map((date) => (
          <Button
            key={date.toString()}
            variant={isSameDay(date, selectedDate) ? 'contained' : 'outlined'}
            onClick={() => setSelectedDate(date)}
            sx={{ minWidth: 120 }}
          >
            {format(date, 'MMM dd')}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        {slots?.map((slot: string , idx:number) => (
          <Grid item xs={6} sm={4} md={3} key={idx}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSelectedSlot(slot);
                setOpenModal(true);
              }}
            >
              {slot}
            </Button>
          </Grid>
        ))}
      </Grid>

      {doctorId && selectedSlot && (
        <BookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          slot={selectedSlot}
          date={selectedDate}
          doctorId={doctorId}
        />
      )}
    </Container>
  );
};

export default DoctorCalendar;