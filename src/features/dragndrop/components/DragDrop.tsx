import { useState } from "react";
type Person = {
  id: number;
  name: string;
  age: number;
  selected?: boolean;
};
const initialData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 20 },
];

function DragDrop() {
  //const [leftList, setLeftList] = useState<Person[]>(initialData);

  const [rightList, setRightList] = useState<Person[]>([]);

  const leftList = initialData.filter((item) => !rightList.some((r) => r.id === item.id));

  // Store currently dragged item
  const [draggedItem, setDraggedItem] = useState<Person | null>(null);

  const onDragStart = (item: Person) => {
    setDraggedItem(item);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Needed to allow drop
  };

  const onDropRight = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(!draggedItem) return;

    setRightList([...rightList, {...draggedItem, selected: true}]);
    setDraggedItem(null);
  };

  const handleReset = (e) => {
    setRightList([]);
  }

  return (
    <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
     <div>
      <h3>Left List</h3>
      {
        leftList.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => onDragStart(item)}
            style={{
              padding: "8px",
              margin: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "grab",
            }}
          >
            {item.name} ({item.age})
          </div>
        ))
      }
     </div>
     <div
     onDrop={onDropRight}
     onDragOver={onDragOver}
     >
      <h3>Right List</h3>
        {rightList.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "8px",
              margin: "4px",
              border: "1px solid #4caf50",
              borderRadius: "4px",
              backgroundColor: "#e8f5e9",
            }}
            
            
          >
            {item.name} ({item.age})
          </div>
        ))}
    </div>

        <button onClick={handleReset}>Reset</button>
      </div>
  );
}

export default DragDrop;
