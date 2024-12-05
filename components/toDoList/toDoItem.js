import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import ToDoStatusChange from './toDoStatusChange';
import ToDoEdit from './toDoEdit';
import ToDoDelete from './toDoDelete';

const ToDoItem = ({ id, name, description, status, act, creationDate, editionDate }) => {

  const formattedCreationDate = new Date(creationDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const formattedActDate = new Date(act).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedEditionDate = new Date(editionDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const isDeadlineOver = new Date() > new Date(act);

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md uppercase font-bold">{name}</p>
            <p className="text-small text-default-500">Created at: {formattedCreationDate}</p>
            {editionDate && (
              <p className="text-small text-default-500">Last edited at: {formattedEditionDate}</p>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Description</p>
            <p>{description}</p>
          </div>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Status</p>
            <p><Button size="sm" color={status === 'Pending' ? 'warning' : status === 'Completed' ? 'success' : 'default'} variant="flat">{status}</Button></p>
          </div>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Assumptive completion time</p>
            <p className={isDeadlineOver ? 'text-red-500 font-bold' : ''}>
              {isDeadlineOver ? 'Deadline over' : formattedActDate}
            </p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex gap-1 items-center">
            <ToDoEdit id={id} name={name} description={description} status={status} act={act} creationDate={creationDate} editionDate={editionDate} />

            <ToDoDelete id={id} toDoStatus={status} />

            <ToDoStatusChange id={id} toDoStatus={status} />
          </div>

        </CardFooter>
      </Card >


    </>
  )
}

export default ToDoItem;
