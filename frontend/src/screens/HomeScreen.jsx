import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        </div>
      ) : (
        <>
          <div className="bg-[#502314]  text-[5.5rem] h-[16rem] flex justify-center items-center font-extrabold mt-[-1rem]  ">
            <span className="text-[#f5ebdc]">Our Menu</span>
          </div>
          <div className="mb-4">
            {" "}
            <div className=" grid grid-cols-1 gap-[4rem] px-10 py-[2rem]  md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 w-[90%]  mx-auto mt-[2rem] items-center ">
              {data.products.map((item) => (
                <Product key={item._id} item={item} />
              ))}
            </div>
            <div className="pb-4">
              {" "}
              <Paginate pages={data.pages} page={data.page} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
