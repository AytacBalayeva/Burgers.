import React from "react";
import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import FormControl from "../components/FormControl";
import Button from "../components/Button";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <h1 className="w-[90%] mx-auto">Edit Profile</h1>
      <Row className="w-[90%]  mx-auto ">
        <Col md={3} className="!mt-[6rem]">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label className="text-[1.2rem]">Name</Form.Label>
              <FormControl
                value={name}
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label className="text-[1.2rem]">Email Address</Form.Label>
              <FormControl
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label className="text-[1.2rem]">Password </Form.Label>
              <FormControl
                value={password}
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-2">
              <Form.Label className="text-[1.2rem]">
                Confirm Password{" "}
              </Form.Label>
              <FormControl
                value={confirmPassword}
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Button type="submit" variant="update">
              Update
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="max-w-[90rem] w-full mt-[5.8rem] mx-auto">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes className="text-red-600 inline-block" />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes className="text-red-600 inline-block" />
                        )}
                      </td>
                      <td className="hover:bg-[#5f2e122b] w-[8rem]">
                        <Button to={`/order/${order._id}`} variant="details">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
