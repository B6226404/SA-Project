import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import TextField from '@material-ui/core/TextField';

import { DoctorsInterface } from "../models/IDoctor";
import { PatientsInterface } from "../models/IPatient";
import { ClinicsInterface } from "../models/IClinic";
import { DiseasesInterface } from "../models/IDisease";
import { MedicinesInterface } from "../models/IMedicine";
import { ExaminationInterface } from "../models/IExamination";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function ExaminationCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [doctors, setDoctors] = useState<DoctorsInterface>();
  const [patients, setPatiens] = useState<PatientsInterface[]>([]);
  const [clinics, setClinics] = useState<ClinicsInterface[]>([]);
  const [diseases, setDiseases] = useState<DiseasesInterface[]>([]);
  const [medicines, setMedicines] = useState<MedicinesInterface[]>([]);
  const [examination, setExamination] = useState<Partial<ExaminationInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof examination;
    setExamination({
      ...examination,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof examination;
    const { value } = event.target;
    setExamination({ ...examination, [id]: value });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getDoctors = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/doctor/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        examination.DoctorID = res.data.ID
        if (res.data) {
          setDoctors(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPatiens = async () => {
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPatiens(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getClinics = async () => {
    fetch(`${apiUrl}/clinics`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setClinics(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getDiseases = async () => {
    fetch(`${apiUrl}/diseases`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDiseases(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getMedicines = async () => {
    fetch(`${apiUrl}/medicines`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMedicines(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getDoctors();
    getPatiens();
    getClinics();
    getDiseases();
    getMedicines();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      DoctorID: convertType(examination.DoctorID),
      PatientID: convertType(examination.PatientID),
      ClinicID: convertType(examination.ClinicID),
      DiseaseID: convertType(examination.DiseaseID),
      MedicineID: convertType(examination.MedicineID),
      Treatment: examination.Treatment ?? "",
      TreatmentCost: typeof examination.TreatmentCost === "string" ? parseInt(examination.TreatmentCost ) : 0,
      MedicineCost: typeof examination.MedicineCost === "string" ? parseInt(examination.MedicineCost ) : 0,
      TreatmentTime: selectedDate,
    };

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/examinations`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        console.log("RES" , res)
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ผลการตรวจรักษา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={0} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขประจำตัวประชาชนผู้ป่วย</p>
              <Select
                native
                value={examination.PatientID}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขประจำตัวประชาชนผู้ป่วย
                </option>
                {patients.map((item: PatientsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Id_card}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>แพทย์ผู้ทำการรักษา</p>
              <Select
                native
                disabled
                value={examination.DoctorID}
                onChange={handleChange}
                inputProps={{
                  name: "DoctorID",
                }}
              >
                <option value={doctors?.ID} key={doctors?.ID}>
                  {doctors?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>คลิกนิก</p>
              <Select
                native
                value={examination.ClinicID}
                onChange={handleChange}
                inputProps={{
                  name: "ClinicID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกคลิกนิก
                </option>
                {clinics.map((item: ClinicsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>โรค</p>
              <Select
                native
                value={examination.DiseaseID}
                onChange={handleChange}
                inputProps={{
                  name: "DiseaseID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกโรค
                </option>
                {diseases.map((item: DiseasesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={5}>
            <p>วิธีการรักษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Treatment"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกวิธีการรักษา"
                value={examination.Treatment || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={5}>
            <p>ค่าใช้จ่าย</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="TreatmentCost"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกค่าใช้จ่าย"
                value={examination.TreatmentCost || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <p>ยาที่ได้รับ</p>
              <Select
                native
                value={examination.MedicineID}
                onChange={handleChange}
                inputProps={{
                  name: "MedicineID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกยาที่ได้รับ
                </option>
                {medicines.map((item: MedicinesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.MedicineName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={5}>
            <p>ค่าใช้จ่าย</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="MedicineCost"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกค่าใช้จ่าย"
                value={examination.MedicineCost || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่ทำการตรวจรักษา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="TreatmentTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่ทำการตรวจรักษา"
                  minDate={new Date("2018-01-01")}
                  format="yyyy/MM/dd"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/examinations"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกผลการตรวจรักษา
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ExaminationCreate;
