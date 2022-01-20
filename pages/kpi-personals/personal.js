import Seo from "components/shared/Seo";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getKPIs, upDateKPIS } from "services/kpi.services";
import { useAppContext } from "AppContext";
import { roundNumber } from "utils";
import DeletePopup from "components/DeletePopup";

const Page = ({ listKpi }) => {
  const cb = useRef(() => {});
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [message, setMessage] = useState(``);
  const [showDelete, setShowDelete] = useState(false);
  const seo = useMemo(() => ({
    meta_title: `KPI cá nhân`,
    meta_description: `KPI cá nhân`,
  }));

  useEffect(() => {
    if (user) {
      setItem(user);
      return;
    }
    const data = listKpi?.data;
    const rd = Math.floor(Math.random() * data?.length);
    setItem(data?.[rd]);
  }, [user, listKpi]);

  const finish = item?.attributes?.tasks?.reduce((pre, next) => pre + next?.finish, 0);
  const total = item?.attributes?.tasks?.reduce((pre, next) => pre + next?.weight, 0);

  const state = useMemo(
    () => ({
      labels: ["Chưa hoàn thành", "Hoàn thành"],
      datasets: [
        {
          label: "Tỉ lệ hoàn thành",
          backgroundColor: ["#B21F00", "#2FDE00"],
          hoverBackgroundColor: ["#501800", "#175000"],
          data: [total - finish, finish],
        },
      ],
    }),
    [finish, total]
  );

  const handleDelete = (type, itemC) => {
    if (type) {
      setMessage(`Bạn có muốn xoá tất mục tiêu hiện tại`);
      setShowDelete(true);
      cb.current = async () => {
        await upDateKPIS(item?.id, {
          data: {
            tasks: [],
          },
        });
        const newData = { ...item, attributes: { ...item?.attributes, tasks: [] } };
        setItem(newData);
        setShowDelete(false);
      };
    } else {
      setMessage(`Bạn có muốn xoá mục tiêu hiện tại`);
      setShowDelete(true);
      cb.current = async () => {
        let tasks = item?.attributes?.tasks;
        tasks = tasks?.filter((item) => item?.id !== itemC?.id);
        await upDateKPIS(item?.id, {
          data: {
            tasks: tasks,
          },
        });
        const newData = { ...item, attributes: { ...item?.attributes, tasks: tasks } };
        setItem(newData);
        setShowDelete(false);
      };
    }
  };

  return (
    <>
      {showDelete && <DeletePopup message={message} setShow={setShowDelete} cb={cb} />}
      <Seo seo={seo} />
      <div className="div pt-10 pb-10">
        <div className="col-12">
          <h1>KPI cá nhân</h1>
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center spinner-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="p-10 per-content"
          style={{ marginLeft: `15px`, marginRight: `15px`, background: `var(--white-color)` }}
        >
          <div className="row align-items-center mb-3">
            <div className="col-4">
              <h3>Họ và tên: {item?.attributes?.fullName}</h3>
              <h5>Chức vụ: {item?.attributes?.position}</h5>
              <h5>
                Người quản lý trực tiếp: {item?.attributes?.manager?.data?.attributes?.fullName}
              </h5>
            </div>
            <div>
              {item?.attributes?.tasks.length > 0 && (
                <Pie
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: "Biểu đồ tỉ lệ",
                      fontSize: 20,
                      position: `top`,
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  }}
                  width={400}
                  height={300}
                />
              )}
            </div>
          </div>
          <div>
            <div className="col-12" style={{ padding: 0 }}>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mục tiêu</th>
                    <th scope="col">Trọng số</th>
                    <th scope="col">Hoàn thành</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" style={{ width: `250px`, textAlign: `center` }}>
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ width: `100px` }}
                        onClick={() => handleDelete(true)}
                      >
                        Xoá tất cả
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item?.attributes?.tasks?.map((item, inx) => {
                    return (
                      <tr key={`${item?.id}`}>
                        <th scope="row">{inx + 1}</th>
                        <td>{item?.task}</td>
                        <td>{item?.weight}</td>
                        <td>{item?.finish}</td>
                        <td>
                          {item?.weight === item?.finish && item?.weight > 0 ? (
                            <b>Đã hoàn thành</b>
                          ) : (
                            `Chưa hoàn thành`
                          )}
                        </td>
                        <td style={{ width: `250px`, textAlign: `center` }}>
                          <button
                            type="button"
                            className="btn btn-warning"
                            style={{ width: `100px`, marginLeft: 5 }}
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: `100px`, marginLeft: 5 }}
                            onClick={() => handleDelete(false, item)}
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {item?.attributes?.tasks?.length > 0 && (
                    <tr className="text-danger">
                      <th colSpan="2">Tổng</th>
                      <th>{total}</th>
                      <th>{`${total === 0 ? 0 : roundNumber((finish / total) * 100, 2)}%`}</th>
                      <th colSpan="2">
                        {finish === total && total > 0 ? `Đã hoàn thành` : `Chưa hoàn thành`}
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const listKpi = (await getKPIs()) || {};
    return {
      props: { listKpi },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default Page;
