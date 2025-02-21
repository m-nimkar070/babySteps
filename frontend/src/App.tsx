import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorsList from './components/DoctorsList';
import DoctorCalendar from './components/DoctorCalendar';
import { Container, CssBaseline } from '@mui/material';
import { AppointmentsList } from './components/AppointmentsList';

const App: FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<DoctorsList />} />
          <Route path="/doctor/:doctorId" element={<DoctorCalendar />} />
          <Route path="/appointments" element={<AppointmentsList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;