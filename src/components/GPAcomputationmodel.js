import React, { useEffect } from "react";
import { Modal, Table } from "react-bootstrap";

const GPAcomputationmodel = ({
  ModelOpen,
  SetModelOpen,
  children,
  ...props
}) => {
  useEffect(() => {}, [ModelOpen, SetModelOpen, props]);

  return (
    <div>
      <Modal
        as="section"
        centered
        show={ModelOpen}
        onHide={SetModelOpen}
        size="lg"
      >
        <Modal.Header
          as="section"
          className="bgc-dark-blue text-light"
          closeButton
        >
          <Modal.Title as="p" className="fw-bold">
            Grading System used to calculate GPA from Raw Marks!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body as="section" className="bgc-dark-blue">
          <Table striped bordered responsive hover>
            <thead className="table-dark">
              <tr>
                <th>Grade</th>
                <th>Range of Marks(%)</th>
                <th>Equation</th>
                <th>Grade Point</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>70-80%</td>
                <td>Y=0.02X + 3</td>
                <td>4.4-5.0</td>
                <td>Excellent</td>
              </tr>

              <tr>
                <td>B+</td>
                <td>60-69.9%</td>
                <td>Y=0.04X + 1.6</td>
                <td>4.0-4.3</td>
                <td>very Good</td>
              </tr>

              <tr>
                <td>B</td>
                <td>50-59.9%</td>
                <td>Y=0.1X - 2</td>
                <td>3.0-3.9</td>
                <td>Good</td>
              </tr>

              <tr>
                <td>C</td>
                <td>40-59.9%</td>
                <td>Y=0.1X - 2</td>
                <td>2.0-2.9</td>
                <td>Satisfactory</td>
              </tr>

              <tr>
                <td>D</td>
                <td>35-39.9%</td>
                <td>Y=0.2X - 6</td>
                <td>1.0-1.9</td>
                <td>Marginal Fail</td>
              </tr>

              <tr>
                <td>E</td>
                <td>0-34.9%</td>
                <td>Y=(1/35)X</td>
                <td>0-0.9</td>
                <td>Absolute Fail</td>
              </tr>
            </tbody>
          </Table>
          <h6 className="text-center text-light fw-bold">
            Where Y = Grade Point and X = Raw mark (%)
          </h6>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GPAcomputationmodel;
