import ImportBar from '../shared/components/import/ImportBar';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { DataPageType } from '../shared/definitions/imports';

const YearsPage = () => {
  return (
    <>
      <Title text="Years" />
      <ScrollableContent>
        <ImportBar type={DataPageType.Years} />
      </ScrollableContent>
    </>
  );
};

export default YearsPage;
