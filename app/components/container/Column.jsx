import React from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-drag-and-drop'

import Ticket from "../presentational/Ticket.jsx";
import { getTaskbyID } from '../../redux/selectors/tasks'
import { modifyTask } from "../../redux/api.js";

const Column = (props) => {
  const { tasks, category, showSidePanel, changeCategory, user } = props
  const filteredTasks = tasks.filter(task => task.status === category)

  const isAdmin = user.role === 'ADMIN'

  const handleDrop = ({ task: id }) => {
    const updatedTask = Object.assign({}, props.getTaskbyID(id), { status: category });
    changeCategory(updatedTask)
  }
  return (
    <div className="col-sm-3 ticket">
    	<h2>{category} {category ==='Todo'&& <button type="button" disabled={!isAdmin} onClick={showSidePanel('')} className="btn btn-success pull-right">+</button>}</h2>
    	<Droppable
    		types={['task']}
        	onDrop={data => handleDrop(data)}>
	    	<ul>
		  		{filteredTasks.map((task,index) =>
		  			(<Draggable data={task.id} key={index} type="task"> 
		  				<Ticket showSidePanel={showSidePanel(task.id)} {...task}/> 
		  			</Draggable>)
		  		)}
		  	</ul> 
	  	</Droppable>
  	</div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.currentUser,
    getTaskbyID: id => getTaskbyID(state, id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSidePanel: id => e => {
      dispatch({ type: "ADD_SELECTED_ID", id });
      dispatch({ type: "SHOW_SIDE_PANEL" });
    },
    changeCategory: (task) => {
      dispatch(modifyTask(task))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
