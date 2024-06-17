import ImportBar from '../shared/components/import/ImportBar';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { DataPageType } from '../shared/definitions/imports';

const PersonalitiesPage = () => {
  return (
    <>
      <Title text="Personalities" />
      <ScrollableContent>
        <ImportBar type={DataPageType.Personalities} />
      </ScrollableContent>
    </>
  );
};

export default PersonalitiesPage;
