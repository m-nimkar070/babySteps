import { Card, CardContent, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doctor } from "../interfaces/interfaces";

interface DoctorCardProps {
  doctor: Doctor;
}
export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{doctor.name}</Typography>
        <Typography>{doctor.specialization}</Typography>
        <Button component={Link} to={`/doctor/${doctor._id}`}>
          View Availability
        </Button>
      </CardContent>
    </Card>
  );
};
