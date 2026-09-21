import { Link } from 'react-router-dom';
import { setRememberedScrollY } from '../views/mainViewMemory';

function OompaLoompaCard({ oompaLoompa }) {
  const { id, firstName, lastName, gender, profession, image } = oompaLoompa;

  return (
    <Link
      to={`/${id}`}
      // Captured here, synchronously on click, because it's the only
      // moment guaranteed to run before the route (and the DOM) changes.
      // By the time MainView unmounts, the browser has already swapped
      // in the shorter detail page and clamped window.scrollY down, so
      // reading it any later (an effect cleanup, a scroll listener) can
      // pick up that already-collapsed value instead of the real one.
      onClick={() => setRememberedScrollY(window.scrollY)}
      className="block overflow-hidden rounded-lg shadow transition hover:shadow-lg"
    >
      <img
        src={image}
        alt={`${firstName} ${lastName}`}
        className="h-40 w-full object-cover"
      />
      <div className="bg-white p-3">
        <p className="font-semibold text-gray-900">
          {firstName} {lastName}
        </p>
        <p className="text-sm text-gray-500">{gender}</p>
        <p className="text-sm italic text-gray-500">{profession}</p>
      </div>
    </Link>
  );
}

export default OompaLoompaCard;
