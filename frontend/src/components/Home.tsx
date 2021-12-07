import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบบันทึกผลการตรวจรักษา</h1>
        <h4>Requirements</h4>
        <p>
        ระบบจัดการคนไข้นอกเป็นระบบจัดการข้อมูลของผู้ป่วยที่เข้ามารับการรักษาแต่ไม่ได้นอนพักรักษาในโรงพยาบาล 
        เมื่อทำการตรวจรักษาเสร็จเรียบร้อย ระบบจะทำการจัดเก็บข้อมูล โดยให้ผู้ใช้ระบบซึ่งเป็นแพทย์ผู้ตรวจรักษา 
        สามารถเข้าระบบเพื่อบันทึกข้อมูลผลการตรวจรักษาของผู้ป่วย ซึ่งประกอบไปด้วย แพทย์ผู้ทำการรักษา ประเภทของคลินิก 
        โรคของผู้ป่วย วิธีการรักษา ยาที่ผู้ป่วยได้รับ ค่าใช้จ่าย วันเวลาที่ทำการรักษา 
        ซึ่งแพทย์ผู้ใช้ระบบสามารถเรียกดูข้อมูลผลการตรวจรักษาของผู้ป่วยได้
        </p>
      </Container>
    </div>
  );
}
export default Home;