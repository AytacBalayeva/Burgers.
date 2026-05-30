import { useParams, useNavigate, Link } from "react-router-dom";
import { Image, Form, ListGroup, FormControl } from "react-bootstrap";
import { Rating } from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { toast } from "react-toastify";
export const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="my-[4rem]">
      <div className="w-[80%] md:w-[95%] xl:w-[80%] mx-auto ">
        <Button to="/" variant="back">
          Go Back
        </Button>

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
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr] md:gap-[3rem]  lg:gap-[5rem]  items-center ">
              <div className="flex items-center justify-center">
                <Image src={product.image} alt={product.name} fluid />
              </div>
              <div className="grid  border-[1px] border-[#50231455] rounded-lg mb-[4rem] max-h-[30rem] md:max-h-[45rem] lg:max-h-[35rem]">
                <div className="text-[3rem] px-[2rem] py-[1rem] flex items-center">
                  {product.name}
                </div>
                <div className=" border-y-[1px] border-[#50231455] flex items-center pl-8">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <div className="p-[2rem] text-[1.5rem] flex items-center">
                  <span>Decription : {product.description}</span>
                </div>
              </div>
              <div className="grid  border-[1px] border-[#50231455] rounded-lg mb-[4rem] max-h-[30rem]  md:w-[25rem] ">
                <div className="text-[1.7rem] px-[2rem] py-[1rem] flex items-center">
                  Price : $ {product.price}
                </div>
                <div className="text-[1.7rem] px-[2rem] py-[1rem] flex items-center border-y-[1px] border-[#50231455]">
                  Status : {product.isAvailable ? "Available" : "Not available"}
                </div>
                {product.isAvailable && (
                  <div className=" px-[2rem] py-[1rem] text-[1.7rem] flex justify-between items-center border-b-[1px] border-[#50231455] ">
                    <span> Quantity : </span>
                    <div className="w-[8rem] ">
                      <Form.Control
                        value={qty}
                        as="select"
                        onChange={(e) => setQty(+e.target.value)}
                        className="!text-[1.8rem] cursor-pointer"
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            className="text-[1.7rem]  "
                          >
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </div>
                )}

                <div className="p-[2rem] text-[1.5rem] flex items-center">
                  <Button variant="submit" onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="review mb-[2rem] max-w-[60rem] !pr-0 ">
              <div md={6}>
                <h2 className="mb-4">Reviews</h2>
                {product.reviews.length === 0 && (
                  <p className="!bg-red-100 border-1 rounded-lg !border-red-200 text-2xl px-4 py-2 mr-4">
                    No Reviews
                  </p>
                )}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item
                      key={review._id}
                      className=" !bg-transparent  !border-[1px] !rounded-lg !border-[#50231455] text-[1.2rem] !text-[#502314] mb-8"
                    >
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className="!bg-transparent  mb-[4rem] !pl-0 !rounded-lg !text-[#502314]">
                    <h2 className="mb-4">Write a Customer Review </h2>
                    {loadingProductReview && <Loader />}
                    {userInfo ? (
                      <Form
                        onSubmit={submitHandler}
                        className="!bg-transparent"
                      >
                        <Form.Group controlId="rating">
                          <Form.Label className="font-bold text-[1.2rem]">
                            Rating
                          </Form.Label>
                          <FormControl
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="!text-[#502314] !text-[1.2rem]"
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </FormControl>
                        </Form.Group>
                        <Form.Group controlId="comment" className="my-2">
                          <Form.Label className="font-bold text-[1.2rem]">
                            Comment
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="!text-[1.2rem]"
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="submit"
                          variant="submit"
                          disabled={loadingProductReview}
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <p className="!bg-red-100 border-1 rounded-lg !border-red-200 text-2xl px-4 py-2 ">
                        Please{" "}
                        <Link to="/login" className=" !underline">
                          sign in
                        </Link>{" "}
                        to write a review
                      </p>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductScreen;
