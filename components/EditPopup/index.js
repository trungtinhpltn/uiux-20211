import { useAppContext } from "AppContext";
import React, { useState } from "react";
import { upDateKPIS } from "services/kpi.services";

const EditPopup = ({ item, setShow, cb = () => {}, user, setItem }) => {
  const [name, setName] = useState(``);
  const [weight, setWeight] = useState(0);
  const [finish, setFinish] = useState(0);
  let tasks = user?.attributes?.tasks;
  tasks = tasks.filter((it) => it?.id !== item?.id);
  const total = tasks?.reduce((pre, next) => pre + next?.weight, 0);

  useState(() => {
    setName(item?.task);
    setWeight(item?.weight);
    setFinish(item?.finish);
  }, [item]);

  const handleClick = async () => {
    if (finish > weight) return;
    if (total + weight > 100) return;
    let newTasks = user?.attributes?.tasks;
    newTasks = newTasks?.map((it) => {
      if (it?.id === item?.id)
        return {
          ...it,
          task: name,
          weight: weight,
          finish: finish,
        };
      return it;
    });
    await upDateKPIS(user?.id, { data: { tasks: newTasks } });
    const newData = { ...user, attributes: { ...user?.attributes, tasks: newTasks } };
    setItem(newData);
    setShow(false);
  };

  return (
    <div className="pop-up">
      <div className="overlay z3" onClick={() => setShow(false)} />
      <div className="pop-up-content z4 p-15" style={{ width: `80%`, maxWidth: `500px` }}>
        <div>
          <div class="form-group">
            <label for="exampleInputEmail1">Tên mục tiêu</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Tên mục tiêu"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Trọng số</label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Trọng số"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value, 10))}
            />
            {total + weight > 100 && <p className="text-danger">Tổng trọng số đã lớn hơn 100</p>}
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Hoàn thành</label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Hoàn thành"
              value={finish}
              onChange={(e) => setFinish(parseInt(e.target.value, 10))}
            />
            {finish > weight && (
              <p className="text-danger">Hoàn thành không được lớn hơn trọng số</p>
            )}
          </div>

          <button type="submit" class="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
