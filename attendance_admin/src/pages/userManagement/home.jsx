import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getData, loadStatus, updateUser } from '../../redux/dataSlice';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {

  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Home = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const dataState = useSelector(state => state.dataSlice)
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.getFieldValue();

      var newuser = {};
      newuser.name = row.name;
      newuser.address = row.address;
      newuser.email = row.email;
      newuser.phoneNumber = row.phoneNumber;
      newuser.studentId = row.studentId;
      newuser.hometown = row.hometown;
      newuser.id = row.id;
      newuser.email = row.email;
      dispatch(updateUser(newuser));
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'birth',
      dataIndex: 'birth',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '20%',
      editable: true,
    },
    {
      title: 'home',
      dataIndex: 'hometown',
      width: '20%',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      width: '10%',
      editable: true,
    }, {
      title: 'email',
      dataIndex: 'email',
      width: '10%',
      editable: true,
    },
    {
      title: 'Student Id',
      dataIndex: 'studentId',
      width: '10%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <> </>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Delete</a>
          </Popconfirm>
          </>
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
        inputType: col.dataIndex === 'birth' || 'studentId' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(()=>{
    dispatch(getData())
                   
  },[])
  useEffect(()=>{
    if(dataState.loadDataStatus === loadStatus.Success || dataState.loadAddUserStatus === loadStatus.Success){
      setData(dataState.data);
    }

  },[dataState.loadDataStatus,dataState.loadAddUserStatus])

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export const UserManagementPage = Home;
