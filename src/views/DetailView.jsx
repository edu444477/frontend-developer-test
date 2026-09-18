import { useParams } from 'react-router-dom';

function DetailView() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Oompa Loompa #{id}</h1>
    </div>
  );
}

export default DetailView;
