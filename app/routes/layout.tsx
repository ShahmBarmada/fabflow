import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import Logo from "../../public/logo.png";
import { useState } from "react";
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  Layer,
  SideNavItems,
  SideNavLink,
  Theme,
} from "@carbon/react";
import {
  Search,
  Notification,
  UserAvatar,
  Workspace,
  DataShare,
  OrderDetails,
  List,
  Product,
  Scales,
  SidePanelOpenFilled,
  SidePanelCloseFilled,
} from "@carbon/icons-react";

const links = [
  { title: "Dashboard", ref: "/dashboard", icon: Workspace, children: [] },
  { title: "Operations", ref: "/operations", icon: DataShare, children: [] },
  { title: "Partners", ref: "/partners", icon: OrderDetails, children: [] },
  {
    title: "Inventory",
    ref: "/inventory",
    icon: Product,
    children: [
      { title: "Transactions", ref: "/inventory/transactions" },
      { title: "Stock", ref: "/inventory/stock" },
      { title: "Products", ref: "/inventory/products" },
      { title: "Variants", ref: "/inventory/variants" },
      { title: "Warehouses", ref: "/inventory/warehouses" },
      { title: "Manufacturing", ref: "/inventory/manufacturing" },
    ],
  },
  { title: "Accounts", ref: "/accounts", icon: Scales, children: [] },
  { title: "Tasks", ref: "/tasks", icon: List, children: [] },
];

export default function Layout() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const subSections = links.filter((item) => currentPath.startsWith(item.ref))[0].children;

  return (
    <Theme theme="g90">
      <HeaderContainer
        render={() => (
          <Header aria-label="Header">
            <HeaderGlobalAction aria-label={expanded ? "Close" : "Open"} onClick={() => setExpanded(!expanded)} tooltipAlignment="start">
              {expanded ? <SidePanelCloseFilled size={20} /> : <SidePanelOpenFilled size={20} />}
            </HeaderGlobalAction>

            {links
              .filter((item) => currentPath.startsWith(item.ref))
              .map((item) => (
                <HeaderName
                  key={item.title}
                  onClick={() => navigate(item.ref)}
                  prefix="FabricFlow"
                  className="cursor-pointer"
                  style={{ minWidth: "200px" }}
                >
                  {item.title}
                </HeaderName>
              ))}

            <HeaderNavigation aria-label="Header Navigation">
              {subSections.map((item, index) => (
                <HeaderMenuItem
                  key={index}
                  onClick={() => navigate(item.ref)}
                  isActive={currentPath.startsWith(item.ref)}
                  className="cursor-pointer"
                >
                  {item.title}
                </HeaderMenuItem>
              ))}
            </HeaderNavigation>

            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search">
                <Search size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Notifications">
                <Notification size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="User" tooltipAlignment="end">
                <UserAvatar size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        )}
      />
      <Layer id="content">
        <nav id="sidenav" className={expanded ? "expanded" : undefined}>
          <SideNavItems>
            {expanded && subSections.length > 0 && (
              <HeaderSideNavItems hasDivider={true}>
                {subSections.map((item, index) => (
                  <SideNavLink
                    key={index}
                    onClick={() => navigate(item.ref)}
                    isActive={currentPath.startsWith(item.ref)}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </SideNavLink>
                ))}
              </HeaderSideNavItems>
            )}

            {links.map((item, index) => (
              <SideNavLink
                key={index}
                renderIcon={item.icon}
                large
                onClick={() => navigate(item.ref)}
                isActive={currentPath.startsWith(item.ref)}
                className="cursor-pointer"
              >
                {item.title}
              </SideNavLink>
            ))}
          </SideNavItems>
          <div className="flex place-content-center mb-4">
            <img src={Logo} alt="Logo" className={`w-56 ${expanded ? "opacity-100" : " opacity-0"}`} />
          </div>
        </nav>
        <Theme as="main" theme="g10">
          <Outlet />
        </Theme>
      </Layer>
    </Theme>
  );
}
