import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import Header from '../components/Header';
import {
  fetchOompaLoompaDetail,
  selectOompaLoompaDetail,
} from '../store/oompaLoompasSlice';

function DetailView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const entry = useSelector(selectOompaLoompaDetail(id));

  useEffect(() => {
    dispatch(fetchOompaLoompaDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <Header />

      {!entry?.data && entry?.status === 'loading' && (
        <p className="py-10 text-center text-gray-500">Loading...</p>
      )}

      {!entry?.data && entry?.status === 'failed' && (
        <p className="py-10 text-center text-red-500">
          Something went wrong loading this Oompa Loompa.
        </p>
      )}

      {entry?.data && (
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10 sm:flex-row">
          <img
            src={entry.data.image}
            alt={`${entry.data.firstName} ${entry.data.lastName}`}
            className="h-64 w-full rounded-lg object-cover sm:w-64 sm:flex-shrink-0"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {entry.data.firstName} {entry.data.lastName}
            </p>
            <p className="text-sm text-gray-500">{entry.data.gender}</p>
            <p className="text-sm italic text-gray-500">
              {entry.data.profession}
            </p>
            <div
              className="mt-4 text-sm leading-relaxed text-gray-700"
              // Sanitized before interpreting it: the API can embed real
              // HTML here, but nothing guarantees it will never include a
              // script.
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(entry.data.description),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailView;
