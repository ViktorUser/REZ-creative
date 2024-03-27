import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./MainForm.scss";
import { Socials } from "../Socials/Socials";
import classNames from "classnames";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export const MainForm = () => {
  const formRef = useRef();
  const formTitleRef = useRef();
  const formContentRef = useRef();

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top bottom',
        end: '20% bottom',
        scrub: 2,
      }
    })

    gsap.set(formRef.current, {
      scale: .9,
    });
    
    gsap.set(formContentRef.current, {
      scale: .85,
    });

    gsap.set(formTitleRef.current, {
      yPercent: 20,
      clipPath: 'inset(0 0 100% 0)'
    });

    gsap.to(formContentRef.current, {
      scale: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: '10% bottom',
        end: '20% bottom',
        scrub: 4,
      }
    })

    tl.to(formRef.current, {
      scale: 1,
    })

    tl.to(formTitleRef.current, {
      yPercent: 0,
      clipPath: 'inset(0 0 0% 0)'
    })
  })

  return (
    <section className="main-form" ref={formRef}>
      <h1 className="super-text" ref={formTitleRef}>Say hello</h1>

      <div className="main-form__content" ref={formContentRef}>
        <MyForm />
        <Socials />
      </div>
    </section>
  );
};

const validationSchema = Yup.object({
  name: Yup.string().required("The field is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  message: Yup.string(),
});

const MyForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios({
          method: "post",
          url: "https://stage.coreapi.tech/api/app/run?action=testing&mode=view",
          data: {
            values,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          console.log(response);
          setSubmitting(false);
          setSubmitted(true);
          setSubmitStatus(
            "We’re happy to receive your application. We’ll reach out to you in 1-3 working days via email"
          );
        });
      }}
    >
      {(formik) => (
        <div>
          {submitted && (
            <div className="form form--submited">
              <h2>Thank you!</h2>
              <h2>We’re happy to receive your application.</h2>
              <h2>We’ll reach out to you in 1-3 working days via email</h2>
            </div>
          )}
          {!submitted && (
            <Form className="form">
              <div className="form__input-wrapper">
                <Field
                  type="text"
                  name="name"
                  placeholder="Hello! Type your name"
                  className={classNames("form__input", {
                    "form__input--error":
                      getIn(formik.errors, "name") &&
                      getIn(formik.touched, "name"),
                  })}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="form__input-wrapper">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={classNames("form__input", {
                    "form__input--error":
                      getIn(formik.errors, "email") &&
                      getIn(formik.touched, "email"),
                  })}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="form__input-wrapper form__input-wrapper--textarea">
                <p>Tell us about your project</p>
                <Field
                  as="textarea"
                  name="message"
                  className="form__input form__input--textarea"
                />
              </div>

              <div className="bottom">
                <button
                  type="submit"
                  className={classNames("form__button", {
                    ["form__button--disabled"]:
                      formik.isSubmitting || !formik.isValid || !formik.dirty,
                  })}
                  disabled={
                    formik.isSubmitting || !formik.isValid || !formik.dirty
                  }
                >
                  Apply
                </button>

                <p className="smallText shadow form__terms">
                  By clicking next, you agree to our
                  <br />
                  <a href="/" className="form__terms-link">
                    Terms and Conditions
                  </a>
                </p>
              </div>
            </Form>
          )}
        </div>
      )}
    </Formik>
  );
};
