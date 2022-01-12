import { useKPIMMContext } from "pages/kpi-member/manager";
import React from "react";
import { roundNumber } from "utils";

const Popup = () => {
  const { setShowPopup, item } = useKPIMMContext();
  const {
    attributes: { fullName, position, tasks },
    id,
  } = item;
  const finish = tasks?.reduce((pre, next) => pre + next?.finish, 0);
  const total = tasks?.reduce((pre, next) => pre + next?.weight, 0);
  return (
    <div className="pop-up">
      <div className="overlay z3" onClick={() => setShowPopup(false)} />
      <div className="pop-up-content z4 p-15">
        <h3>Họ và tên: {fullName}</h3>
        <h5>Số mục tiêu: {tasks?.length}</h5>
        <h5>Đã hoàn thành: {`${roundNumber((finish / total) * 100, 2)}%`}</h5>
        <div className="pop-up-conten-table">
          <table className="table table-bordered table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mục tiêu</th>
                <th scope="col">Trọng số</th>
                <th scope="col">Hoàn thành</th>
                <th scope="col">Trạng thái</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((item, inx) => {
                return (
                  <tr key={`${fullName}-${item?.id}`}>
                    <th scope="row">{inx + 1}</th>
                    <td>{item?.task}</td>
                    <td>{item?.weight}</td>
                    <td>{item?.finish}</td>
                    <td>
                      {item?.weight === item?.finish ? <b>Đã hoàn thành</b> : `Chưa hoàn thành`}
                    </td>
                    <td style={{ width: `150px`, textAlign: `center` }}>
                      <button type="button" className="btn btn-warning">
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th colSpan="2">Tổng</th>
                <th>{total}</th>
                <th>{`${roundNumber((finish / total) * 100, 2)}%`}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Popup;
