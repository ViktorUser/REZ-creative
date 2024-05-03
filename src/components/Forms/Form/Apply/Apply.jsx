import { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import classNames from "classnames";

import "../Form.scss";
import { Link } from "react-router-dom";
import { URL_FORM_APPLY } from "@/helpers/dataHelpers/linksAPI";
import { ScrollTrigger } from "gsap/all";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

const validationSchema = Yup.object({
  name: Yup.string().required("The field is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  phone: Yup.string().required("The field is required"),
  website: Yup.string(),
  resume: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File needs to be less than 2MB",
      (value) => value && value.size <= 2000000 // 2 MB
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) =>
        value &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(value.type)
    ),
  "cover-letter": Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File needs to be less than 2MB",
      (value) => !value || value.size <= 2000000 // 2 MB
    ),
});

export const ApplyVacancyForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { data } = useContext(DataContext);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        website: "",
        phone: "",
        resume: null,
        "cover-letter": null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (values[key] instanceof File) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });

        axios({
          method: "post",
          url: URL_FORM_APPLY,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => {
          ScrollTrigger.refresh(true);
          setSubmitting(false);
          setSubmitted(true);
        });
      }}
    >
      {(formik) => (
        <div>
          {submitted && (
            <div
              className="form form--submited"
              dangerouslySetInnerHTML={{
                __html: data?.form?.message_after_form_submit,
              }}
            />
          )}
          {!submitted && (
            <Form className="form form--general">
              <div className="form__input-wrapper">
                <Field
                  type="text"
                  name="name"
                  placeholder="Your name"
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

              <div className="form__input-wrapper">
                <Field
                  type="text"
                  name="website"
                  placeholder="Website / Portfolio / Reel URL"
                  className={classNames("form__input", {
                    "form__input--error":
                      getIn(formik.errors, "website") &&
                      getIn(formik.touched, "website"),
                  })}
                />
                <ErrorMessage
                  name="website"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="form__input-wrapper">
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className={classNames("form__input", {
                    "form__input--error":
                      getIn(formik.errors, "phone") &&
                      getIn(formik.touched, "phone"),
                  })}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="form__files-wrapper">
                <UploadFileCL setFieldValue={formik.setFieldValue} />

                <UploadFileResume setFieldValue={formik.setFieldValue} />
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
                  <Link to="/terms" className="form__terms-link">
                    Terms and Conditions
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </div>
      )}
    </Formik>
  );
};

const UploadFileResume = ({ setFieldValue }) => {
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState("");

  const validateFile = (file) => {
    if (file.size > 2000000) {
      setFileError("File needs to be less than 2MB");
      return false;
    }
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileError("");
      return true;
    }
    setFileError("Unsupported Format");
    return false;
  };

  return (
    <div className="form__files form__input-wrapper form__input-wrapper--file">
      <input
        id="resume"
        name="resume"
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            if (validateFile(file)) {
              setFieldValue("resume", file);
              setFilename(file.name);
            }
          } else {
            setFieldValue("resume", "");
            setFilename("");
          }
        }}
      />
      <label
        htmlFor="resume"
        className={classNames(
          "form__input-file form__input-file-name smallText",
          {
            "form__input--error": fileError,
          }
        )}
      >
        {filename ? (
          <span className="shadow">{filename}</span>
        ) : (
          "Attach resume / CV"
        )}
      </label>
      {fileError && (
        <p className="form__input-error-msg form__input-error-msg--file smallText">
          {fileError}
        </p>
      )}
    </div>
  );
};

const UploadFileCL = ({ setFieldValue }) => {
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState("");

  const validateFile = (file) => {
    if (file.size > 2000000) {
      setFileError("File needs to be less than 2MB");
      return false;
    }
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileError("");
      return true;
    }
    setFileError("Unsupported Format");
    return false;
  };

  return (
    <div className="form__files form__input-wrapper form__input-wrapper--file">
      <input
        id="cover-letter"
        name="cover-letter"
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            if (validateFile(file)) {
              setFieldValue("cover-letter", file);
              setFilename(file.name);
            }
          } else {
            setFieldValue("cover-letter", "");
            setFilename("");
          }
        }}
      />
      <label
        htmlFor="cover-letter"
        className={classNames(
          "form__input-file form__input-file-name smallText",
          {
            "form__input--error": fileError,
          }
        )}
      >
        {filename ? (
          <span className="shadow">{filename}</span>
        ) : (
          "Upload a cover letter"
        )}
      </label>
      {fileError && (
        <p className="form__input-error-msg form__input-error-msg--file smallText">
          {fileError}
        </p>
      )}
    </div>
  );
};
