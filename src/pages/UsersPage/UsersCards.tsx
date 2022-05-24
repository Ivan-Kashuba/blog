import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import UserItem from "./UserItem";
import { User } from "../../types/models";
import { useUsers } from "../../hooks/useUsers";

type columns_T = {
  id: string;
  name: string;
  items: Array<User>;
};

const UsersCards = () => {
  const { users } = useUsers();

  const [columns, setColumns] = useState<Array<columns_T>>([]);
  useEffect(() => {
    setColumns([
      {
        id: "First Col",
        name: "Users",
        items: users,
      },
      {
        id: "Second Col",
        name: "Usual",
        items: [],
      },
      {
        id: "Third Col",
        name: "Favourites",
        items: [],
      },
    ]);
  }, [users]);

  const onDragEnd = (
    result: DropResult,
    columns: Array<columns_T>,
    setColumns: React.Dispatch<React.SetStateAction<Array<columns_T>>>
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId as any];
      const destColumn = columns[destination.droppableId as any];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId as any];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className="userCardsContainer">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div key={columnId}>
              <h2>{column.name}</h2>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={
                        snapshot.isDraggingOver
                          ? "cardContainerActive"
                          : "cardContainer"
                      }
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={
                                    snapshot.isDragging
                                      ? "userCard"
                                      : "userCardActive "
                                  }
                                >
                                  <UserItem user={item} />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default UsersCards;
