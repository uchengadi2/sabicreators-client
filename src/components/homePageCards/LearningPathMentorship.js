import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import background from "./../../assets/images/home/path.jpg";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 350,
    width: "80%",

    marginLeft: "13em",
    //borderRadius: 30,
    marginTop: "5em",
    marginBottom: "1em",
    padding: 0,
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: 50,
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: 150,
    width: 150,
    marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
    //marginTop: "80px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function LearningPathMentorship(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});

  const [learningPath, setLearningPath] = useState("certification");

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/courses/${product.imageCover}`;
  }

  const Str = require("@supercharge/strings");

  const changeLearningPathHandler = (event) => {
    setLearningPath(event.target.value);

    props.updatePathHandler(event.target.value);
    props.updateLearningPathInfoInfo();
  };

  const renderLearningPathField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="learningPath"
            id="learningPath"
            value={learningPath}
            onChange={changeLearningPathHandler}
            label="Learning Path"
            style={{
              height: 38,
              width: matchesMDUp ? 700 : 300,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <MenuItem value={"regular-course"}>
              Regular Courses & Skills
            </MenuItem>
            <MenuItem value={"certification"}>
              Certification Courses & Skills
            </MenuItem>
            {/* <MenuItem value={"channels"}>Channels</MenuItem>
            <MenuItem value={"assessments"}>Assessments</MenuItem>
            <MenuItem value={"mentoring"}>Mentoring</MenuItem>
            <MenuItem value={"mocks"}>Mocks</MenuItem>
            <MenuItem value={"live-interviews-preps"}>
              Live Interview Preps
            </MenuItem>
            <MenuItem value={"talk-to-expert"}>Engage An Expert</MenuItem>
            <MenuItem value={"books"}>Books</MenuItem> */}
            <MenuItem value={"vocational"}>
              Vocational Courses & Skills
            </MenuItem>
          </Select>
          <FormHelperText>Choose Path</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root}>
          {/* <CardActionArea disableRipple disableTouchRipple> */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            //style={{ backgroundColor: "white" }}
          >
            <Grid
              item
              style={{
                width: "100%",
                //border: "1px dotted white",
                // backgroundColor: "white",
                marginLeft: 250,
              }}
            >
              <CardContent>{renderLearningPathField()}</CardContent>
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        // <Card className={classes.rootMobile} disableRipple>
        <Grid
          container
          direction="column"
          justifyContent="center"
          className={classes.rootMobile}
        >
          <Grid
            item
            style={{
              width: "100%",
              //border: "1px dotted white",
              // backgroundColor: "white",
              marginLeft: 10,
            }}
          >
            <CardContent>{renderLearningPathField()}</CardContent>
          </Grid>
        </Grid>
        //</Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </>
  );
}
