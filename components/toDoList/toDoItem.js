import React from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const ToDoItem = ({ id, name, description, status, act, creationDate }) => {
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
  // console.log(name)
  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md uppercase font-bold">{name}</p>
            <p className="text-small text-default-500">{formattedCreationDate}</p>
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
            <p><Button size="sm" color={status === 'Pending' ? 'warning' : 'default'} variant="flat">{status}</Button></p>
          </div>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Assumptive completion time</p>
            <p>{formattedActDate}</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            href={`/editToDo/${id}`}
          >
            <Button size="sm" color='secondary'>Edit</Button>

          </Link>
          <Link
            href=""
            className='px-1'
          >
            <Button size="sm" color='warning'>Delete</Button>
          </Link>

          <Link
            href=""
            className='px-1'
          >
            <Button size="sm" color='warning'>Mark as Completed</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}

export default ToDoItem