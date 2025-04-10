import { SortOption, SortSelect } from '@components/common/sort-select';
import { SearchDebounce } from '@components/common/search-debounce';
import { SortOptionValue } from '@services/post/get-all-posts';

function BlogFilterBlock({
  onSearch,
  onSort,
}: {
  onSearch: (value: string) => void;
  onSort: (value: SortOptionValue) => void;
}) {
  // Sort options
  const sortOptions: SortOption[] = [
    { label: 'Newest', value: 'date_desc' },
    { label: 'Oldest', value: 'date_asc' },
    { label: 'A-Z', value: 'title_asc' },
    { label: 'Z-A', value: 'title_desc' },
  ];
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8 w-full">
      <div className="max-w-sm lg:w-2/5">
        <SearchDebounce onSearch={onSearch} />
      </div>
      <SortSelect options={sortOptions} onChange={onSort} />
    </div>
  );
}

export default BlogFilterBlock;
