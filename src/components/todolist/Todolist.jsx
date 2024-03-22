// import React, { Component } from "react";
// import "./todolist.css"; // Import CSS file

// class TodoList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       newItemText: "",
//       editingItemId: null,
//       editingItemText: "",
//       deletingItemId: null,
//     };
//   }

//   //  componentDidMount
//   componentDidMount() {
//     const items = localStorage.getItem("items");
//     if (items) {
//       this.setState({ items: JSON.parse(items) });
//     }
//   }

//   //  componentDidUpdate
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.items !== this.state.items) {
//       localStorage.setItem("items", JSON.stringify(this.state.items));
//     }
//   }

//   // Hàm xử lý sự kiện thay đổi nội dung của ô nhập
//   handleInputChange = (event) => {
//     this.setState({ newItemText: event.target.value });
//   };

//   // Hàm xử lý sự kiện thêm mục mới
//   handleAddItem = () => {
//     if (this.state.newItemText.trim() !== "") {
//       this.setState((prevState) => ({
//         items: [
//           ...prevState.items,
//           { id: Date.now(), text: prevState.newItemText },
//         ],
//         newItemText: "",
//       }));
//     }
//   };

//   // Hàm xử lý sự kiện bắt đầu chỉnh sửa mục
//   handleEditItem = (itemId, itemText) => {
//     this.setState({
//       editingItemId: itemId,
//       editingItemText: itemText,
//     });
//   };

//   // Hàm xử lý sự kiện lưu thay đổi của mục
//   handleSaveItem = () => {
//     const { editingItemId, editingItemText } = this.state;
//     this.setState((prevState) => ({
//       items: prevState.items.map((item) =>
//         item.id === editingItemId ? { ...item, text: editingItemText } : item
//       ),
//       editingItemId: null,
//       editingItemText: "",
//     }));
//   };

//   // Hàm xử lý sự kiện hủy chỉnh sửa mục
//   handleCancelEdit = () => {
//     this.setState({ editingItemId: null, editingItemText: "" });
//   };

//   // Hàm xác nhận xóa mục
//   handleDeleteItemConfirm = () => {
//     const { deletingItemId } = this.state;
//     this.setState({
//       items: this.state.items.filter((item) => item.id !== deletingItemId),
//       deletingItemId: null,
//     });
//   };

//   // Hàm hiển thị hộp thoại xác nhận trước khi xóa mục
//   handleDeleteItem = (itemId) => {
//     this.setState({ deletingItemId: itemId }, () => {
//       if (window.confirm("Are you sure you want to delete this item?")) {
//         this.handleDeleteItemConfirm();
//       }
//     });
//   };

//   render() {
//     return (
//       <div className="todo-container">
//         <h1>Todo List</h1>
//         <input
//           type="text"
//           value={this.state.newItemText}
//           onChange={this.handleInputChange}
//           placeholder="Click button to add a new item"
//           className="todo-input"
//         />
//         <button onClick={this.handleAddItem} className="add-button">
//           Add Item
//         </button>
//         <ul className="todo-list">
//           {this.state.items.map((item) => (
//             <li key={item.id} className="todo-item">
//               {item.id === this.state.editingItemId ? (
//                 <>
//                   <input
//                     type="text"
//                     value={this.state.editingItemText}
//                     onChange={(e) =>
//                       this.setState({ editingItemText: e.target.value })
//                     }
//                     className="edit-input"
//                   />
//                   <button onClick={this.handleSaveItem} className="save-button">
//                     Save
//                   </button>
//                   <button
//                     onClick={this.handleCancelEdit}
//                     className="cancel-button"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span className="item-text">{item.text}</span>
//                   <button
//                     onClick={() => this.handleEditItem(item.id, item.text)}
//                     className="edit-button"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => this.handleDeleteItem(item.id)}
//                     className="delete-button"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default TodoList;
import React, { Component } from "react";
import "./todolist.css"; // Import CSS file

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
  handleInputChange = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  // Hàm xử lý sự kiện thêm mục mới
  handleAddItem = () => {
    if (this.state.newItemText.trim() !== "") {
      // Nếu nội dung mới không rỗng, thêm một mục mới vào danh sách
      this.setState((prevState) => ({
        items: [
          ...prevState.items,
          { id: Date.now(), text: prevState.newItemText },
        ],
        newItemText: "", // Xóa nội dung mới sau khi thêm mục
      }));
    }
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
    // Cập nhật nội dung mới của mục đã chỉnh sửa vào state.items
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === editingItemId ? { ...item, text: editingItemText } : item
      ),
      editingItemId: null, // Reset lại state sau khi lưu
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

  render() {
    return (
      <div className="todo-container">
        <h1>Todo List</h1>
        {/* Ô nhập cho mục mới */}
        {this.state.show ? <h2>Timer: {this.state.seconds} seconds</h2> : null}
        <button onClick={() => this.setState({ show: !this.state.show })}>
          Show - Hidden
        </button>
        <input
          type="text"
          value={this.state.newItemText}
          onChange={this.handleInputChange}
          placeholder="Click button to add a new item"
          className="todo-input"
        />
        {/* Nút thêm mục mới */}
        <button onClick={this.handleAddItem} className="add-button">
          Add Item
        </button>
        {/* Danh sách các mục trong todo list */}
        <ul className="todo-list">
          {this.state.items.map((item) => (
            <li key={item.id} className="todo-item">
              {/* Kiểm tra nếu mục đang được chỉnh sửa */}
              {item.id === this.state.editingItemId ? (
                <>
                  {/* Ô nhập cho việc chỉnh sửa */}
                  <input
                    type="text"
                    value={this.state.editingItemText}
                    onChange={(e) =>
                      this.setState({ editingItemText: e.target.value })
                    }
                    className="edit-input"
                  />
                  {/* Nút lưu chỉnh sửa */}
                  <button onClick={this.handleSaveItem} className="save-button">
                    Save
                  </button>
                  {/* Nút hủy chỉnh sửa */}
                  <button
                    onClick={this.handleCancelEdit}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* Hiển thị nội dung của mục */}
                  <span className="item-text">{item.text}</span>
                  {/* Nút chỉnh sửa mục */}
                  <button
                    onClick={() => this.handleEditItem(item.id, item.text)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  {/* Nút xóa mục */}
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
