import ImportBar from '../shared/components/import/ImportBar';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { DataPageType } from '../shared/definitions/imports';

const DailyRecommendationsPage = () => {
  return (
    <>
      <Title text="Daily Recommendations" />
      <ScrollableContent>
        <ImportBar type={DataPageType.DailyRecommendations} />
      </ScrollableContent>
    </>
  );
};

export default DailyRecommendationsPage;
