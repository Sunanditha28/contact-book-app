export default function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages || 1}
      </span>
      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
