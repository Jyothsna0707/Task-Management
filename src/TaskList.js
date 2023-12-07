// TaskList.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import './TaskList.css';
import { getListStyle } from './Board';

const TaskList = ({ element, ind, onAddItem, statuses }) => {
    const getColorStyle = (index) => {
        let value = '#000'
        switch (index) {
            case 0:
                value = '#888'
                break;
            case 1:
                value = '#049'
                break;
            case 2:
                value = '#fb0'
                break;
            case 3:
                value = '#033'
                break;
        
            default:
                break;
            }
            return {borderColor: value,
                fontFamily: 'sans-serif',
                fontSize: 14,
                fontWeight: 'bold',}
    }
    console.log(element)
    return (
        <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    className='task-list'
                    {...provided.droppableProps}
                >
                    <div style={getColorStyle(ind)} className='header'>{statuses?.[ind]} ({element.length})</div>
                    {element.map((item, index) => (
                        <Task item={item} index={index} parentIndex={ind} />
                    ))}
                    {/* {provided.placeholder} */}
                    {ind !== 3 && <div
                    type="button"
                    className='button'
                    onClick={() => {
                    //   onAddItem(ind)
                    }}
                  >
                    <img src='https://cdn-icons-png.flaticon.com/128/2997/2997933.png' style={{width: 15, height: 15, paddingRight: 10}} />
                    <div>Add Task</div>
                  </div>}
                </div>
            )}
        </Droppable>
    );
};

export default TaskList;
