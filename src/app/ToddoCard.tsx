type TodoCardProps = {
  img: string;
  name: string;
};

export const TodoCard = (props: TodoCardProps) => {
  return (
    <div className="w-80 p-6 rounded-4xl border">
      {props.img ? <img src={props.img} /> : <img src={"default-image"} />}
      <img src={props.img} />
      <div>{props.name}</div>
    </div>
  );
};
