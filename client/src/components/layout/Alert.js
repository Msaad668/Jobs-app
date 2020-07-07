import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      class={` mx-auto  alert alert-${alert.alertType}`}
      role="alert"
      style={{ marginBottom: "0px" }}
    >
      <p class="marginleft-3" style={{ fontSize: "1.3rem" }}>
        - {alert.msg}
      </p>
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Alert);
