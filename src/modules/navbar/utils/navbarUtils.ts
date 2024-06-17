import { navbarLinks } from '../navLinks';
import { SignInData } from '../../../shared/definitions/auth';
import { hasAnyAccessRule } from '../../../shared/utils/access-utils';
import { NavLinkItem } from '../../../shared/definitions/navigation';

export const getVisibleNavLinks = (user: SignInData) =>
    filterLinks(navbarLinks, user);

const filterLinks = (items: NavLinkItem[], user: SignInData) : NavLinkItem[] => {
    return items
        .filter(x =>
        (
            x.accessRules.length == 0
            || hasAnyAccessRule(user, x.accessRules)
        )).map(x => new NavLinkItem(
            x.text,
            x.href,
            x.accessRules,
            filterLinks(x.children, user),
            x.icon)
        ).filter(x => x.href.length > 0 || x.children.length > 0);
}
