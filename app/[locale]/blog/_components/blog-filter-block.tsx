import { SortOption, SortSelect } from '@/app/[locale]/blog/_components/sort-select';
import { SearchInput } from '@/app/[locale]/blog/_components/search-input';

function BlogFilterBlock({ onSearch, onSort }: { onSearch: (value: string) => void; onSort: (value: string) => void }) {
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
        <SearchInput onSearch={onSearch} />
      </div>
      <SortSelect options={sortOptions} onChange={onSort} />
    </div>
  );
}

export default BlogFilterBlock;
