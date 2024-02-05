import React, { useEffect, useState } from "react";
import { Popconfirm, Button, Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  loadStatus,
  deleteUser,
  resetDeleteUserStatus,
  resetAddUserStatus,
} from "../../redux/dataSlice";
import MyForm from "./form";

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const dataState = useSelector((state) => state.dataSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const deleteClick = (id) => {
    dispatch(deleteUser(id));
    dispatch(resetDeleteUserStatus());
  };
  const columns = [
    {
      title: "name",
      key: "name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "birth",
      key: "birth",
      dataIndex: "birth",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      key: "address",
      dataIndex: "address",
      width: "20%",
      editable: true,
    },
    {
      title: "home",
      key: "home",
      dataIndex: "hometown",
      width: "20%",
      editable: true,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phoneNumber",
      width: "10%",
      editable: true,
    },
    {
      title: "email",
      key: "email",
      dataIndex: "email",
      width: "10%",
      editable: true,
    },
    {
      title: "Student Id",
      key: "student",
      dataIndex: "studentId",
      width: "10%",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Popconfirm
            size="middle"
            key={record.id}
            title="Delete Student"
            onConfirm={() => {
              deleteClick(record.id);
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "birth" || "studentId" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      setData(dataState.data);
    }
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteUserStatus === loadStatus.Success) {
      dispatch(getData());
      dispatch(resetAddUserStatus());
    }
  }, [dataState.loadDeleteUserStatus]);
  useEffect(() => {
    if (dataState.loadAddUserStatus === loadStatus.Success) {
      dispatch(getData());
      dispatch(resetAddUserStatus());
    }
  }, [dataState.loadAddUserStatus]);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add Student
      </Button>
      <Table
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      ></Table>
      <Modal
        title="Basic Modal"
        size="large"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer=""
      >
        <MyForm closeModal = {closeModal}/>
      </Modal>
    </>
  );
};

export const UserManagementPage = Home;
