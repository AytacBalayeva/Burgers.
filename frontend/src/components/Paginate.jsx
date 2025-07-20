import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center my-6 space-x-4 text-white text-[1.5rem]">
        {page > 1 && (
          <Link
            to={
              !isAdmin ? `/page/${page - 1}` : `/admin/productlist/${page - 1}`
            }
            className="px-4 py-2 bg-[#502314] rounded hover:bg-[#502314de]"
          >
            &lt;
          </Link>
        )}

        {Array.from({ length: 5 }, (_, i) => i + page)
          .filter((p) => p <= pages)
          .map((p) => (
            <Link
              key={p}
              to={!isAdmin ? `/page/${p}` : `/admin/productlist/${p}`}
              className={`px-4 py-2 rounded ${
                p === page
                  ? "bg-[#0eaa76]"
                  : "bg-[#502314] hover:bg-[#502314de]"
              }`}
            >
              {p}
            </Link>
          ))}

        {page + 5 <= pages && (
          <span className="px-4 py-2 text-gray-400">...</span>
        )}

        {page < pages && (
          <Link
            to={
              !isAdmin ? `/page/${page + 1}` : `/admin/productlist/${page + 1}`
            }
            className="px-4 py-2 bg-[#502314] rounded hover:bg-[#502314de]"
          >
            &gt;
          </Link>
        )}
      </div>
    )
  );
};

export default Paginate;
