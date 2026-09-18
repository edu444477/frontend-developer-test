import { Link } from 'react-router-dom';

function OompaLoompaCard({ oompaLoompa }) {
  const { id, firstName, lastName, gender, profession, image } = oompaLoompa;

  return (
    <Link
      to={`/${id}`}
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
