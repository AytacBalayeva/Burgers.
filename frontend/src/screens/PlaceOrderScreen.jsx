import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Button from "../components/Button";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";
const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    } else {
      navigate("/placeorder");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      navigate(`/order/${res._id}`);
      dispatch(clearCartItems());
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="w-[80%] lg:w-[50%] mx-auto ">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid gap-[2rem]">
        <Col>
          <ListGroup>
            <ListGroup.Item className="!bg-transparent !border-none !border-2 !text-[#502314]">
              <h2>Shipping</h2>
              <p className="text-[1.5rem]">
                <strong>Address : </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode}
              </p>
            </ListGroup.Item>
            <hr className="h-px  bg-[#5023145] border-0 dark:bg-[#502314] m-0 mb-2" />
            <ListGroup.Item className="!bg-transparent !border-none !border-2 !text-[#502314]">
              <h2>Payment Method</h2>
              <p className="text-[1.5rem]">
                <strong>Method : </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <hr className="h-px  bg-[#5023145] border-0 dark:bg-[#502314] m-0" />
            <ListGroup.Item className="!bg-transparent !border-none !border-2 !text-[rgb(80,35,20)]">
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="!bg-transparent !border-[#50231455]"
                    >
                      <Row className="flex items-center ">
                        <Col>
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="md:w-[40%]"
                          />
                        </Col>
                        <Col className="flex items-center">
                          <Link
                            to={`/product/${item._id}`}
                            className=" md:text-[1.5rem]  text-[1.2rem] no-underline text-[#502314] font-bold "
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col className="flex items-center md:text-[1.5rem]  text-[1.2rem] no-underline text-[#502314] font-bold ">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card className="!bg-transparent mb-[4rem] p-[1rem] ">
            <ListGroup variant="flush">
              <ListGroup.Item className="!bg-transparent !border-[#50231455]">
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Items:</Col>
                  <Col className="text-end font-bold">${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Shipping:</Col>
                  <Col className="text-end font-bold">
                    ${cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Tax:</Col>
                  <Col className="text-end font-bold">${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Total:</Col>
                  <Col className="text-end font-bold">${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-none">
                {error && (
                  <Message variant="danger">
                    {error?.data?.message || error.error}
                  </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !flex !justify-center">
                <Button
                  type="submit"
                  variant="submit"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
