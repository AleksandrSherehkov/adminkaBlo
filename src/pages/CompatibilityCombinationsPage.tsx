import ImportBar from '../shared/components/import/ImportBar';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { DataPageType } from '../shared/definitions/imports';

const CompatibilityCombinationsPage = () => {
  return (
    <>
      <Title text="Compatibility Combinations" />
      <ScrollableContent>
        <ImportBar type={DataPageType.CompatibilityCombinations} />
      </ScrollableContent>
    </>
  );
};

export default CompatibilityCombinationsPage;
