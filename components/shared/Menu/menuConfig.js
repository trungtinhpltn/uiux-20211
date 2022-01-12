export const menuConfig = [
  {
    id: 1,
    name: `KPI đơn vị`,
    icon: <i className="fa fa-dashboard" />,
    children: [
      {
        id: 1,
        link: `/kpi-units/create`,
        name: `Khởi tạo KPI đơn vị`,
      },
      {
        id: 2,
        link: `/kpi-units/dashboard`,
        name: `Dashboard KPI đơn vị`,
      },
      {
        id: 3,
        link: `/kpi-units/manager`,
        name: `Quản lý KPI đơn vị`,
      },
      {
        id: 4,
        link: `/kpi-units/statistic`,
        name: `Phân tích tính hợp lý trong thiết lập KPI đơn vị`,
      },
      {
        id: 5,
        link: `/kpi-member/dashboard`,
        name: `DashBoard KPI nhân viên`,
      },
      {
        id: 6,
        link: `/kpi-member/manager`,
        name: `Đánh giá KPI nhân viên`,
      },
    ],
    linkContains: [
      `/kpi-units/create`,
      `/kpi-units/dashboard`,
      `/kpi-units/manager`,
      `/kpi-units/statistic`,
      `/kpi-member/dashboard`,
      `/kpi-member/manager`,
    ],
  },
  {
    id: 2,
    name: `KPI cá nhân`,
    icon: <i className="fa fa-dashboard" />,
    children: [
      {
        id: 1,
        link: `/kpi-personals/personal`,
        name: `KPI cá nhân`,
      },
    ],
    linkContains: [`/kpi-personals/personal`],
  },
];
