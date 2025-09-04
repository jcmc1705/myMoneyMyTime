import "./Pagination.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (newPage: number) => void;
};
const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="container-pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
