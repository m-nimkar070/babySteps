import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid, Typography, Button, Container } from '@mui/material';
import { Doctor } from '../interfaces/interfaces';
import { useGetDoctorsQuery } from '../services/api';

const DoctorsList: FC = () => {
  const { data: doctors } = useGetDoctorsQuery();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Select a Doctor</Typography>
      <Grid container spacing={3}>
        {doctors?.map((doctor :Doctor) => (
          <Grid item xs={12} md={6} lg={4} key={doctor._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography color="text.secondary">{doctor.specialization}</Typography>
                <Button
                  component={Link}
                  to={`/doctor/${doctor._id}`}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View Availability
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DoctorsList;