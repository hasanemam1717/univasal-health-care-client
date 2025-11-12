export interface TDoctor {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  appointmentFee: number;
  averageRating: number | null;
  createdAt: string;
  updatedAt: string;
  currentWorkingPlace: string;
  designation: string;
  doctorSpecialties: string[]; // or a more specific type if available
  experience: number;
  gender: "MALE" | "FEMALE"; // adjust as needed
  isDeleted: boolean;
  profilePhoto: string;
  qualification: string;
  registrationNumber: string;
}
interface Meta {
  limit: number;
  page: number;
  total: number;
}

export interface DoctorResponse {
  success: boolean;
  message: string;
  meta: Meta;
  data: TDoctor[];
}
