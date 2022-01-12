import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useLayoutContext } from "../Layout";
import { menuConfig } from "./menuConfig";

const Menu = () => {
  const { setActiveMenu, activeMenu } = useLayoutContext();
  const router = useRouter();

  useEffect(() => {
    let active = -1;
    if (router?.pathname.startsWith(`/kpi-units/`) || router?.pathname.startsWith(`/kpi-member/`)) {
      active = 1;
    } else if (router?.pathname.startsWith(`/kpi-personals/`)) {
      active = 2;
    }
    setActiveMenu(active);
  }, [router?.pathname]);

  return (
    <ul
      className="menu-select t-white"
      style={{ height: `auto`, minHeight: `975px`, transition: "all 0.3s" }}
    >
      {menuConfig?.map((item) => {
        return (
          <li
            className={`item${item.linkContains.includes(router.pathname) ? ` item-active` : ``}`}
            key={item?.id}
          >
            <a
              className="title p-10"
              onClick={(e) => {
                e.preventDefault();
                if (activeMenu === item?.id) {
                  setActiveMenu(-1);
                  return;
                }
                setActiveMenu(item?.id);
              }}
            >
              {item?.icon}
              <span className="ml-2 font14">{item?.name}</span>
            </a>
            {item?.children && (
              <ul
                className="menu-select-children"
                style={{
                  display: activeMenu === item?.id ? `block` : `none`,
                }}
              >
                {item?.children?.map((cItem, inx) => (
                  <li
                    className={`item${router.pathname === cItem.link ? ` item-active` : ``}`}
                    key={cItem.name + ` ` + inx}
                  >
                    <Link href={cItem?.link}>
                      <a>
                        <i className="fa fa-circle-o" />
                        {cItem?.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
