// Task.js
import React from "react";
import "./Task.css";
import { Draggable } from "react-beautiful-dnd";
import { getItemStyle } from "./Board";

const Task = ({ item, index, parentIndex }) => {
    const getMonth = (month) => {
        let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return monthArray[month]
    }
    const formatDate = (date) => {
        let [year, month, _date] = date.split('-')
        let _newDate = getMonth(Number(month) - 1) + ' ' + _date + ', ' + year
        return _newDate
    }
    const getImageBasedOnPriority = (priority) => {
      let result = ''
      switch (priority) {
        case 'Low':
          result = "https://cdn-icons-png.flaticon.com/128/892/892634.png"
          break;
        case 'High':
          result = "https://cdn-icons-png.flaticon.com/128/6939/6939131.png"
          break;
        case 'Medium':
          result = "https://cdn-icons-png.flaticon.com/128/5610/5610930.png"
          break;
      
        default:
          break;
      }

      return result
    }
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={getItemStyle(
          //     snapshot.isDragging,
          //     provided.draggableProps.style
          // )}
          className="task-item dark"
        >
          <div id="content">
          <img
              src={getImageBasedOnPriority(item.priority)}
              style={{ width: 10, height: 10, paddingRight: 5 }}
            />
          </div>
          {/* <div style={{ display: 'block'}}> */}
          <div style={{
            fontFamily: 'sans-serif',
            fontSize: 16,
            fontWeight: 'bold',
            textDecorationLine: parentIndex === 3 ? 'line-through' : 'none'
          }}>{item.name}</div>
          <div style={{
                  fontFamily: 'sans-serif',
                  fontSize: 12,
                  fontWeight: 'normal',
                    marginTop: 5,
                    color: 'GrayText'

          }}>{item.summary}</div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ccc",
              borderStyle: "solid",
              paddingRight: 5,
              paddingLeft: 5,
              marginTop: 5,
              fontFamily: 'sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'GrayText'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/839/839860.png"
              style={{ width: 10, height: 10, paddingRight: 5 }}
            />
            <div>Default Task List</div>
          </div>
          <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: 5
            }}
          >{item.assignee.split(',').map((item, index) => {
              return <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
                style={{ width: 20, height: 20, marginLeft: index > 0 ? -5 : 0 }}
              />
          })}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "#eee9",
              paddingRight: 10,
              paddingLeft: 10,
              paddingBottom: 5,
              paddingTop: 5,
                marginLeft: 10,
                fontFamily: 'sans-serif',
                  fontSize: 10,
                  fontWeight: 500,
                  color: 'GrayText'
            }}>{formatDate(item.startDate)}</div>
          </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
