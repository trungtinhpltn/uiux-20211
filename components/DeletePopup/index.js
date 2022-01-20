import React from "react";

const DeletePopup = ({ message, setShow, cb = () => {} }) => {
  return (
    <div className="pop-up">
      <div className="overlay z3" onClick={() => setShow(false)} />
      <div
        className="pop-up-content z4 p-15 text-center"
        style={{ width: `80%`, maxWidth: `500px` }}
      >
        <h3>{message}</h3>
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: `5px`, width: `75px` }}
            onClick={() => setShow(false)}
          >
            Huỷ
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: `5px`, width: `75px` }}
            onClick={() => cb.current()}
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
