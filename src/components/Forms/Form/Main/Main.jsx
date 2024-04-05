import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import classNames from "classnames";

import "../Form.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("The field is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  message: Yup.string(),
});

export const MainForm = () => {
  const [submitted, setSubmitted] = useState(false);

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
            <Form className="form form--main">
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
