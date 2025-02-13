import { Component } from "solid-js";
import TBDBrackets from "../../assets/tbd-brackets.svg";
import BenriWatermark from "../../assets/benri-watermark.png";
import "./Header.scss";
import { A } from "@solidjs/router";
import routes from "../../routes/routes";
import Icon, {
  ArrowRight,
  Bell,
  ChevronDown,
  ExternalArrow,
  Plus,
} from "../../icons/Icon";
import NotifyBlock, { NotifyBlockContent } from "../NotifyBlock/NotifyBlock";
import { store } from "../../utils/store";

const Header: Component<{ username: string }> = (props) => {
  return (
    <header>
      <div class="header">
        <div>
          <div class="header-logo">
            <img src={TBDBrackets} alt="TBD logo" width="60" />
            <span class="header-logo-title">
              <span class="header-logo-title-username">{props.username}</span>
              <span>SSI Admin Console</span>
            </span>
          </div>
        </div>
        <div class="secondary-nav">
          <a
            target="_blank"
            href="https://developer.tbd.website/docs/apis/ssi-service/"
            class="primary-button"
          >
            Docs <Icon svg={ExternalArrow} />
          </a>
          <div class="secondary-nav-menu">
            <button
              title="Notifications menu"
              class="secondary-nav-menu-icon has-notification"
            >
              <Icon svg={Bell} />
            </button>
            <div class="secondary-nav-menu-submenu notifications-submenu">
              <ul>
                {notifications &&
                  notifications.map((notification) => (
                    <li>
                      <NotifyBlock content={notification} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div class="secondary-nav-menu">
            <button title="Create menu" class="secondary-nav-menu-icon">
              <Icon svg={Plus} />
              <Icon svg={ChevronDown} />
            </button>
            <div class="secondary-nav-menu-submenu create-submenu">
              <ul>
                {createMenu &&
                  createMenu.map((createItem) => (
                    <li>
                      <A href={createItem.href}>
                        <div>
                          <Icon svg={Plus} /> {createItem.title}
                        </div>
                        <Icon svg={ArrowRight} />
                      </A>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="header-logo header-subheading">
        <span class="lowercase">hosted by</span>
        <img src={BenriWatermark} alt="Benri logo" width="84" />
      </div>

      <div class="primary-nav">
        <nav>
          <ul>
            {routes.map((route) => (
              <li>
                <A href={route.path} end={route.path === "/"}>
                  {route.name}
                </A>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

export const notifications: NotifyBlockContent[] = [
  {
    title: "View applications",
    href: "/credentials/applications",
    hasNotify: !!store.applications?.length,
    ...(!!store.applications?.length && {
      message: "You have pending applications to resolve",
    }),
  },
  {
    title: "View submissions",
    href: "/verification/submissions",
    hasNotify: store.submissions && !!Object.values(store.submissions)?.length,
    ...(store.submissions &&
      !!Object.values(store.submissions)?.length && {
        message: "You have pending applications to resolve",
      }),
  },
];

const createMenu = [
  {
    title: "New credential",
    href: "/credentials",
  },
  {
    title: "New submission link",
    href: "/verification",
  },
];
