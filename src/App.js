import * as Yup from "yup";
import { FieldArray, Formik, Field, Form, ErrorMessage } from "formik";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import PrintErrorMessage from "./components/Formik/PrintErrorMessage";
import React, { useState } from "react";
import GPA_computation_model from "./components/GPA_computation_model";
import GPA_Computation from "./components/GPA_Computation";
import compute_emoji from "./components/compute_emoji";

const App = () => {
  const initialValues = {
    subject_info: [
      {
        score: "",
        weight: "",
      },
    ],
  };
  const [ShowModel, SetModelOpen] = useState(false);
  const [Gpamessage, SetGPAmessage] = useState("");
  const [show, setShow] = useState(false);
  const [Emoji, setEmoji] = useState("");
  const ValidateScheme = Yup.object({
    subject_info: Yup.array().of(
      Yup.object().shape({
        weight: Yup.number()
          .required("weight/credit is important!")
          .typeError("Must be valid subject weight/credit or leave empty!")
          .min(0, "Must be valid weight/credit according to subject!")
          .max(100, "Imposible subject's weight/credit!"),
        score: Yup.number()
          .required("Score is important!")
          .typeError("Must be valid subject score")
          .min(0, "Must be valid subject's score!")
          .max(100, "Imposible subject's score!"),
      })
    ),
  });

  const ComputeGPAHandler = (values, submitprops) => {
    let sumpoint = 0;
    let totalpoint = 0;
    for (var subject of values.subject_info) {
      sumpoint += GPA_Computation(subject.score, subject.weight);
      totalpoint += Number(subject.weight);
    }
    const GPA = sumpoint / totalpoint;
    setEmoji(compute_emoji(GPA));
    submitprops.setSubmitting(false);
    SetGPAmessage(`Keep Striving ! GPA is ${GPA}`);
    setShow(true);
  };

  return (
    <section className="container p-0 position-relative">
      <Card
        as="section"
        className="mt-lg-5 bgc-dark-blue  shadow rounded border text-light"
      >
        <Card.Body as="section">
          <Card.Title as="small" className="text-center d-block">
            GPA expedition, From 'Oh No' to 'Oh Year' <small className="fs-5">&#128540;</small>
          </Card.Title>

          <Alert
            as="section"
            show={show}
            className="mt-2"
            variant="success"
            dismissible
            onClose={() => setShow(!show)}
          >
            <p className="d-inline">{Gpamessage}
            </p>
            <small className="fs-3 mx-2">{Emoji}</small>
          </Alert>

          <Formik
            onSubmit={ComputeGPAHandler}
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={ValidateScheme}
          >
            {(formik) => (
              <Form>
                <Row className="gy-3">
                  <Col lg={12} sm={12} md={12}>
                    <hr />
                    <p>Fill subject information as required!</p>
                    <section className="vstack m-0">
                      <FieldArray name="subject_info">
                        {({ push, remove, form }) => {
                          const { subject_info } = form.values;
                          return (
                            <section className="vstack">
                              {subject_info.map((subjectInfo, index) => (
                                <section key={index}>
                                  <section
                                    className={`${
                                      index == 0 ? "d-sm-flex" : "d-flex"
                                    } justify-content-between gap-1 my-0`}
                                  >
                                    <p className="text-danger my-auto">
                                      Subject {index + 1}
                                    </p>
                                    <section className="hstack gap-2 justify-content-end mt-0">
                                      {index === 0 && (
                                        <>
                                          <button
                                            onClick={() =>
                                              push({
                                                score: "",
                                                weight: "",
                                              })
                                            }
                                            type="button"
                                            className="btn bgc-dark-blue  btn-outline-primary border-success  text-light"
                                          >
                                            Add subjects
                                          </button>
                                          <div className="vr" />
                                        </>
                                      )}
                                      <button
                                        disabled={subject_info.length <= 1}
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="btn  btn-danger border text-light"
                                      >
                                        Remove {index + 1}
                                      </button>
                                    </section>
                                  </section>

                                  <Row as="section" className="g-3 mt-1 py-3">
                                    <Col lg={4} sm={12}>
                                      <Field
                                        className="form-control"
                                        placeholder="score e.g 80 e.tc"
                                        name={`subject_info.${index}.score`}
                                      />
                                      <ErrorMessage
                                        name={`subject_info.${index}.score`}
                                        component={PrintErrorMessage}
                                      />
                                    </Col>

                                    <Col lg={4} sm={12}>
                                      <Field
                                        className="form-control"
                                        placeholder="weight/credit e.g 10.2  e.t.c"
                                        name={`subject_info.${index}.weight`}
                                      />
                                      <ErrorMessage
                                        name={`subject_info.${index}.weight`}
                                        component={PrintErrorMessage}
                                      />
                                    </Col>
                                  </Row>
                                  <hr />
                                </section>
                              ))}
                            </section>
                          );
                        }}
                      </FieldArray>
                    </section>

                    <section className="mt-3 text-end">
                      <button
                        onClick={() => SetModelOpen(!ShowModel)}
                        type="button"
                        className="btn m-1 btn-outline-dark text-light border-info"
                      >
                        see computation
                      </button>
                      <button
                        disabled={formik.isSubmitting}
                        type="submit"
                        className="btn m-1 btn-outline-dark text-light border"
                      >
                        {formik.isSubmitting
                          ? "is computing gpa..."
                          : "compute my gpa"}
                        {formik.isSubmitting && (
                          <Spinner
                            animation="border"
                            size="sm"
                            className="ms-2"
                            variant="success"
                            role="status"
                          />
                        )}
                      </button>
                    </section>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <GPA_computation_model
            ModelOpen={ShowModel}
            SetModelOpen={SetModelOpen}
          />
        </Card.Body>
      </Card>

      <footer className="my-2  text-center p-3">
        <small className="text-light mx-2">Welcome for Bugs on  <a
          target="_blank"
          className="text-light mx-1 text-decoration-none border-bottom"
          href="https://github.com/mrwilbroad"
        >
         Github
        </a>-All sourve code are available!</small>
        <a
          target="_blank"
          className="text-light text-decoration-none border-bottom"
          href="https://github.com/mrwilbroad"
        >
          Developed by mrwilbroad
        </a>
      </footer>
    </section>
  );
};

export default App;
