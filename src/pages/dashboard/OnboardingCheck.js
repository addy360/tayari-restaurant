import React from "react";

export default function OnboardingCheck({
  typesCount,
  tablesCount,
  menuItemsCount,
}) {
  return (
    <div className="row mt-3">
      {typesCount == 0 && (
        <div className="col-md-4">
          <div
            className="card shadow"
            style={{ width: "100%", background: "#fffff" }}
          >
            <div className="card-body text-center">
              <p>
                Add food types so that you can be albe to add menu items
              </p>
            </div>
          </div>
        </div>
      )}
      {tablesCount == 0 && (
        <div className="col-md-4">
          <div
            className="card shadow"
            style={{ width: "100%", background: "#fffff" }}
          >
            <div className="card-body text-center">
              <p>Add tables so that users can make orders from them</p>
            </div>
          </div>
        </div>
      )}
      {menuItemsCount == 0 && (
        <div className="col-md-4">
          <div
            className="card shadow"
            style={{ width: "100%", background: "#fffff" }}
          >
            <div className="card-body text-center">
              <p>
                Add Menu items so that customers can order from your restaurant
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
