import React, { Component } from "react";
import "./todolist.css"; // Import CSS file
import Button from "./CustomButton";
import CustomInput from "./CustomInput";
import { checkEmptyInput } from "../../checkErr";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // Danh sách các mục trong todo list
      newItemText: "", // Nội dung mới cho mục
      editingItemId: null, // ID của mục đang được chỉnh sửa
      editingItemText: "", // Nội dung của mục đang được chỉnh sửa
      deletingItemId: null, // ID của mục đang được xóa
      seconds: 0,
      show: true,
    };
    this.intervalId = null;
  }

  componentDidMount() {
    // Khi component được mount, kiểm tra xem đã có dữ liệu lưu trong localStorage hay chưa
    const items = localStorage.getItem("items");

    if (items) {
      // Nếu có, cập nhật danh sách mục từ localStorage
      this.setState({ items: JSON.parse(items) });
    }
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
      }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    // Khi có sự thay đổi trong state.items, lưu lại danh sách mục vào localStorage
    if (prevState.items !== this.state.items) {
      localStorage.setItem("items", JSON.stringify(this.state.items));
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    // Phương thức này được gọi trước khi component sẽ bị gỡ bỏ khỏi DOM
    // Trong trường hợp này, không có xử lý cụ thể được thực hiện
    // Nhưng có thể sử dụng để log hoặc thực hiện các tác vụ cần thiết trước khi unmount
  }

  // Hàm xử lý sự kiện thay đổi nội dung của ô nhập
  handleInputAdd = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  handleInputEdit = (event) => {
    this.setState({ editingItemText: event.target.value });
  };

  // Hàm xử lý sự kiện thêm mục mới
  handleAddItem = () => {
    if (checkEmptyInput(this.state.newItemText)) {
      return;
    }
    this.setState((prevState) => ({
      items: [
        ...prevState.items,
        { id: Date.now(), text: prevState.newItemText },
      ],
      newItemText: "",
    }));
    // }
  };

  // Hàm xử lý sự kiện bắt đầu chỉnh sửa mục
  handleEditItem = (itemId, itemText) => {
    // Cập nhật state để hiển thị ô nhập cho việc chỉnh sửa mục
    this.setState({
      editingItemId: itemId,
      editingItemText: itemText,
    });
  };

  // Hàm xử lý sự kiện lưu thay đổi của mục
  handleSaveItem = () => {
    const { editingItemId, editingItemText } = this.state;
    // Check if editingItemText is empty
    checkEmptyInput(editingItemText);
    // Update the content of the edited item in state.items
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === editingItemId ? { ...item, text: editingItemText } : item
      ),
      editingItemId: null, // Reset state after saving
      editingItemText: "",
    }));
  };

  // Hàm xử lý sự kiện hủy chỉnh sửa mục
  handleCancelEdit = () => {
    // Reset state để hủy chỉnh sửa mục
    this.setState({ editingItemId: null, editingItemText: "" });
  };

  // Hàm xác nhận xóa mục
  handleDeleteItemConfirm = () => {
    const { deletingItemId } = this.state;
    // Loại bỏ mục khỏi danh sách khi xác nhận xóa
    this.setState({
      items: this.state.items.filter((item) => item.id !== deletingItemId),
      deletingItemId: null,
    });
  };

  // Hàm hiển thị hộp thoại xác nhận trước khi xóa mục
  handleDeleteItem = (itemId) => {
    // Xác nhận trước khi xóa mục
    this.setState({ deletingItemId: itemId }, () => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        // Nếu xác nhận xóa, thực hiện hàm xóa mục
        this.handleDeleteItemConfirm();
      }
    });
  };
  isDisplay = () => {
    this.setState({ show: !this.state.show });
    if (this.state.show === true) {
      this.componentWillUnmount();
    } else {
      this.componentDidMount();
    }
  };

  render() {
    return (
      <div className="todo-container">
        <h1>Todo List</h1>
        {/* Ô nhập cho mục mới */}
        {this.state.show && <h2>Timer: {this.state.seconds} seconds</h2>}
        <button onClick={this.isDisplay}>Show - Hidden</button>

        <CustomInput
          className={"todo-input"}
          onChange={this.handleInputAdd}
          placeholder={"Click button to add a new item"}
          value={this.state.newItemText}
        />

        <Button
          onClick={this.handleAddItem}
          title={"Add Item"}
          typeButtonColor={"add"}
        />

        {/* Danh sách các mục trong todo list */}
        <ul className="todo-list">
          {this.state.items.map((item) => (
            <li key={item.id} className="todo-item">
              {/* Kiểm tra nếu mục đang được chỉnh sửa */}
              {item.id === this.state.editingItemId && (
                <>
                  <CustomInput
                    className={"edit-input"}
                    onChange={this.handleInputEdit}
                    placeholder={"Click button to add a new item"}
                    value={this.state.editingItemText}
                  />

                  <Button
                    title={"Save"}
                    typeButtonColor={"save"}
                    onClick={this.handleSaveItem}
                  />

                  <Button
                    title={"Cancel"}
                    typeButtonColor={"cancel"}
                    onClick={this.handleCancelEdit}
                  />
                </>
              )}

              {localStorage.getItem("items") && (
                <>
                  {/* Hiển thị nội dung của mục */}
                  <span className="item-text">{item.text}</span>

                  <Button
                    title={"Edit"}
                    typeButtonColor={"edit"}
                    onClick={this.handleEditItem}
                    itemId={item.id}
                    itemText={item.text}
                  />

                  <Button
                    title={"Delete"}
                    typeButtonColor={"delete"}
                    onClick={this.handleDeleteItem}
                    itemId={item.id}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default TodoList;
