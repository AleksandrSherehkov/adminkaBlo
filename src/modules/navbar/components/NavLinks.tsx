import { NavLink } from 'react-router-dom';
import { NavLinkProps } from '../../../shared/definitions/navigation';

export const NavLinks = (props: NavLinkProps) => {
  return (
    props.links.length > 0 && (
      <ul className="flex w-full flex-col gap-2 gap-1">
        {props.links.map((link, index) => (
          <li key={index} className="">
            {link.href.length > 0 ? (
              <NavLink
                to={link.href}
                aria-current="page"
                className={"flex items-center gap-2 " + (link.icon ? "px-3" : "pl-6 pr-3") + " py-2 font-normal hover:font-semibold rounded"}
              >
                {link.icon && <link.icon className="text-xl" />}
                <span>{link.text}</span>
              </NavLink>
            ) : (
              <span className={"flex items-center gap-2 font-light-white rounded bg-slate-50 " + (link.icon ? "px-3" : "pl-6 pr-3") + " py-2"}>
                {link.icon && <link.icon className="text-xl" />}
                <label>{link.text}</label>
              </span>
            )}
            <NavLinks links={link.children}></NavLinks>
          </li>
        ))}
      </ul>
    )
  );
};
