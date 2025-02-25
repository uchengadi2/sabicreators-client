import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";
import UpperFooter from "../ui/UpperFooter";
import CircularProgress from "@material-ui/core/CircularProgress";

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../logistic_assets/cover_image_1.png";
import { Category } from "@material-ui/icons";
import history from "../../history";
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
import CategoryProductsCard from "../CategoryProductsCard";
import CartProductCard from "./CartProductCard";
import CheckoutCard from "./CheckoutCard";
import CheckoutDeliveryAndPayment from "./CheckoutDeliveryAndPayment";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //height: "40vh",
    marginTop: "1.5em",
    height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
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

function CheckoutPage(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [cartProductList, setCartProductList] = useState([]);
  const [updateCheckout, setUpdateCheckout] = useState();
  const [totalCost, setTotalCost] = useState();
  const [currency, setCurrency] = useState();
  const [isCourseAuditable, setIsCourseAuditable] = useState();
  const [acceptablePaymentOptions, setAcceptablePaymentOptions] = useState();
  const [isLoading, setIsLoading] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const renderCheckoutUpdate = (value) => {
    console.log("the value of this removed cart is:", value);
    setUpdateCheckout(value);
  };

  const cartHolder = props.userId;

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: { cartHolder: cartHolder, status: "marked-for-checkout" },
      });
      const items = response.data.data.data;

      items.map((cart) => {
        allData.push({
          id: cart._id,
          course: cart.course,
          cartHolder: cart.cartHolder,
          dateAddedToCart: cart.dateAddedToCart,
          refNumber: cart.refNumber,
          quantity: cart.quantity,
          price: cart.price,
          currency: cart.currency,
          status: cart.status,
          preferredStartDate: cart.preferredStartDate,
          isCourseAuditable: cart.isCourseAuditable,

          weekdayAuditDays: cart.weekdayAuditDays,
          weekendAuditDays: cart.weekendAuditDays,
          venue: cart.venue,
          venueLink: cart.venueLink,
          weekdaySessionPeriod: cart.weekdaySessionPeriod,
          weekendSessionPeriod: cart.weekendSessionPeriod,
          type: cart.type,
          lectureDuration: cart.lectureDuration,
          projectDuration: cart.projectDuration,
          capstoneProject: cart.capstoneProject,
          passGrade: cart.passGrade,
          hasMentorshipCredit: cart.hasMentorshipCredit,
          mentorshipCredit: cart.mentorshipCredit,
          mentorshipDuration: cart.mentorshipDuration,
          costPerMentorshipCredit: cart.costPerMentorshipCredit,
          videoId: cart.videoId,
          previewVideoId: cart.previewVideoId,
          deliveryMethod: cart.deliveryMethod,
          duration: cart.duration,
          category: cart.category[0].id,
          channel: cart.channel[0].id,
          programme: cart.programme[0].id,
          hasMentorshipCredit: cart.hasMentorshipCredit,
          mentorshipCredit: cart.mentorshipCredit,
          mentorshipDuration: cart.mentorshipDuration,
          costPerMentorshipCredit: cart.costPerMentorshipCredit,
          series: cart.series,
          hasSeries: cart.hasSeries,
          commencementWeekdaysDate: cart.commencementWeekdaysDate,
          commencementWeekendsDate: cart.commencementWeekendsDate,
          isInstallmentalPaymentAllowed: cart.isInstallmentalPaymentAllowed,
          maximumInstallmentalPayment: cart.maximumInstallmentalPayment,
          paymentOptions: cart.paymentOptions,
          slug: cart.slug,
          category: cart.category[0].id,
          channel: cart.channel[0].id,
          programme: cart.programme[0].id,
          allowLifeTimeAccess: cart.allowLifeTimeAccess,
          priceLabel: cart.priceLabel,
          acceptablePaymentOptions: cart.acceptablePaymentOptions,
        });
      });

      if (allData.lenght === 0) {
        return;
      }

      if (!allData) {
        return;
      }

      if (allData.length >= 1) {
        setIsCourseAuditable(allData[0].isCourseAuditable);
      }

      if (allData.length >= 1) {
        setAcceptablePaymentOptions(allData[0].acceptablePaymentOptions);
      }

      setCartProductList(allData);

      setIsLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateCheckout]);

  const Str = require("@supercharge/strings");

  const cartList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {cartProductList.map((cart, index) => (
            <CheckoutCard
              course={cart.course}
              key={`${cart.id}${index}`}
              cartHolder={cart.cartHolder}
              acceptablePaymentOptions={acceptablePaymentOptions}
              priceLabel={cart.priceLabel}
              cartId={cart.id}
              dateAddedToCart={cart.dateAddedToCart}
              refNumber={cart.refNumber}
              quantity={cart.quantity}
              price={cart.price}
              preferredStartDate={cart.preferredStartDate}
              currency={cart.currency}
              isCourseAuditable={isCourseAuditable}
              status={cart.status}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              renderCheckoutUpdate={renderCheckoutUpdate}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {cartProductList.map((cart, index) => (
            <CheckoutCard
              course={cart.course}
              key={`${cart.id}${index}`}
              cartHolder={cart.cartHolder}
              cartId={cart.id}
              dateAddedToCart={cart.dateAddedToCart}
              acceptablePaymentOptions={acceptablePaymentOptions}
              refNumber={cart.refNumber}
              quantity={cart.quantity}
              isCourseAuditable={isCourseAuditable}
              price={cart.price}
              priceLabel={cart.priceLabel}
              preferredStartDate={cart.preferredStartDate}
              currency={cart.currency}
              status={cart.status}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              renderCheckoutUpdate={renderCheckoutUpdate}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  let total = 0;

  cartProductList.map((cart, index) => {
    total = total + parseFloat(cart.price) * parseFloat(cart.quantity);
    //setCurrency(cart.currency);
  });

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}
        {!isLoading && cartProductList.length === 0 ? (
          <p style={{ marginTop: 50, marginLeft: 10 }}>
            {" "}
            There are no course in your checkout
          </p>
        ) : (
          <Grid item>{cartList}</Grid>
        )}
        {/*....INFORMATION BLOCK....*/}
      </Grid>
      <Grid>
        {!isLoading &&
          (cartProductList.length === 0 ? (
            ""
          ) : (
            <CheckoutDeliveryAndPayment
              courseList={cartProductList}
              isCourseAuditable={isCourseAuditable}
              acceptablePaymentOptions={acceptablePaymentOptions}
              totalCost={total}
              currency="naira"
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
            />
          ))}
      </Grid>
      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;
