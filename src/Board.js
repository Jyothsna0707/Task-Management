import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import TaskList from "./TaskList";
import './Board.css'
import SearchComponent from "./SearchComponent";
// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function Board() {
  const [state, setState] = useState([]);
  const [data, setData] = useState([])
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    const getData = async () => {
      console.log('slkdjf')
      const data = await fetch('https://stage-mock.apiwiz.io/v1/tasks', {
        headers: {
          "x-tenant": "b8e236df-4b26-49ef-9532-5e43ea0c10a4"
        }
      }).then(res => {
        console.log(res)
        return res.json()
      })
      console.log(data)
      ///
      //   {
      //     "id": 1,
      //     "name": "Task 1",
      //     "summary": "Summary for Task 1",
      //     "assignee": "Alice",
      //     "startDate": "2023-05-03",
      //     "endDate": "2023-06-15",
      //     "type": "Design",
      //     "priority": "High",
      //     "status": "Ready",
      //     "effortSpent": 1280
      // }
      //
      let formedData = []
      let statuses = new Set()
      data.map(item => {
        if (item.status) {
          statuses.add(item.status)
        }
      })
      Array.from(statuses).map(status => {
        formedData.push(data.filter(item => item.status === status))
      })
      console.log(formedData)
      setStatuses(Array.from(statuses))
      setState(formedData)
      setData(formedData)
    }
    getData()
    return () => {

    }
  }, [])


  function onDragEnd(result) {
    console.log(result)
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  }
  
  function onChangeText (inputValue) {
    if (inputValue) {
      let _data = []
        data.map(item => {
          _data.push(item.filter(subItem => subItem.name.toLowerCase().includes(inputValue.toLowerCase())))
        })
      setState(_data)
    } else {
      setState(data)
    }
  }
  
  useEffect(() => {
    var inputElement = document.getElementById('myInput');
    const listner = inputElement?.addEventListener('input', function() {
      var inputValue = inputElement.value;
      onChangeText(inputValue)
      // You can perform further actions with the input value here
    });

  return () => {
    inputElement.removeEventListener('input', listner)
  }
  }, [data])


  return (
    <div>
      <SearchComponent onChangeText={onChangeText} />
      <div
        // style={{ display: "flex" }}
        className="board"
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <TaskList statuses={statuses} onAddItem={(index) => {
              setState(state => {
                let _state = [...state]
                _state[index] = getItems(1)
                return _state
              })
            }} ind={ind} element={el} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board
