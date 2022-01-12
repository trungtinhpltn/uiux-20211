import { useAppContext } from "AppContext";
import Popup from "components/Popup";
import Seo from "components/shared/Seo";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getKPIs } from "services/kpi.services";
import { roundNumber } from "utils";

const KPIMMContext = createContext();

export const useKPIMMContext = () => useContext(KPIMMContext);

const Page = ({ listKpi }) => {
  const { setUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [item, setItem] = useState();
  const router = useRouter();

  const seo = useMemo(() => ({
    meta_title: `Đánh giá KPI nhân viên`,
    meta_description: `Đánh giá KPI nhân viên`,
  }));

  useEffect(() => {
    setData(listKpi?.data);
    setLoading(false);
  }, [listKpi]);

  const handleEditClick = (item) => {
    setUser(item);
    router.push(`/kpi-personals/personal`);
  };

  const value = useMemo(() => ({ item, setItem, showPopup, setShowPopup }), [item, showPopup]);

  return (
    <KPIMMContext.Provider value={value}>
      <Seo seo={seo} />
      {showPopup && <Popup />}
      <div className="div pt-10 pb-10">
        <div className="col-12">
          <h1>Đánh giá KPI nhân viên</h1>
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center spinner-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="col-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Vị trí</th>
                  <th scope="col">Số mục tiêu</th>
                  <th scope="col">Kết quả</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, inx) => {
                  const {
                    attributes: { fullName, position, tasks },
                    id,
                  } = item;
                  if (!tasks?.length) {
                    return null;
                  }
                  const finish = tasks?.reduce((pre, next) => pre + next?.finish, 0);
                  const total = tasks?.reduce((pre, next) => pre + next?.weight, 0);
                  return (
                    <tr key={`${fullName}-${id}`}>
                      <th scope="row">{inx + 1}</th>
                      <td>{fullName}</td>
                      <td>{position}</td>
                      <td>{tasks?.length}</td>
                      <td>{`${roundNumber((finish / total) * 100, 2)}%`}</td>
                      <td width={400}>
                        <button
                          type="button"
                          className="btn btn-primary mr-2"
                          style={{ width: `150px` }}
                          onClick={() => {
                            setItem(item);
                            setShowPopup(true);
                          }}
                        >
                          Chi tiết
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          style={{ width: `150px` }}
                          onClick={() => handleEditClick(item)}
                        >
                          Chỉnh sửa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </KPIMMContext.Provider>
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
