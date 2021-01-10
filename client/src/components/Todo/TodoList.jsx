import React from "react";
import { map } from "lodash";

import SingleTodo from "./SingleTodo";

import { connect } from "react-redux";

import { Box } from "@material-ui/core";

import { orderList, reorderTodo } from "../../actions/index";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(
	({ value, day, done, repeat, key, id, index }) => (
		<SingleTodo
			text={value}
			day={day}
			done={done}
			repeat={repeat}
			key={key}
			id={id}
			inx={index}
		/>
	)
);

const SortableList = SortableContainer((props) => {
	React.useEffect(() => {
		map(props.items, ({ _id, index }, inx) => {
			if (index !== inx) props.reorder(_id, inx);
		});
	}, [props]);

	return (
		<Box>
			{map(props.items, ({ _id, content, day, done, repeat }, index) => (
				<SortableItem
					key={`item-${_id}`}
					id={_id}
					value={content}
					day={day}
					done={done}
					repeat={repeat}
					index={index}
				/>
			))}
		</Box>
	);
});

const SortableComponent = (props) => {
	return (
		<SortableList
			items={props.todos}
			onSortEnd={props.onSortEnd}
			reorder={props.reorder}
			useDragHandle
		/>
	);
};

const TodoList = (props) => {
	return (
		<Box>
			<SortableComponent
				todos={props.todos}
				onSortEnd={props.orderList}
				reorder={props.reorderTodo}
			/>
		</Box>
	);
};

const mapStateToProps = ({ todos }) => ({ todos: todos.tasks });

export default connect(mapStateToProps, { orderList, reorderTodo })(TodoList);

// const TodoList = (props) => {
// 	const todos = map(props.todos, ({ _id, content }, inx) => {
// 		return <SingleTodo text={content} key={_id} id={_id} inx={inx} />;
// 	});
// 	return <Box>{todos}</Box>;
// };
