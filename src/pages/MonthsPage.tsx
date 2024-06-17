import ImportBar from '../shared/components/import/ImportBar';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { DataPageType } from '../shared/definitions/imports';

const MonthsPage = () => {
  return (
    <>
      <Title text="Months" />
      <ScrollableContent>
        <ImportBar type={DataPageType.Months} />
      </ScrollableContent>
    </>
  );
};

export default MonthsPage;
