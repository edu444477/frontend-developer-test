import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import OompaLoompaCard from '../components/OompaLoompaCard';
import {
  fetchOompaLoompas,
  selectOompaLoompaList,
} from '../store/oompaLoompasSlice';

// Matches the API's fixed page size: each scroll-triggered "reveal" shows
// one more page's worth of items, whether they need a new request or are
// already sitting in the cache.
const PAGE_SIZE = 25;

function MainView() {
  const dispatch = useDispatch();
  const { items, currentPage, totalPages, status } = useSelector(
    selectOompaLoompaList,
  );
  const [query, setQuery] = useState('');
  // How many of the cached items to render. Always starts at one page,
  // even if items already holds hundreds of cached entries from a
  // previous session — how much is on screen is a per-visit concern,
  // separate from whether we need to hit the network again.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);
  const isFiltering = query.trim().length > 0;

  useEffect(() => {
    dispatch(fetchOompaLoompas(1));
  }, [dispatch]);

  const hasMoreCached = visibleCount < items.length;
  const hasMorePages = totalPages === null || currentPage < totalPages;

  useEffect(() => {
    // Pause infinite scroll entirely while searching: a short filtered
    // result list must never be used as an excuse to keep fetching pages
    // the user never scrolled to.
    if (isFiltering) return;
    if (!hasMoreCached && !hasMorePages) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        if (hasMoreCached) {
          // Already downloaded, just not shown yet: reveal it for free.
          setVisibleCount((count) => count + PAGE_SIZE);
          return;
        }

        if (status !== 'loading') {
          dispatch(fetchOompaLoompas(currentPage + 1)).then((result) => {
            if (fetchOompaLoompas.fulfilled.match(result)) {
              setVisibleCount((count) => count + PAGE_SIZE);
            }
          });
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isFiltering, hasMoreCached, hasMorePages, dispatch, currentPage, status]);

  const displayedItems = useMemo(() => {
    if (!isFiltering) return items.slice(0, visibleCount);

    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      return (
        fullName.includes(normalizedQuery) ||
        item.profession.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [items, query, visibleCount, isFiltering]);

  return (
    <div>
      <Header>
        <SearchBar value={query} onChange={setQuery} />
      </Header>

      <div className="py-8 text-center">
        <h1 className="text-2xl font-semibold">Find your Oompa Loompa</h1>
        <p className="text-gray-500">There are more than 100k</p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {displayedItems.map((item) => (
          <OompaLoompaCard key={item.id} oompaLoompa={item} />
        ))}
      </div>

      {displayedItems.length === 0 && status !== 'loading' && (
        <p className="pb-10 text-center text-gray-500">
          No Oompa Loompas found.
        </p>
      )}
      {status === 'loading' && (
        <p className="pb-10 text-center text-gray-500">Loading...</p>
      )}
      {status === 'failed' && (
        <p className="pb-10 text-center text-red-500">
          Something went wrong loading the crew.
        </p>
      )}

      {!isFiltering && <div ref={sentinelRef} className="h-1" />}
    </div>
  );
}

export default MainView;
