/**
 *
 * DashboardPage
 *
 */

import React, { memo, useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Select,
  Layout,
  Menu,
  Row,
  Button,
  Form,
  Input,
  Col,
  notification,
  Card,
} from 'antd';
// import styled from 'styled-components';
import GutterCol from './style';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);
function DashboardPage() {
  const Context = React.createContext({
    name: 'Default',
  });
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 12,
          },
          wrapperCol: {
            span: 12,
          },
        }
      : null;
  const onSubmit = (values) => {
    const fullName = `${values.firstName} ${values.lastName}`;
    api.success({
      message: 'Success!!',
      description: (
        <Context.Consumer>
          {({ name }) => `${fullName} added successfully`}
        </Context.Consumer>
      ),
      placement: 'topRight',
    });
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };
  const children = [];

  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
    );
  }
  return (
    <Context.Provider
      value={{
        name: 'Ant Design',
      }}
    >
      {contextHolder}
      <Layout style={{ borderTop: '2px solid #fd5d93' }}>
        <Header className="header">
          <div className="logo" />
          <Menu
            bordered={false}
            mode="horizontal"
            style={{
              borderBottom: 'none',
            }}
          >
            <Row>
              <Col xs={12}>
                <Menu.Item
                  style={{
                    position: 'fixed',
                  }}
                >
                  Dashboard
                </Menu.Item>
              </Col>
              <Col
                xs={12}
                style={{
                  float: 'right',
                }}
              ></Col>
            </Row>
          </Menu>
        </Header>
        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <Layout hasSider>
            <Sider
              className="site-layout-background"
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: '0',
                bottom: 0,
                marginTop: '50px',
                marginLeft: ' 20px',
                borderRadius: '5px',
                background: 'linear-gradient(0deg,#ec250d 0,#fd5d93 100%)',
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                bordered={false}
                style={{
                  background: 'transparent',
                  border: 'none',
                }}
                items={items2}
              >
                <Row>
                  <Col>vievk</Col>
                </Row>
              </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content
                style={{
                  padding: '0 24px',
                  minHeight: 'calc(90vh - 40px)',
                }}
              >
                <Card bordered={false}>
                  <Form
                    name="basic"
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{
                      layout: formLayout,
                    }}
                    onFinish={onSubmit}
                  >
                    <Row>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="First Name"
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your First Name!',
                            },
                            {
                              min: 5,
                              message:
                                'Minimumn 5 characters required in First Name',
                            },
                            {
                              max: 20,
                              message:
                                'Maximum 20 characters allowed in First Name',
                            },
                          ]}
                        >
                          <Input placeholder="Enter First Name" allowClear />
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Last Name"
                          name="lastName"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Last Name!',
                            },
                            {
                              min: 5,
                              message:
                                'Minimumn 5 characters required in Last Name',
                            },
                            {
                              max: 20,
                              message:
                                'Maximum 20 characters allowed in Last Name',
                            },
                          ]}
                        >
                          <Input placeholder="Enter Last Name" allowClear />
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Pan Number"
                          name="panNumber"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Pan Number!',
                            },
                            {
                              pattern:
                                /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                              message: 'Invalid Pan Number Format!',
                            },
                          ]}
                        >
                          <Input placeholder="Enter Pan Number" allowClear />
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Email!',
                            },
                            {
                              pattern:
                                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                              message: 'Invalid Email Pattern',
                            },
                            {
                              max: 50,
                              message: 'Maximum 50 characters allowed in Email',
                            },
                          ]}
                        >
                          <Input placeholder="Enter EmailID" allowClear />
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Mobile Number"
                          name="mobile"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Mobile Number!',
                            },
                            {
                              max: 10,
                              message:
                                "Mobile number cann't be greater than 10 digits",
                            },
                            {
                              pattern: /^[0-9]{10}$/,
                              message: 'Invalid Mobile number patttern',
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter Mobile Number"
                            stringMode
                            style={{ width: '100%' }}
                            allowClear
                          />
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Designation"
                          name="designation"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Designation!',
                            },
                            {
                              min: 10,
                              message:
                                'Minimumn 10 characters required in Designation!',
                            },
                            {
                              max: 50,
                              message:
                                'Maximum 50 characters allowed in Designation!',
                            },
                          ]}
                        >
                          <Input placeholder="Enter Designation" allowClear />
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Reporting To"
                          name="reportingTo"
                          rules={[
                            {
                              required: true,
                              message: 'Please select Reporting To!',
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Reporting to"
                            showSearch
                            optionFilterProp="children"
                            style={{
                              width: '100%',
                            }}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                          </Select>
                        </Form.Item>
                      </GutterCol>
                      <GutterCol xs={24} sm={24} lg={12} xl={8}>
                        <Form.Item
                          label="Branches"
                          name="branches"
                          rules={[
                            {
                              required: true,
                              message: 'Please Select User Branches!',
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select User Branches"
                            mode="multiple"
                            style={{
                              width: '100%',
                            }}
                            optionFilterProp="children"
                            tokenSeparators={[',']}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            {children}
                          </Select>
                        </Form.Item>
                      </GutterCol>

                      <GutterCol xs={24}>
                        <Row>
                          <Col xs={24} sm={24} lg={12} xl={8}>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </GutterCol>
                    </Row>
                  </Form>
                </Card>
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                }}
              >
                <Row>
                  <Col xs={2}>
                    <Link to="/dashboard">Team</Link>
                  </Col>
                  <Col xs={2}>
                    <Link to="/dashboard">Blog</Link>
                  </Col>
                  <Col xs={2}>
                    <Link to="/dashboard">About Us</Link>
                  </Col>
                  <Col xs={12} />
                  <Col xs={6}>
                    <span>© 2022 made by Vivek Goel.</span>
                  </Col>
                </Row>
              </Footer>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    </Context.Provider>
  );
}

DashboardPage.propTypes = {};

export default memo(DashboardPage);
