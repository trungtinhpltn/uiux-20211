import { getRequest, putRequest } from "utils/request";

const serviceURL = `https://ui-ux-mtt.herokuapp.com`;

export async function getKPIs() {
  const url = serviceURL + `/api/kpis?populate=*&sort=fullName:asc`;
  return await getRequest(url);
}

export async function upDateKPIS(id, data) {
  const url = serviceURL + `/api/kpis/${id}?populate=*`;
  return await putRequest(url, data);
}
