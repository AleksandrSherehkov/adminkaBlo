import { NavLinkItem } from '../../shared/definitions/navigation';

import { MdOutlineDashboard } from 'react-icons/md';
import { RiShoppingBag2Line } from 'react-icons/ri';
import { FiDatabase } from 'react-icons/fi';

import {
  ManageCompatibilityCombinations,
  ManageDailyRecommendations,
  ManageMonths,
  ManagePersonalities,
  ManageProducts,
  ManageYearlyRecommendations,
  ManageYears,
  ReadCompatibilityCombinations,
  ReadDailyRecommendations,
  ReadMonths,
  ReadPersonalities,
  ReadProducts,
  ReadYearlyRecommendations,
  ReadYears,
} from '../../shared/constants/access-rules';

export const navbarLinks = [
  new NavLinkItem('Dashboard', '/', [], [], MdOutlineDashboard),
  new NavLinkItem('Products', '/products', [ReadProducts, ManageProducts], [], RiShoppingBag2Line),
  new NavLinkItem(
    'Data',
    '',
    [],
    [
      new NavLinkItem('Months', '/months', [ReadMonths, ManageMonths], [],),
      new NavLinkItem('Years', '/years', [ReadYears, ManageYears], [],),
      new NavLinkItem(
        'Compatibility Combinations',
        '/compatibility-combinations',
        [ReadCompatibilityCombinations, ManageCompatibilityCombinations],
        [],
      ),
      new NavLinkItem(
        'Personalities',
        '/personalities',
        [ReadPersonalities, ManagePersonalities],
        [],
      ),
      new NavLinkItem(
        'Daily Recommendations',
        '/daily-recommendations',
        [ReadDailyRecommendations, ManageDailyRecommendations],
        [],
      ),
      new NavLinkItem(
        'Yearly Recommendations',
        '/yearly-recommendations',
        [ReadYearlyRecommendations, ManageYearlyRecommendations],
        [],
      ),
    ],
    FiDatabase
  ),
];
