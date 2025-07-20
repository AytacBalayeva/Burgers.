import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Button from "../components/Button";

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });

        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
  console.log(paypal);
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data.message || err.message);
      }
    });
  }

  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success("Payment successful");
  // }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="w-[80%] md:w-[70%] mx-auto my-[2rem]">
      <h1 className="!text-[#502314] ml-3">Order : {order._id}</h1>
      <hr className="h-px  bg-[#5023145] border-0 dark:bg-[#502314] " />
      <div className="grid md:grid-cols-[2fr_1fr]">
        {" "}
        <Col>
          <ListGroup>
            <ListGroup.Item className="!bg-transparent !border-none !border-2 !text-[#502314]">
              <h2 className="text-[2.2rem] mb-4">Shipping</h2>
              <p className="text-[1.5rem]">
                <strong>Name : </strong>
                {order.user.name}
              </p>
              <p className="text-[1.5rem]">
                <strong>Email : </strong>
                {order.user.email}
              </p>
              <p className="text-[1.5rem]">
                <strong>Address : </strong>
                {order.shippingAddress.address},{order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
              <hr className="h-px  bg-[#5023145] border-0 dark:bg-[#502314] " />
            </ListGroup.Item>
            <ListGroup.Item className="!bg-transparent !border-none !border-2 !text-[#502314]">
              <h2 className="text-[2.2rem] mb-4">Payment Method</h2>
              <div className="text-[1.5rem]">
                <strong>Method : </strong>
                {order.paymentMethod}
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </div>
              <hr className="h-px  bg-[#5023145] border-0 dark:bg-[#502314] " />
            </ListGroup.Item>
            <ListGroup.Item className="!bg-transparent !border-none !border-2 !text-[#502314]">
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="!bg-transparent !border-[#50231455]"
                  >
                    <Row className="flex items-center ">
                      <Col>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className=" w-[50%]"
                        />
                      </Col>
                      <Col className="flex items-center">
                        <Link
                          to={`/product/${item.id}`}
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
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card className="!bg-transparent  p-[1rem] mb-[10rem] !border-none  ">
            <ListGroup>
              <ListGroup.Item className="!bg-transparent !border-[#50231455]">
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Items:</Col>
                  <Col className="text-end font-bold">${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Shipping:</Col>
                  <Col className="text-end font-bold">
                    ${order.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem]">
                <Row>
                  <Col>Tax:</Col>
                  <Col className="text-end font-bold">${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="!bg-transparent !border-[#50231455] text-[1.5rem] !mb-[2rem] ">
                <Row>
                  <Col>Total:</Col>
                  <Col className="text-end font-bold">${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div className="p-[2rem] ">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      variant="submit"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default OrderScreen;
