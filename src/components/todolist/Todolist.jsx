import React, { Component } from "react";
import "./todolist.css"; // Import CSS file

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItemText: "", 
      editingItemId: null, 
      editingItemText: "", 
      deletingItemId: null, 
    };
  }

  //  componentDidMount
  componentDidMount() {
    const items = localStorage.getItem("items");
    if (items) {
      this.setState({ items: JSON.parse(items) });
    }
  }

  //  componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (prevState.items !== this.state.items) {
      localStorage.setItem("items", JSON.stringify(this.state.items));
    }
  }

  // Hàm xử lý sự kiện thay đổi nội dung của ô nhập
  handleInputChange = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  // Hàm xử lý sự kiện thêm mục mới
  handleAddItem = () => {
    if (this.state.newItemText.trim() !== "") {
      this.setState((prevState) => ({
        items: [
          ...prevState.items,
          { id: Date.now(), text: prevState.newItemText },
        ],
        newItemText: "",
      }));
    }
  };

  // Hàm xử lý sự kiện bắt đầu chỉnh sửa mục
  handleEditItem = (itemId, itemText) => {
    this.setState({
      editingItemId: itemId,
      editingItemText: itemText,
    });
  };

  // Hàm xử lý sự kiện lưu thay đổi của mục
  handleSaveItem = () => {
    const { editingItemId, editingItemText } = this.state;
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === editingItemId ? { ...item, text: editingItemText } : item
      ),
      editingItemId: null,
      editingItemText: "",
    }));
  };

  // Hàm xử lý sự kiện hủy chỉnh sửa mục
  handleCancelEdit = () => {
    this.setState({ editingItemId: null, editingItemText: "" });
  };

  // Hàm xác nhận xóa mục
  handleDeleteItemConfirm = () => {
    const { deletingItemId } = this.state;
    this.setState({
      items: this.state.items.filter((item) => item.id !== deletingItemId),
      deletingItemId: null,
    });
  };

  // Hàm hiển thị hộp thoại xác nhận trước khi xóa mục
  handleDeleteItem = (itemId) => {
    this.setState({ deletingItemId: itemId }, () => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        this.handleDeleteItemConfirm();
      }
    });
  };

  render() {
    return (
      <div className="todo-container">
        <h1>Todo List</h1>
        <input
          type="text"
          value={this.state.newItemText}
          onChange={this.handleInputChange}
          placeholder="Click button to add a new item"
          className="todo-input"
        />
        <button onClick={this.handleAddItem} className="add-button">
          Add Item
        </button>
        <ul className="todo-list">
          {this.state.items.map((item) => (
            <li key={item.id} className="todo-item">
              {item.id === this.state.editingItemId ? (
                <>
                  <input
                    type="text"
                    value={this.state.editingItemText}
                    onChange={(e) =>
                      this.setState({ editingItemText: e.target.value })
                    }
                    className="edit-input"
                  />
                  <button onClick={this.handleSaveItem} className="save-button">
                    Save
                  </button>
                  <button
                    onClick={this.handleCancelEdit}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="item-text">{item.text}</span>
                  <button
                    onClick={() => this.handleEditItem(item.id, item.text)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDeleteItem(item.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
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
