import ImportBar from '../shared/components/import/ImportBar';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { DataPageType } from '../shared/definitions/imports';

const YearlyRecommendationsPage = () => {
  return (
    <>
      <Title text="Yearly Recommendations" />
      <ScrollableContent>
        <ImportBar type={DataPageType.YearlyRecommendations} />
      </ScrollableContent>
    </>
  );
};

export default YearlyRecommendationsPage;
